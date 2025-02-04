import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import PromotionBanner from "./promotionBanner";
import { usePagination } from "./Context/paginationContext";
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import SearchBar from './searchMenu'; // Externalized search bar
import logo from '../public/logo4.png';
import { TbHeartFilled } from "react-icons/tb";
import { BsBag, BsCart, BsCartCheckFill, BsHeart, BsPerson, BsShop } from "react-icons/bs";
import { useRouter } from "next/router";
import { useShoppingCart } from "@/hooks/use-shopping-cart";

// Organized Menu Categories
const categories = [
  { name: 'Promoções', path: '/products/promo' },
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
  const { cartCount } = useShoppingCart();

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
    <div id="menu-container" className="fixed top-0 w-full h-20 z-50 bg-white text-black">
      

      {/* Menu Links */}
      <menu id="menu" className="fixed hidden md:block top-0 left-0 shadow-sm z-40">
        <div className="top-44 flex md:top-28 fixed w-full justify-start z-40 bg-black/50 h-full md:h-12 items-center border-t-[0px] border-solid border-black-1000">
          <div className='z-50 flex flex-col items-center justify-start h-full w-[70%] gap-2 bg-white p-2 md:w-full md:flex-row md:justify-center md:align-middle md:h-12'>
            {categories.map((category) => (
              <Link key={category.name} href={category.path}
                className={` no-underline border-solid border-b-[1px] md:w-fit p-3 border-black-1000 w-full text-left text-black-1000 cursor-pointer
                    ${isActive(category.path) ? 'border-b-2 border-black-1000 font-bold' : 'border-none'}`}
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
      <div className="fixed top-8 w-full h-20 flex flex-row justify-between md:justify-between bg-white items-center z-50">
        
        {/* Mobile Menu Button */}
        <button id="toggle-button"
          className="md:hidden p-2 h-14 z-[100]"
          onClick={toggleMenu}>
          <HiOutlineBars3 id='bar-icon' className="text-[30px]"></HiOutlineBars3>
          <TfiClose id='times-icon' className="text-[30px] hidden"></TfiClose>
        </button>
        <div className="md:w-1/3 relative md:left-1/3 h-16 z-50 flex justify-center self-start">
          <Link href={'/'}
            className='w-48 h-[4.5rem] relative overflow-hidden'
            onClick={() => { updateCategory(''); }}>
            <Image src={logo} alt='item' priority fill className='object-cover' />
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />
        
        {/* Favorite & Cart Icons
        <div className="w-1/2 md:w-1/3 flex flex-row justify-center md:justify-center gap-3 md:gap-6">
          <Link className='flex justify-end' href='/favorites'>
            <TbHeartFilled className='text-[30px] font-bold text-rose-400'></TbHeartFilled>
          </Link>
        </div>*/}

         
        <div className="w-1/2 md:w-1/3 flex flex-row justify-end md:justify-center gap-3 md:gap-6 px-2">
          <Link className='flex justify-end' href='/favorites'>
            <TbHeartFilled className='text-[30px] font-bold text-rose-400'></TbHeartFilled>
          </Link>
          <Link className='flex justify-end' href='/cart'>
            <BsCart className='text-[30px] font-bold text-black-1000'></BsCart>
            <span className="rounded-full text-white bg-black fixed w-5 h-5 text-center text-sm">{cartCount}</span>
          </Link>
          <Link className='md:left-0 md:relative md:flex md:justify-end' href='/sales'>
            <BsBag className='text-[30px] font-bold text-black-1000'></BsBag>
          </Link>
          <Link className='md:left-0 md:relative md:flex md:justify-end' href='/account'>
            <BsPerson className='text-[30px] font-bold text-black-1000'></BsPerson>
          </Link>
        </div>
      </div>
    </div>
  );
}
