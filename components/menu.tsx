import MenuItem from "./menuItem";
import MenuItemNode from "./menuItemNode";
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { BsCart } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'

export default function Menu() {
  const [hasMounted, setHasMounted] = useState(false);
  function toggleMenu() {
      var menu = document.getElementById('menu');
      menu?.classList.toggle('hidden');
      menu?.classList.toggle('w-full');
      menu?.classList.toggle('h-screen');
      menu?.classList.toggle('z-50');
      var toggle = document.getElementById('toggle-button');
      toggle?.classList.toggle('color-white');
      toggle?.classList.toggle('z-100');
  }

  const { totalPrice, cartCount } = useShoppingCart();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
    return (
      <div id="menu-container" className="fixed top-10 w-full h-[4.5rem] p-1 z-50 bg-white shadow-sm shadow-slate-200">
      
      <button id="toggle-button"
        className="fixed right-2 pl-6 pr-2 w-14 h-14 block md:hidden"
        onClick={toggleMenu}>
        <FaBars className="w-6 h-6"></FaBars>
      </button>
      
      <menu id="menu" className="
        fixed hidden top-0 right-0 px-10 py-16 bg-black-1000 z-40 shadow-sm
        md:top-10 md:h-fit md:bg-white md:py-0 md:block md:w-full">
        <div className='w-full md:flex mx-auto justify-center'>
          <li className="md:hidden z-90 fixed top-4 right-6">
              <button className="text-right text-white text-4xl"
                  onClick={toggleMenu}>&times;</button>
          </li>
          
          <MenuItemNode onClick={toggleMenu} name="Home" src="/products/index">
          </MenuItemNode>

          <MenuItemNode onClick={toggleMenu} name="Seleções" src="/products/selecao">
          </MenuItemNode>
          
          <MenuItemNode onClick={toggleMenu} name="Brasileirão" src="/products/brasileirao">
          </MenuItemNode>
        
          <MenuItemNode onClick={toggleMenu} name="Internacional" src="/products/inter">
          </MenuItemNode>
        </div>
      </menu>
      <Link 
            href={'/'}
            className="text-2xl text-black-1000 font-bold flex items-center absolute left-8 top-4 md:z-50 z-40">
              Loijinha
          </Link>
        <Link href="/cart" id="cart" className="absolute right-14 md:h-14 h-14 flex center z-40 md:z-50">
          <span className="absolute h-[25px] w-[25px] top-[5px] right-[-10px] 
            bg-black text-white font-semibold text-sm rounded-full z-40 justify-center flex items-center">
              {cartCount}
          </span>
          <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
            <div className="relative">
              <BsCart className="w-7 h-7 flex-shrink-0" />
            </div>
          </div>
        </Link>
      </div>
    )
}