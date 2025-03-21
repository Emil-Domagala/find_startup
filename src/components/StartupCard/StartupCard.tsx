import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button/Button';
import { Startup, Author } from '@/sanity.types';
import { Skeleton } from '../ui/skeleton';

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, title, category, _id, image, description } = post;

  return (
    <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-primary transition-all duration-400 hover:shadow-300 hover:bg-primary-100 overflow-hidden">
      <div className="flex justify-between items-center">
        <p className="font-medium text-[0.9rem] py-2 rounded-full group-hover:bg-white-100">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span>{views}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1"> {author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || `https://placehold.co/48x48`}
            alt={author?.name || 'user image'}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="font-normal text-[1rem] line-clamp-2 my-3 text-black-100 break-all">{description}</p>
        <img src={image} alt={title} className="w-full h-[164px] rounded-[10px] object-cover" />
      </Link>
      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/query=${category?.toLowerCase()}`}>
          <p className="test-16-medium">{category}</p>
        </Link>
        <Link href={`/startup/${_id}`}>
          <Button className="rounded-full bg-black-200 font-medium text-[1rem] text-white px-5 py-2">Details</Button>
        </Link>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={index}>
        <Skeleton className="w-full h-96 rounded-[22px] bg-zinc-400" />
      </li>
    ))}
  </>
);

export default StartupCard;
