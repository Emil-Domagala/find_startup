'use client';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { handleSignOut, handleSignIn } from '@/lib/authActions';

const MobileNavbar = ({ session }: { session: any }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="sm:hidden z-51">
        <button onClick={() => setIsShow(!isShow)}>
          <Menu className="size-6 z-51 text-black hover:text-gray-500" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-white w-[15rem] origin-right transition-all duration-300 sm:hidden shadow fixed z-50 top-0 bottom-0 right-0 gap-5 text-black h-full ${
          isShow ? 'scale-x-100' : 'scale-x-0'
        }`}>
        <div className="flex justify-end w-full">
          <button className="py-3 px-5" onClick={() => setIsShow(false)}>
            <X className="size-6 z-51 text-black hover:text-gray-500" />
          </button>
        </div>

        {session && session?.user ? (
          <>
            <Link
              className="block text-center py-2 w-full transition-all duration-300 hover:bg-white-100"
              href="/startup/create">
              Create
            </Link>
            <form action={handleSignOut}>
              <button className="py-2 w-full transition-all duration-300 hover:bg-white-100" type="submit">
                Logout
              </button>
            </form>
            <Link
              className="block text-center py-2 w-full transition-all duration-300 hover:bg-white-100"
              href={`/user/${session?.id}`}>
              {session?.user?.name}
            </Link>
          </>
        ) : (
          <form action={handleSignIn}>
            <button className="py-2 w-full transition-all duration-300 hover:bg-white-100" type="submit">
              Login
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default MobileNavbar;
