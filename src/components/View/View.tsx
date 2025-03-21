import { client } from '@/sanity/lib/client';
import Ping from './Ping';
import { STARTUP_VIEWS_BY_ID_QUERIES } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write';
import { after } from 'next/server';

const View = async ({ id }: { id: string }) => {
  const { views } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_BY_ID_QUERIES, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit(),
  );

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize">Views: {views}</p>
    </div>
  );
};

export default View;
