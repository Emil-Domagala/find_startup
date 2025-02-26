import Header from '@/components/Header/Header';
import SearchForm from '@/components/SearchForm/SearchForm';

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
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
    </>
  );
}
