import { useShoppingFavorites } from '@/hooks/use-shopping-favorites'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { BsHeartFill, BsStar, BsStarFill, BsWhatsapp } from 'react-icons/bs'

interface ItemProps {
    id: string,
    name: string,
    gender: string,
    price: number,
    srcImg: string
}

export default function Item(props: ItemProps) {
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
        if (favoritesCount == actualFavoritesCount.current && !adding) {
            return;
        } else {
            actualFavoritesCount.current = favoritesCount;
        }
        setAdding(false);
        toast.success(`${props.name} adicionado (a) aos favoritos!`, {
            id: toastId.current,
        })
        setQty(1);
    }, [adding]);
    return (
    <div>
        <Link href={'/details/' + props.id} className='flex flex-col gap-1 h-[22rem] w-full bg-white'>
            <div className=' w-full h-[14rem] relative rounded-md'>
                <Image 
                    src={props.srcImg}
                    alt='item'
                    fill
                    className='object-cover bg-gray-100'
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"/>
            </div>
            <div className='flex flex-col gap-1 p-2 justify-between h-[8rem]'>
                <span className='text-md font-semibold'>{props.name}</span> 
                {/* <div className='text-sm flex flex-row text-yellow-400'>
                    <BsStarFill></BsStarFill><BsStarFill></BsStarFill><BsStarFill></BsStarFill><BsStarFill></BsStarFill><BsStar></BsStar>
                </div> */}
                <div className='flex flex-col'>
                    <span className='text-sm text-red-600 line-through'>{formatCurrency(props.price + 2000)}</span>
                    <span className='text-xl font-semibold'>{formatCurrency(props.price)}</span>
                </div>
            </div>
        </Link>
        
        <div className='flex flex-col w-full gap-1 z-50 mt-1'>
            <a href={"https://api.whatsapp.com/send?phone=27995074930&text=Olá,%20tudo%20bem?%20Gostaria%20de%20comprar%20este%20produto:%20http://localhost:3000/details/" + props.id} 
                className='rounded-md border-[1px] border-gray-200 flex flex-row 
                bg-white gap-2 justify-between md:justify-center items-center h-8 p-5 w-full'
                    target='blank' >
                <BsWhatsapp className='w-5 h-5 text-green-whatsapp'></BsWhatsapp>
                <p className='font-bold text-[11px]'>COMPRAR AGORA</p>
            </a>
            <button className='rounded-md border-[1px] border-gray-200 flex flex-row text-black
                bg-white gap-2 justify-center items-center h-8 p-5 w-full'
                disabled={adding}
                onClick={handleOnAddToFavorites}>
                <BsHeartFill className='w-5 h-5 text-rose-400'></BsHeartFill>
                <p className='font-bold text-[11px]'>ADICIONAR AOS FAVORITOS</p>
            </button>
        </div>
    </div>
    )
}