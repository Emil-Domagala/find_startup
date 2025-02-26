import React from 'react';

type Props = {
  heading: React.ReactNode | string;
  subHeading: string;
  maxW3Xl?: boolean;
  form?: React.ReactNode;
};

const Header = ({ heading, subHeading, maxW3Xl = false, form }: Props) => {
  return (
    <section className=" pattern w-full bg-primary min-h-[530px] flex justify-center items-center flex-col py-10 px-6">
      <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
        {heading}
      </h1>
      <p
        className={`font-medium text-[20px] text-white text-center break-words ${maxW3Xl ? 'max-w-3xl' : 'max-w-2xl'}`}>
        {subHeading}
      </p>
      {form && form}
    </section>
  );
};

export default Header;
