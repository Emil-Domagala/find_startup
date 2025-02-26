import Link from 'next/link';
import { handleSignOut, handleSignIn } from '@/lib/authActions';

const DeskopNavbar = ({ session }: { session: any }) => {
  return (
    <div className="hidden h-full sm:flex items-center gap-5 text-black">
      {session && session?.user ? (
        <>
          <Link className="py-3 px-2 ransition-all duration-300 hover:bg-white-100" href="/startup/create">
            <span>Create</span>
          </Link>
          <form action={handleSignOut}>
            <button className="py-3 px-2 ransition-all duration-300 hover:bg-white-100" type="submit">
              Logout
            </button>
          </form>
          <Link className="py-3 px-2 ransition-all duration-300 hover:bg-white-100" href={`/user/${session?.id}`}>
            <span>{session?.user?.name}</span>
          </Link>
        </>
      ) : (
        <form action={handleSignIn}>
          <button className="py-3 px-2 ransition-all duration-300 hover:bg-white-100" type="submit">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default DeskopNavbar;
