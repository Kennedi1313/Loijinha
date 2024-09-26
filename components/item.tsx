import { useShoppingFavorites } from '@/hooks/use-shopping-favorites'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { BsHeart, BsHeartFill, BsStar, BsStarFill, BsWhatsapp } from 'react-icons/bs'
import Share from './shareSocial'

interface ItemProps {
    id: string,
    name: string,
    price: number,
    quantity: number,
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
        <Link href={'/details/' + props.id} className='flex flex-col gap-1 w-full h-[25rem] md:h-[30rem] bg-white'>
            <div className='h-[20rem] w-full relative'>
                <Image 
                    src={props.srcImg}
                    alt={props.name}
                    quality={50}
                    className='bg-gray-100 object-cover'
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"/>
                
            </div>
            <div className='flex flex-col p-1 justify-between h-[6.5rem] overflow-hidden tex'>
                <span className='text-md leading-5 font-thin text-gray-800'>{props.name}</span> 
                <div className='flex flex-col'>
                    <span className='text-xl font-semibold text-gray-800'>
                    {props.price >= 5000 
                    ?   
                        <span>
                            <span>{ formatCurrency(props.price * 0.95) }</span>
                            <span className='text-sm font-thin'> no pix</span>
                        </span>
                    : formatCurrency(props.price)
                    }
                    </span>
                    {props.price >= 10000
                    ? <span className='text-xs font-thin text-gray-700'>ou {formatCurrency(props.price)} em até 3x sem juros</span>
                    : props.price >= 5000 
                        ? <span className='text-xs font-thin text-gray-700'>ou {formatCurrency(props.price)} em até 1x sem juros</span>
                        : <span className='text-xs font-thin text-gray-700'>em até 1x sem juros</span>
                    }
                </div>
            </div>
        </Link>
        <button className='rounded-full absolute right-1 top-2 border-[1px] border-gray-200 flex flex-row text-black
            bg-white opacity-80 justify-center items-center p-3'
            disabled={adding}
            onClick={() => { isInFavorites() ? removeItem(props) : handleOnAddToFavorites()}}>
            {
                isInFavorites() ? <BsHeartFill className='w-5 h-5 text-rose-400'></BsHeartFill>
                : <BsHeart className='w-5 h-5 opacity-100 text-rose-400'></BsHeart> 
            }
        </button>
        <Share productName={props.name} productUrl={"https://www.amanditapratas.com.br/details/" + props.id} />
        { props.quantity == 0 ?
                <span className='font-bold text-[14px] absolute left-[3%] w-[60%] top-2 rounded-lg bg-red-600 py-2 px-4 text-white md:w-fit'>
                    Produto Indisponível
                </span> 
            : <></>
        }

        { props.quantity == 0 ?
            <a href={"https://api.whatsapp.com/send?phone=8498594171&text=Olá,%20tudo%20bem?%20Gostaria%20de%20ser%20avisado%20quando%20este%20produto%20chegar%20em%20estoque:%20https://www.amanditapratas.com.br/details/" + props.id}
                target='blank'
                className='rounded-md flex flex-row text-white 
                    bg-green-whatsapp gap-2 justify-center items-center py-2 px-4
                    absolute left-[3%] w-[94%] md:h-10 bottom-[27%] md:bottom-[35%]'>
                    <BsWhatsapp className='w-5 h-5'></BsWhatsapp>
                    <span className='font-bold text-[14px]'>Me avise quando chegar</span>
            </a>
        : <></>
        }
    </div>
    )
}