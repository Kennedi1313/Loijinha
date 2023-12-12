import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { FavoritesProvider } from '@/hooks/use-shopping-favorites';
import Header from '../components/header';
import Menu from '../components/menu';
import PromotionBanner from '../components/promotionBanner';
import Footer from '../components/footer';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react'
import ContactFloating from '@/components/contactFloating';
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    {/**<SessionProvider session={pageProps.session}>**/}
      <FavoritesProvider>
        <div>
            {/**<Header/> className="bg-[url('/bg.png')] bg-repeat-y"**/}
            <main >
            {/*<PromotionBanner/>*/}
              <Component {...pageProps}/>
              <ContactFloating></ContactFloating>
              <Footer></Footer>
              <SpeedInsights />
            </main>
          </div>
        </FavoritesProvider>
        <Toaster />
        <Analytics />
      {/**</SessionProvider>**/}
    </>
  ) 
}
