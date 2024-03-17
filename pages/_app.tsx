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
import { Helmet, HelmetProvider } from "react-helmet-async";
import { CartProvider } from '@/hooks/use-shopping-cart';
import AuthProvider from '@/components/Context/authContext';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HelmetProvider>
      
        <Helmet>
          <title>Amandita Pratas | Joias em prata 925</title>
          <meta
            name="description"
            content="Clique e conheça a mais nova loja de joias em prata 925 de Natal/RN!"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="www.amanditapratas.com.br" />
          <meta
            property="og:title"
            content="Amandita Pratas | Joias em prata 925"
          />
          <meta
            property="og:description"
            content="Clique e conheça a mais nova loja de joias em prata 925 de Natal/RN!"
          />
          <meta
            property="og:image"
            content="https://amandita-uploads.s3.sa-east-1.amazonaws.com/profile-images/22/aa399f2b-a880-4f19-bf40-6e5d05efa696.jpg"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="google-site-verification" content="mghPEugrbz3VbC_q2WQWAF5h-wZVHYf-7nbbenYIbbI" />
        </Helmet>
        <AuthProvider>
        <CartProvider>
        <FavoritesProvider>
          <div>
            <main >
              <Component {...pageProps}/>
              <ContactFloating></ContactFloating>
              <Footer></Footer>
            </main>
          </div>
        </FavoritesProvider>
        </CartProvider>
        </AuthProvider>
        <Toaster />
        <Analytics />
      </HelmetProvider>
    </>
  ) 
}
