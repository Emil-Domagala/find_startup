import { Search } from 'lucide-react';
import Form from 'next/form';
import ResetButton from './ResetButton';
import Button from '../Button/Button';

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      id="search-form"
      action="/"
      scroll={false}
      className="max-w-3xl w-full min-h-[80px] bg-white border-4 border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5">
      <input
        autoComplete="off"
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none"
      />
      <div className="flex gap-2">
        {query && <ResetButton />}
        <Button size={50}>
          <Search className="size-6 text-white" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
