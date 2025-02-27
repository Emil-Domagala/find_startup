import Header from '@/components/Header/Header';
import SearchForm from '@/components/SearchForm/SearchForm';
import StartupCard from '@/components/StartupCard/StartupCard';

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: 'Emil XXX' },
      _id: 1,
      image:
        'https://i.guim.co.uk/img/media/c9ee78b14adaa835b270b1fd7b3196976c4b9c4e/0_167_5000_3000/master/5000.jpg?width=1900&dpr=1&s=none&crop=none',

      category: 'Robots',
      title: 'We Robots',
      description: 'Something',
    },
  ];

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
            posts.map((post) => <StartupCard post={post} key={post._id} />)
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
