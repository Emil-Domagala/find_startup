import Header from '@/components/Header/Header';
import SearchForm from '@/components/SearchForm/SearchForm';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard/StartupCard';

import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUPS_QUERIES } from '@/sanity/lib/queries';
import { auth } from '../auth';

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERIES, params });


  return (
    <>
      <Header
        heading={
          <>
            Pitch Your Startup,
            <br />
            Connect with Entrepreneurs`
          </>
        }
        subHeading="Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions."
        maxW3Xl
        form={<SearchForm query={query} />}
      />
      <section className="section_container">
        <p className="text-30-semibold">{query ? `Search results for "${query}"` : 'All Startups'}</p>
        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5 grid-cols-1">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => <StartupCard post={post} key={post._id} />)
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
