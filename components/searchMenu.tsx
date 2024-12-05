import { useState } from 'react';
import { TbSearch } from "react-icons/tb";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      await router.push(`/search/${searchQuery}`);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className='fixed top-28 md:top-12 md:left-1/2 z-40 md:z-50 flex px-2 md:right-32 items-center text-gray-500 w-full 
      bg-transparent h-16 md:h-12 md:w-[30%]'>
      <div className='flex flex-row rounded-full w-full md:w-full border-solid border-[1px] border-black'>
        <Link href={`/search/${searchQuery}`}>
          <TbSearch className='text-2xl font-bold m-2 text-black' onClick={handleSearch} />
        </Link>
        <input
          type="text"
          name="query"
          id="search"
          autoComplete="off"
          className='w-full rounded-full py-1 px-2 active:border-0 dark:text-black outline-none'
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}  // Using onKeyDown instead of onKeyPress
        />
      </div>
    </div>
  );
}
