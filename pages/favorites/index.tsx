import Image from 'next/image'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import logo from '../../public/logo2.png'
import Head from 'next/head'
import {
    BsXCircle,
    BsX,
    BsDash,
    BsPlus,
    BsHeart,
    BsWhatsapp,
  } from 'react-icons/bs';
import { formatCurrency } from '@/lib/utils';
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import products from '../../public/items-sample.json'
import Item from '@/components/item';
import { TbHeartFilled, TbPhoneCall } from 'react-icons/tb';
import Menu from '@/components/menu';

export default function Details() {
    const { favoritesDetails, favoritesCount, addItemToFavorites, removeItem, clearFavorites } = useShoppingFavorites();
    const [redirecting, setRedirecting] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [hasPromo, setHasPromo] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setHasMounted(true); 
        let total = 0;
        let promo = false
        Object.entries(favoritesDetails).map(([key, product]: [any, any]) => {
            total += (product.price * (1-(product.promo/100))) * product.quantity;
            promo = promo || product.promo > 0;
            setTotalPrice(total);
            setHasPromo(promo);
        });
    }, [favoritesCount]);

    if (!hasMounted) {
        return null;
    }
    return (
        <>
            <Menu></Menu>
            <div className="md:container xl:max-w-screen-xl mx-auto py-12 p-2 md:px-6 mt-36 min-h-[40vh]">
                {favoritesCount > 0 ? (
                <>
                    <h2 className="text-4xl font-semibold">Seus Favoritos</h2>
                    <p className="mt-1 text-xl">
                    {favoritesCount} itens{' '}
                    <button
                        onClick={clearFavorites}
                        className="opacity-50 hover:opacity-100 text-base capitalize"
                    >
                        (Limpar tudo)
                    </button>
                    </p>
                </>
                ) : (
                <>
                    <h2 className="text-4xl font-semibold">
                    Nenhum produto adicionado aos favoritos.
                    </h2>
                    <div className="mt-1 text-xl">
                    Encontre alguns produtos{' '}
                    <Link href="/">
                        <span className="text-black-1000 underline">aqui!</span>
                    </Link>
                    </div>
                </>
                )}

                {favoritesCount > 0 ? (
                <div className="mt-12">
                    {Object.entries(favoritesDetails).map(([key, product]: [any, any]) => (
                    <div
                        key={key}
                        className="flex flex-col gap-4 mt-2 md:flex-row justify-between space-x-4 border border-opacity-0 rounded-md p-2 md:p-4"
                    >
                        {/* Image + Name */}
                        <Link href={`/details/${product.id}`}>
                        <div className="flex items-center space-x-4 group">
                            <div className="relative w-20 h-20 ">
                            <Image
                                src={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${product.id}/${product.profileImageId}.jpg`}
                                alt={product.name}
                                fill
                                className='object-cover rounded-md'
                                sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                            />
                            </div>
                            <div>
                                <p className="font-semibold text-xl group-hover:underline">
                                    {product.name}
                                </p>
                            </div>    
                        </div>
                        </Link>

                        {/* Price + Actions */}
                        <div className="flex items-center justify-around">
                        {/* Quantity */}
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => removeItem(product)}
                                disabled={product?.quantity <= 1}
                                className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-1"
                            >
                                <BsDash className="w-6 h-6 flex-shrink-0" />
                            </button>
                            <p className="font-semibold text-xl">{product.quantity}</p>
                            <button
                                onClick={() => addItemToFavorites(product, 1)}
                                className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                            >
                                <BsPlus className="w-6 h-6 flex-shrink-0 " />
                            </button>
                        </div>

                        {/* Price */}
                        <div className="font-semibold text-xl md:ml-16 items-center justify-center flex flex-row">
                            <BsX className="w-4 h-4 text-gray-500 inline-block" />
                            <div className='flex flex-col justify-start items-start ml-1'>
                                {
                                    product.promo > 0
                                    ?
                                    <span className='flex flex-col'>
                                        <span className='line-through text-sm text-red-600 font-normal'>{ formatCurrency(product.price) }</span>
                                        <span>{ formatCurrency(product.price, product.promo) }</span>
                                    </span>
                                    :
                                    <span>
                                        <span>{ formatCurrency(product.price, product.promo) }</span>
                                    </span>
                                }
                            </div>
                            
                        </div>

                        {/* Remove item */}
                        <button
                            onClick={() => removeItem(product, product.quantity)}
                            className="ml-4 hover:text-rose-500"
                        >
                            <BsXCircle className="w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                        </button>
                        </div>
                    </div>
                    ))}

                    <div className="flex flex-col justify-between items-start md:items-end border-t py-4 mt-8 gap-2">
                    <div className="text-xl md:self-end flex flex-row gap-2 justify-center items-end p-2">
                        <div className="">
                            <p className="text-gray-500">Preço Total:</p>
                            <div className='flex flex-col'>
                                <span className='text-xl font-semibold text-gray-800'>
                                    {!hasPromo && totalPrice > 5000 
                                    ?   
                                        <span>
                                            <span>{ formatCurrency(totalPrice * 0.95) }</span>
                                            <span className='text-sm font-thin'> no pix</span>
                                        </span>
                                    : formatCurrency(totalPrice)
                                    }
                                </span>
                                {totalPrice >= 10000
                                ? <span className='text-sm font-thin text-gray-700'>ou 3x de {formatCurrency(totalPrice, 0, 3)} sem juros</span>
                                : totalPrice >= 5000 
                                    ? <span className='text-xs font-thin text-gray-700'>ou 1x de {formatCurrency(totalPrice)} sem juros</span>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                
                ) : null}
            </div>           
        </>
    )
}