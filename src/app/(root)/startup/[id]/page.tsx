import Header from '@/components/Header/Header';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';

import { STARTUP_BY_ID_QUERIES } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View/View';

const md = markdownit();

export const experimental_ppr = true;

const StartupPage = async ({ params }: { params: Promise<{ id?: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERIES, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

  return (
    <>
      <Header tag={formatDate(post?._createdAt)} heading={post.title} subHeading={post.description} />
      <section className="section_container">
        <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
      </section>
      <section className="section_container">
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center flex-row gap-5">
            <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium text-black-300">@{post.author.username}</p>
              </div>
            </Link>
            <p className="font-medium text-[1rem] bg-primary-100 px-4 py-2 rounded-full">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-black-100 text-sm font-normal">No details provided</p>
          )}
        </div>
        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />
      </section>

      <Suspense fallback={<Skeleton className=" bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />}>
        <View id={id || ''} />
      </Suspense>
    </>
  );
};

export default StartupPage;
