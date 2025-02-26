'use client';
import { X } from 'lucide-react';
import Link from 'next/link';

const ResetButton = () => {
  const handleReset = () => {
    const form = document.querySelector('#search-form') as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <Link href="/">
      <button
        type="reset"
        onClick={handleReset}
        className="size-[50px] rounded-full bg-black flex justify-center items-center">
        <X className="size-6 text-white" />
      </button>
    </Link>
  );
};

export default ResetButton;
