import { useShoppingFavorites } from '@/hooks/use-shopping-favorites'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { BsHeart, BsHeartFill, BsStar, BsStarFill, BsWhatsapp } from 'react-icons/bs'

interface ItemProps {
    id: string,
    name: string,
    price: number,
    srcImg: string
}

export default function Item(props: ItemProps) {
    const { favoritesCount, addItemToFavorites, favoritesDetails, removeItem } = useShoppingFavorites();
    const actualFavoritesCount = useRef(favoritesCount);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);
    const toastId = useRef<string>();
    const isInFavorites = () => {
        if(favoritesDetails) {
            return Object.keys(favoritesDetails).includes(String(props.id))
         } else { 
            return false
         }
    }
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
    <div className='relative'>
        <Link href={'/details/' + props.id} className='flex flex-col gap-1 w-full bg-white'>
            <div className=' w-full relative rounded-md'>
                <img 
                    src={props.srcImg}
                    alt='item'
                    className='object-cover bg-gray-100'
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"/>
                
            </div>
            <div className='flex flex-col gap-1 p-2 justify-between h-[6rem]'>
                <span className='text-md font-thin text-gray-800'>{props.name}</span> 
                <div className='flex flex-col'>
                    <span className='text-xl font-semibold text-gray-800'>
                        {formatCurrency(props.price * 0.95)}
                        <span className='text-sm font-thin'> no pix</span>
                    </span>
                    {props.price >= 10000
                     ? <span className='text-sm font-thin text-gray-700'>ou {formatCurrency(props.price)} em até 3x sem juros</span>
                    : ''
                    }
                </div>
            </div>
        </Link>
        <button className='rounded-full absolute right-1 top-1 border-[1px] border-gray-200 flex flex-row text-black
            bg-white justify-center items-center p-3'
            disabled={adding}
            onClick={() => { isInFavorites() ? removeItem(props) : handleOnAddToFavorites()}}>
            {
                isInFavorites() ? <BsHeartFill className='w-5 h-5 text-rose-400'></BsHeartFill>
                : <BsHeart className='w-5 h-5 text-rose-400'></BsHeart> 
            }
        </button>
    </div>
    )
}