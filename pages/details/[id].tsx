import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import Image from 'next/image'
import { BsCartDash, BsCartPlus, BsHeart, BsHeartFill, BsStar, BsStarFill, BsWhatsapp } from 'react-icons/bs';
import { TbHeart, TbHeartFilled, TbPhoneCall, TbRulerMeasure, TbSearch } from 'react-icons/tb'
import Head from 'next/head';
import { formatCurrency } from '@/lib/utils';
import Item from '@/components/item';
import logo from '../../public/logo2.png'
import Link from 'next/link';
import Menu from '@/components/menu';
let products = require('../../public/items-sample.json');
interface ItemProps {
    id: string,
    name: string,
    description: string,
    price: number,
    srcImg: string,
    size: string
}

export default function Details(props: ItemProps) {
    const router = useRouter();
    const { favoritesCount, addItemToFavorites } = useShoppingFavorites();
    const actualFavoritesCount = useRef(favoritesCount);
    const [qty, setQty] = useState(1);

    const [adding, setAdding] = useState(false);
    const toastId = useRef<string>();

    const handleOnAddToFavorites = () => {
            setAdding(true);
            addItemToFavorites(props);
    };

    useEffect(() => {
        if (favoritesCount == actualFavoritesCount.current) {
            return;
        } else {
            actualFavoritesCount.current = favoritesCount;
        }
        setAdding(false);
        toast.success(`${props.name} adicionado (a) aos favoritos!`, {
            id: toastId.current,
        })
        setQty(1);
    }, [favoritesCount]);

    return router.isFallback ?  (
        <>
            <Head>
                <title>Loading...</title>
            </Head>
            <p className="text-center text-lg py-12">Loading...</p>
        </>
        ) : (
        <>
            <Menu></Menu>
            <div className='md:container md:max-w-screen-lg mx-auto p-2 my-28 md:px-8'>
                <div className='flex flex-col md:flex-row justify-between items-center space-y-8 container pt-2 md:pt-12 md:space-y-0 md:space-x-12'>
                    <div className='relative w-full h-96 md:w-[30rem] md:h-[30rem] bg-white'>
                        <Image 
                            src={props.srcImg}
                            alt='item'
                            fill
                            className='object-cover rounded-md'
                            sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 100vw,
                                33vw"/>
                    </div>
                    <div className='flex-1 flex-col max-w-md w-full rounded-md gap-2'>
                        <p className='text-2xl font-semibold'>{props.name}</p> 
                        <div className="mt-4 border-t pt-4">
                            <p className="text-gray-500">Preço:</p>
                            <p className="text-xl font-semibold">{formatCurrency(props.price)}</p>
                        </div>
                        <div className='mt-4 border-t pt-4'>
                            <p className="text-gray-500">Descrição:</p>
                            <p>{props.description}</p>
                        
                        </div>
                        <div className='flex flex-col w-full cursor-pointer'>
                            <a href={"https://api.whatsapp.com/send?phone=27995074930&text=Olá,%20tudo%20bem?%20Gostaria%20de%20comprar%20este%20produto:%20http://localhost:3000/details/" + props.id}
                                target='blank'
                                className='rounded-md border-[1px] border-green-whatsapp flex flex-row text-green-whatsapp 
                                    bg-green-100 gap-2 justify-center items-center p-2 h-12 mt-4 w-full'>
                                    <BsWhatsapp className='w-5 h-5'></BsWhatsapp>
                                    <span className='font-bold text-[12px]'>COMPRAR AGORA</span>
                            </a>
                            <div className='rounded-md border-[1px] border-rose-400 flex flex-row text-rose-400 
                                    bg-rose-100 gap-2 justify-center items-center p-2 h-12 mt-2 w-full'
                                onClick={handleOnAddToFavorites}>
                                <BsHeartFill className='w-5 h-5'></BsHeartFill>
                                <span className='font-bold text-[12px]'>ADICIONAR AOS FAVORITOS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const paths = products.map((product: ItemProps) => ({
        params: { id: product.id },
    }))
    return { paths, fallback: true }
}
  
export async function getStaticProps({ params }: any) {
    try {
        const props = products?.find((product: ItemProps) => product.id === params.id) ?? {};
        return {
            props,
        };
    } catch (error) {
        console.log(error)
        return { notFound: true };
    }
}

