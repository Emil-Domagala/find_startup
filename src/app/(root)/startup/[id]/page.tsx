import Header from '@/components/Header/Header';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUP_BY_ID_QUERIES } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';

export const experimental_ppr = true;

const StartupPage = async ({ params }: { params: Promise<{ id?: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERIES, { id });

  if (!post) return notFound();

  return (
    <>
      <Header tag={formatDate(post?._createdAt)} heading={post.title} subHeading={post.description} />
      <section className="section_container">
        <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
      </section>
    </>
  );
};

export default StartupPage;
