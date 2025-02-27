import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button/Button';

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  return (
    <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 overflow-hidden">
      <div className="flex justify-between items-center">
        <p className="font-medium text-[0.9rem] py-2 rounded-full group-hover:bg-white-100">
          {formatDate(post._createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span>{post.views}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <Link href={`/user/${post.author?.id}`}>
            <p className="text-16-medium line-clamp-1"> {post.author?.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-26-semibold">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author?.id}`}>
          <Image
            src={`https://placehold.co/48x48`}
            alt={post.author?.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${post._id}`}>
        <p className="font-normal text-[1rem] line-clamp-2 my-3 text-black-100 break-all">{post.description}</p>
        <img src={post.image} alt={post.title} className="w-full h-[164px] rounded-[10px] object-cover" />
      </Link>
      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/query=${post.category.toLowerCase()}`}>
          <p className="test-16-medium">{post.category}</p>
        </Link>
        <Button className="rounded-full bg-black-200 font-medium text-[1rem] text-white px-5 py-2">Details</Button>
      </div>
    </li>
  );
};

export default StartupCard;
