import Image from 'next/image';
import Link from 'next/link';
import DeskopNavbar from './DeskopNavbar';
import MobileNavbar from './MobileNavbar';
import { auth, } from '@/app/auth';

const Navbar = async () => {
const session = await auth();

  return (
    <div className="px-5 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image className="py-3" src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <DeskopNavbar  session={session}/>
        <MobileNavbar session={session} />
      </nav>
    </div>
  );
};

export default Navbar;
