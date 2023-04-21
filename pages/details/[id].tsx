import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Product, useShoppingCart } from '@/hooks/use-shopping-cart';
import Image from 'next/image'
import { BsCartDash, BsCartPlus } from 'react-icons/bs';
import Head from 'next/head';
import { formatCurrency } from '@/lib/utils';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

interface ItemProps {
    id: string,
    name: string,
    gender: string,
    price: number,
    srcImg: string
}

export default function Details(props: ItemProps) {
    const router = useRouter();
    const { cartCount, addItem } = useShoppingCart();
    const [qty, setQty] = useState(1);

    const toastId = useRef<string>();
    const actualCartCount = useRef(cartCount);

    const handleOnAddToCart = () => {
        addItem(props, qty);
    };

    useEffect(() => {
        if (cartCount == actualCartCount.current) {
            return;
        } else {
            actualCartCount.current = cartCount;
        }
        toast.success(`${qty} ${props.name} adicionado (a)`, {
            id: toastId.current,
        })
        setQty(1);
    }, [cartCount]);

    return router.isFallback ?  (
        <>
            <Head>
                <title>Loading...</title>
            </Head>
            <p className="text-center text-lg py-12">Loading...</p>
        </>
        ) : (
        <>
            <div className='container md:max-w-screen-lg mx-auto md:py-12 px-8'>
                <div className='flex flex-col md:flex-row justify-between items-center space-y-8 container py-2 md:py-12 md:px-6 md:space-y-0 md:space-x-12'>
                    <div className='relative w-full h-96 md:w-[30rem] md:h-[30rem]'>
                        <Image 
                            src={props.srcImg}
                            alt='item'
                            fill
                            className='object-contain'
                            sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 100vw,
                                33vw"/>
                    </div>
                    <div className='flex-1 flex-col max-w-mdrounded-md'>
                        <p className='text-4xl'>{props.name}</p> 
                        <p className='text-gray-600'>{props.gender}</p>
                        <div className="mt-8 border-t pt-4">
                            <p className="text-gray-500">Preço:</p>
                            <p className="text-xl font-semibold">{formatCurrency(props.price)}</p>
                        </div>
                        <div className="mt-4 border-t pt-4">
                            <p className="text-gray-500">Quantidade:</p>
                            <div className="mt-1 flex items-center space-x-3">
                                <button
                                    onClick={() => setQty(prev => prev - 1)}
                                    disabled={qty <= 1}
                                    className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-1"
                                >
                                <BsCartDash className="w-6 h-6 flex-shrink-0" />
                                </button>
                                <p className="font-semibold text-xl">{qty}</p>
                                <button
                                    onClick={() => setQty(prev => prev + 1)}
                                    className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                                >
                                <BsCartPlus className="w-6 h-6 flex-shrink-0 " />
                                </button>
                            </div>
                            <button 
                                type="button"
                                className='text-white bg-black-1000 rounded-full px-5 py-3 w-full md:w-fit mt-8 block' 
                                onClick={handleOnAddToCart}>
                                Adicionar ao Carrinho ({qty}) 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const { data: prices } = await stripe.prices.list();
    const products = await Promise.all(prices.map(async (price: any) => {
        const product = await stripe.products.retrieve(price.product)
        return {
            id: price.id,
            name: product.name,
            gender: product.metadata.gender,
            price: price.unit_amount,
            srcImg: product.images[0],
            categories: product.metadata.categories.replaceAll('"', '').split(',')
        }
    }));
    const paths = products.map((product: ItemProps) => ({
        params: { id: product.id },
    }))
    return { paths, fallback: true }
}
  
export async function getStaticProps({ params }: any) {
    try {
        const { data: prices } = await stripe.prices.list();
        const products = await Promise.all(prices.map(async (price: any) => {
            const product = await stripe.products.retrieve(price.product)
            return {
                id: price.id,
                name: product.name,
                gender: product.metadata.gender,
                price: price.unit_amount,
                srcImg: product.images[0],
                categories: product.metadata.categories.replaceAll('"', '').split(',')
            }
        }));
        const props = products?.find((product: ItemProps) => product.id === params.id) ?? {};
        return {
            props,
            revalidate: 1,
        };
    } catch (error) {
        return { notFound: true };
    }
}

