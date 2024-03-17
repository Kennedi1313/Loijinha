import MenuItem from "./menuItem";
import Image from 'next/image'
import MenuItemNode from "./menuItemNode";
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import logo from '../public/logo2.png'
import { useEffect, useState } from "react";
import { BsArrowRight, BsCart, BsHeart, BsMenuApp, BsMenuButton, BsPerson, BsPersonBadge, BsPersonDash } from 'react-icons/bs'
import { FaBars, FaTimes, FaXRay, FaXing } from 'react-icons/fa'
import { HiOutlineBars3 } from "react-icons/hi2";
import Head from 'next/head'
import { TbHeartFilled } from "react-icons/tb";
import PromotionBanner from "./promotionBanner";
import { TfiClose } from "react-icons/tfi";

export default function Menu() {
  const [hasMounted, setHasMounted] = useState(false);
  function toggleMenu() {
      var menu = document.getElementById('menu');
      menu?.classList.toggle('hidden');
      menu?.classList.toggle('h-screen');
      var toggle = document.getElementById('toggle-button');
      toggle?.classList.toggle('color-white');
      var bar = document.getElementById('bar-icon');
      bar?.classList.toggle('hidden');
      var times = document.getElementById('times-icon');
      times?.classList.toggle('hidden');
  }

  const { totalPrice, favoritesCount } = useShoppingFavorites();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
    return (
      <div id="menu-container" className="fixed top-0 w-full h-20 
        z-50 bg-rose-1000">
        <Head>
          <title>Amandita</title>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''}/>
          <link href="https://fonts.googleapis.com/css2?family=Unlock&display=swap" rel="stylesheet"></link>
        </Head>
        <button id="toggle-button"
          className="fixed block md:hidden left-4 w-12 h-14 z-[100] top-11"
          onClick={toggleMenu}>
          <HiOutlineBars3 id='bar-icon' className="w-7 h-7 font-extralight"></HiOutlineBars3>
          <TfiClose id='times-icon' className="w-7 h-7 p-1 hidden"></TfiClose>
        </button>
      
        <menu id="menu" className="fixed hidden md:block top-0 left-0 shadow-sm z-40">
          <div className="top-28 fixed w-full justify-center
                z-40 bg-black/50 h-full md:h-12 md:shadow-md md:shadow-gray-300/30 items-center
                border-t-[1px] border-solid border-brown-1000">
            <div className='z-50 flex flex-col  items-center justify-start 
               h-full w-[70%] gap-2 bg-white p-2
               md:w-full md:flex-row md:justify-center md:align-middle md:h-12'>
              
              <Link href={'/products/aneis'} 
                className='p-2 no-underline border-solid border-b-[1px] md:border-none md:w-fit border-brown-1000 w-full text-left text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Anel
              </Link>
              <Link href={'/products/brincos'} 
                className='p-2 no-underline border-solid border-b-[1px] md:border-none md:w-fit border-brown-1000 w-full text-left text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Brinco
              </Link>
              <Link href={'/products/colares'} 
                className='p-2 no-underline border-solid border-b-[1px] md:border-none md:w-fit border-brown-1000 w-full text-left text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Colar
              </Link>
              <Link href={'/products/correntes'} 
                className='p-2 no-underline border-solid border-b-[1px] md:border-none md:w-fit border-brown-1000 w-full text-left text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Corrente
              </Link>
              <Link href={'/products/pulseiras'} 
                className='p-2 no-underline border-solid border-b-[1px] md:border-none md:w-fit border-brown-1000 w-full text-left text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Pulseira
              </Link>
              <Link href={'/products/tornozeleiras'} 
                className='p-2 no-underline border-solid border-b-[1px] md:border-none md:w-fit border-brown-1000 w-full text-left text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Tornozeleira
              </Link>
              <Link href={'/products/pingentes'} 
                className='p-2 no-underline border-solid border-b-[1px] md:border-none md:w-fit border-brown-1000 w-full text-left text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Pingente
              </Link>
              <Link href={'/products/conjuntos'} 
                className='p-2 no-underline border-solid border-b-[1px] md:border-none md:w-fit border-brown-1000 w-full text-left text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Conjunto
              </Link>
            </div>
          </div>
        </menu>
        
        <PromotionBanner></PromotionBanner>
        <div id="menu-container" className="fixed top-8 w-full h-20 flex flex-row justify-between md:justify-between
                   bg-rose-1000 items-center z-50">
            <div className="w-1/4 block md:hidden"></div>
            <Link href={'/'} className='w-44 h-20 relative md:left-8 md:mx-6 overflow-hidden'>
              <Image 
                  src={logo}
                  alt='item'
                  priority
                  fill
                  className='object-cover'
                  sizes="(max-width: 768px) 50vw,
                  (max-width: 1200px) 50vw,
                  33vw"/>
            </Link>
            <div className="md:w-2/4 hidden md:block"></div>
            <div className="w-1/4 flex flex-row justify-center gap-2 md:gap-6">
              <Link className='flex justify-end' href={'/favorites'}>
                <TbHeartFilled className='text-[27px] font-bold text-rose-400'></TbHeartFilled>
                <BsHeart className='text-2xl font-bold text-brown-1000 -ml-[25px] mt-[2px]'></BsHeart>
              </Link>
              { /*
                <Link className='flex justify-end' href={'/cart'}>
                  <BsCart className='text-2xl font-bold text-brown-1000'></BsCart>
                </Link>
                <Link className='flex justify-end' href={'/account'}>
                  <BsPerson className='text-2xl font-bold text-brown-1000'></BsPerson>
                </Link>
              */}
            </div>
          </div>
          
      </div>
    )
}