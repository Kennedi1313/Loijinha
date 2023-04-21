import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '@/hooks/use-shopping-cart';
import Header from '../components/header';
import Menu from '../components/menu';
import PromotionBanner from '../components/promotionBanner';
import Footer from '../components/footer';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <CartProvider>
      <div>
          <Header/>
          <Menu/>
          <main className='top-28 relative'>
          <PromotionBanner/>
            <Component {...pageProps} />
            <Footer></Footer>
          </main>
        </div>
      </CartProvider>
      <Toaster />
      <Analytics />
    </>
  ) 
}
