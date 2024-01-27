import MenuItem from "./menuItem";
import Image from 'next/image'
import MenuItemNode from "./menuItemNode";
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import logo from '../public/logo2.png'
import { useEffect, useState } from "react";
import { BsCart, BsPerson } from 'react-icons/bs'
import { FaBars, FaTimes, FaXRay, FaXing } from 'react-icons/fa'
import Head from 'next/head'
import { TbHeartFilled } from "react-icons/tb";

export default function Menu() {
  const [hasMounted, setHasMounted] = useState(false);
  function toggleMenu() {
      var menu = document.getElementById('menu');
      menu?.classList.toggle('hidden');
      menu?.classList.toggle('w-[70%]');
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
          className="fixed right-0 w-12 h-14 block md:hidden z-[100] top-5"
          onClick={toggleMenu}>
          <FaBars id='bar-icon' className="w-6 h-8"></FaBars>
          <FaTimes id='times-icon' className="w-6 h-8 hidden"></FaTimes>
        </button>
      
        <menu id="menu" className="
          fixed hidden top-0 left-0 shadow-sm
          md:top-0 md:h-fit bg-white md:py-0 md:block md:w-full">

          <div className="top-24 fixed w-[70%] md:w-full p-2 md:h-14 justify-center
                z-50 bg-white border-solid border-brown-1000 border-t-[3px]
                shadow-sm md:shadow-gray-400 items-center">
            <div className='flex flex-col md:flex-row items-center justify-center w-full gap-2'>
              
              <Link href={'/products/aneis'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Anel
              </Link>
              <Link href={'/products/brincos'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Brinco
              </Link>
              <Link href={'/products/colares'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Colar
              </Link>
              <Link href={'/products/correntes'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Corrente
              </Link>
              <Link href={'/products/pulseiras'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Pulseira
              </Link>
              <Link href={'/products/conjuntos'} 
                className='p-2 no-underline border-solid border-b-2 border-brown-1000 md:border-none w-full md:w-fit text-center text-black-1000 cursor-pointer'
                onClick={toggleMenu}>Conjunto
              </Link>
            </div>
          </div>
        </menu>
        <div id="menu-container" className="fixed top-0 w-full h-24 flex flex-row justify-start md:justify-between
                   bg-rose-1000 items-center">
            
            <Link href={'/'} className='w-52 h-20 relative mx-6 overflow-hidden'>
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
            <Link className='w-1/4 md:w-1/3 flex justify-end mr-20 md:mr-8' href={'/favorites'}>
              <TbHeartFilled className='text-4xl font-bold text-rose-400'></TbHeartFilled>
            </Link>
          </div>
          
      </div>
    )
}