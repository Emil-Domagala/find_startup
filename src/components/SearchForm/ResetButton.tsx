'use client';
import { X } from 'lucide-react';
import Link from 'next/link';
import Button from '../Button/Button';

const ResetButton = () => {
  const handleReset = () => {
    const form = document.querySelector('#search-form') as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <Link href="/">
      <Button size={50} type="reset" onClick={handleReset}>
        <X className="size-6 text-white" />
      </Button>
    </Link>
  );
};

export default ResetButton;
