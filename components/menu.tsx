import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import PromotionBanner from "./promotionBanner";
import { usePagination } from "./Context/paginationContext";
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import SearchBar from './searchMenu'; // Externalized search bar
import logo from '../public/logo3.png';
import { TbHeartFilled } from "react-icons/tb";
import { BsHeart } from "react-icons/bs";
import { useRouter } from "next/router";

// Organized Menu Categories
const categories = [
  { name: 'Esquenta Black', path: '/products/promo' },
  { name: 'Anel', path: '/products/aneis' },
  { name: 'Brinco', path: '/products/brincos' },
  { name: 'Colar', path: '/products/colares' },
  { name: 'Corrente', path: '/products/correntes' },
  { name: 'Pulseira', path: '/products/pulseiras' },
  { name: 'Tornozeleira', path: '/products/tornozeleiras' },
  { name: 'Conjunto', path: '/products/conjuntos' },
  { name: 'Berloque', path: '/products/berloque' },
];

export default function Menu() {
  const [hasMounted, setHasMounted] = useState(false);
  const { updateCategory } = usePagination();
  const { favoritesCount } = useShoppingFavorites();

  // Toggle menu visibility
  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    const toggle = document.getElementById('toggle-button');
    const bar = document.getElementById('bar-icon');
    const times = document.getElementById('times-icon');

    menu?.classList.toggle('hidden');
    menu?.classList.toggle('h-screen');
    toggle?.classList.toggle('color-white');
    bar?.classList.toggle('hidden');
    times?.classList.toggle('hidden');
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const router = useRouter();
  const isActive = (path: string) => router.asPath == path;

  if (!hasMounted) return null;

  return (
    <div id="menu-container" className="fixed top-0 w-full h-20 z-50 bg-white text-white">
      {/* Mobile Menu Button */}
      <button id="toggle-button"
        className="fixed block md:hidden left-4 w-12 h-14 z-[100] top-11"
        onClick={toggleMenu}>
        <HiOutlineBars3 id='bar-icon' className="w-7 h-7 font-extralight"></HiOutlineBars3>
        <TfiClose id='times-icon' className="w-7 h-7 p-1 hidden"></TfiClose>
      </button>

      {/* Menu Links */}
      <menu id="menu" className="fixed hidden md:block top-0 left-0 shadow-sm z-40">
        <div className="top-44 md:top-28 fixed w-full justify-center z-40 bg-black/50 h-full md:h-12 items-center border-t-[1px] border-solid border-black-1000">
          <div className='z-50 flex flex-col items-center justify-start h-full w-[70%] gap-2 bg-white p-2 md:w-full md:flex-row md:justify-center md:align-middle md:h-12'>
            {categories.map((category) => (
              <Link key={category.name} href={category.path}
                className={` no-underline border-solid border-b-[1px] md:w-fit border-black-1000 w-full text-left text-black-1000 cursor-pointer
                    ${isActive(category.path) ? 'border-b-2 border-black-1000 font-bold' : 'border-none'}
                    ${category.name == 'Esquenta Black' ? 'bg-black-1000 text-white font-bold p-2' : 'p-3'}`}
                onClick={() => { toggleMenu(); updateCategory(category.name.toLowerCase()); }}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </menu>

      {/* Promotion Banner */}
      <PromotionBanner />

      {/* Header */}
      <div className="fixed top-8 w-full h-20 flex flex-row justify-between md:justify-between bg-black-1000 items-center z-50">
        <div className="w-1/4 block md:hidden"></div>
        <Link href={'/'}
          className='w-48 h-20 relative md:left-8 md:mx-6 overflow-hidden'
          onClick={() => { updateCategory(''); }}>
          <Image src={logo} alt='item' priority fill className='object-cover' />
        </Link>

        {/* Search Bar */}
        <div className='fixed top-28 md:top-12 md:left-1/2 z-40 md:z-50 flex md:right-32 items-center text-gray-500 w-full bg-black-1000 md:bg-transparent h-16 md:h-12 md:w-[30%]'>
          <SearchBar />
        </div>

        {/* Favorite & Cart Icons */}
        <div className="w-1/4 flex flex-row justify-center gap-2 md:gap-6">
          <Link className='flex justify-end' href='/favorites'>
            <TbHeartFilled className='text-[27px] font-bold text-rose-400'></TbHeartFilled>
            <BsHeart className='text-2xl font-bold text-white -ml-[25px] mt-[2px]'></BsHeart>
          </Link>
        </div>
      </div>
    </div>
  );
}
