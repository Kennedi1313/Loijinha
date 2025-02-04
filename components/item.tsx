import { useShoppingFavorites } from '@/hooks/use-shopping-favorites'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { BsCart, BsCartCheck, BsCartCheckFill, BsHeart, BsHeartFill, BsStar, BsStarFill, BsWhatsapp } from 'react-icons/bs'
import Share from './shareSocial'
import Price from './price'
import { useShoppingCart } from '@/hooks/use-shopping-cart'

interface ItemProps {
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    profileImageId: string
    promo: number
}

export default function Item(props: ItemProps) {
    const { favoritesCount, addItemToFavorites, favoritesDetails, removeItem: removeItemFavorites } = useShoppingFavorites();
    const { cartCount, addItemToCart, cartDetails, removeItem: removeItemCart } = useShoppingCart();
    const [adding, setAdding] = useState(false);
    const toastId = useRef<string>();
    const isInFavorites = () => {
        if(favoritesDetails) {
            return Object.keys(favoritesDetails).includes(String(props.id))
         } else { 
            return false
         }
    }

    const isInCart = () => {
        if(cartDetails) {
            return Object.keys(cartDetails).includes(String(props.id))
         } else { 
            return false
         }
    }

    const handleOnAddToCart = () => {
        setAdding(true);
        addItemToCart(props);
        setAdding(false);
        toast.success(`${props.name} adicionado ao carrinho!`, {
            id: toastId.current,
        })
    };

    const handleOnAddToFavorites = () => {
        setAdding(true);
        addItemToFavorites(props);
        setAdding(false);
        toast.success(`${props.name} adicionado aos favoritos!`, {
            id: toastId.current,
        })
    };

    return (
    <div className='relative'>
        <Link href={'/details/' + props.id} className='flex flex-col gap-1 w-full h-[28rem] bg-white'>
            <div className='h-[20rem] w-full relative'>
                <Image 
                    src={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${props.id}/${props.profileImageId}.jpg`}
                    alt={props.name}
                    quality={50}
                    className='bg-gray-100 object-cover'
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"/>
                
            </div>
            <div className='flex flex-col p-1 justify-between h-[7rem] overflow-hidden tex'>
                <span className='text-md leading-5 font-thin text-gray-800'>{props.name}</span> 
                <Price price={props.price} promo={props.promo}></Price>
            </div>
            
        </Link>
        {/* add to cart
        <button className='flex flex-row justify-center items-center p-3 gap-2 bg-brown-1000 w-full rounded-md text-white'
            disabled={adding}
            onClick={() => { isInCart() ? removeItemCart(props) : handleOnAddToCart()}}>
                
            {
                isInCart() ? <> <BsCartCheckFill className='w-5 h-5 text-white'></BsCartCheckFill> Remover do carrinho </>
                : <><BsCart className='w-5 h-5 opacity-100 text-white'></BsCart> Adicionar ao carrinho </>
            }
            
        </button>
        */}
        <button className='rounded-full absolute right-1 top-2 border-[1px] border-gray-200 flex flex-row text-black
            bg-white opacity-80 justify-center items-center p-3'
            disabled={adding}
            onClick={() => { isInFavorites() ? removeItemFavorites(props) : handleOnAddToFavorites()}}>
            {
                isInFavorites() ? <BsHeartFill className='w-5 h-5 text-rose-400'></BsHeartFill>
                : <BsHeart className='w-5 h-5 opacity-100 text-rose-400'></BsHeart> 
            }
        </button>

        <Share productName={props.name} productUrl={"https://www.amanditapratas.com.br/details/" + props.id} />
        
        { props.quantity > 0 && props.promo > 0 ?
                <span className='font-bold text-[14px] absolute left-[3%] top-2 rounded-lg bg-brown-1000 py-2 px-4 text-white w-fit'>
                    -{props.promo}%
                </span> 
            : <></>
        }
        
        { props.quantity == 0 ?
                <span className='font-bold text-[14px] absolute left-[3%] w-[60%] top-2 rounded-lg bg-red-600 py-2 px-4 text-white md:w-fit'>
                    Produto Indisponível
                </span> 
            : <></>
        }

        { /* props.quantity == 0 ?
            <a href={"https://api.whatsapp.com/send?phone=8498594171&text=Olá,%20tudo%20bem?%20Gostaria%20de%20ser%20avisado%20quando%20este%20produto%20chegar%20em%20estoque:%20https://www.amanditapratas.com.br/details/" + props.id}
                target='blank'
                className='rounded-md flex flex-row text-white 
                    bg-green-whatsapp gap-2 justify-center items-center py-2 px-4
                    absolute left-[3%] w-[94%] md:h-10 bottom-[37%]'>
                    <BsWhatsapp className='w-5 h-5'></BsWhatsapp>
                    <span className='font-bold text-[14px]'>Me avise quando chegar</span>
            </a>
        : <></>
        */}

        { props.quantity == 0 ?
            <a href={"https://api.whatsapp.com/send?phone=8498594171&text=Olá,%20tudo%20bem?%20Gostaria%20de%20ser%20avisado%20quando%20este%20produto%20chegar%20em%20estoque:%20https://www.amanditapratas.com.br/details/" + props.id}
                target='blank'
                className='rounded-md flex flex-row text-white 
                    bg-green-whatsapp gap-2 justify-center items-center py-2 px-4
                    absolute left-[3%] w-[94%] md:h-10 bottom-[30%]'>
                    <BsWhatsapp className='w-5 h-5'></BsWhatsapp>
                    <span className='font-bold text-[14px]'>Me avise quando chegar</span>
            </a>
        : <></>
        }
    </div>
    )
}