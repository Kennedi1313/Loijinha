import Image from 'next/image'
import { useEffect, useState } from 'react';
import {
    BsXCircle,
    BsX,
    BsDash,
    BsPlus,
    BsArrowRight,
  } from 'react-icons/bs';
import { formatCurrency } from '@/lib/utils';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import ProtectedRoute from '../protectedRoute';
import Link from 'next/link';

const Cart = () => {
    const { cartDetails, cartCount, addItemToCart, removeItem, clearCart } = useShoppingCart();
    const [hasMounted, setHasMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasPromo, setHasPromo] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        setHasMounted(true);
        let total = 0;
        let promo = false
        Object.entries(cartDetails).map(([key, product]: [any, any]) => {
            total += (product.price * (1-(product.promo/100))) * product.quantity;
            promo = promo || product.promo > 0;
            setTotalPrice(total);
            setHasPromo(promo);
        });
    }, [cartCount]);

    if (!hasMounted) {
        return null;
    }

    return (
            <div className="md:container xl:max-w-screen-xl mx-auto py-12 p-2 md:px-6 mt-36 min-h-[40vh]">
                {cartCount > 0 ? (
                <>
                    <h2 className="text-4xl font-semibold">Seu Carrinho</h2>
                    <p className="mt-1 text-xl">
                    {cartCount} itens no carrinho{' '}
                    <button
                        onClick={clearCart}
                        className="opacity-50 hover:opacity-100 text-base capitalize"
                    >
                        (Limpar tudo)
                    </button>
                    </p>
                </>
                ) : (
                <>
                    <h2 className="text-4xl font-semibold">
                    Nenhum produto adicionado ao carrinho.
                    </h2>
                    <div className="mt-1 text-xl">
                    Encontre alguns produtos{' '}
                    <Link href="/">
                        <span className="text-black-1000 underline">aqui!</span>
                    </Link>
                    </div>
                </>
                )}

                {cartCount > 0 ? (
                <div className="mx-auto flex flex-col gap-2 md:px-0 py-5 my-2">
                    {Object.entries(cartDetails).map(([key, product]: [any, any]) => (
                    <div
                        key={key}
                        className="flex flex-col gap-4 md:flex-row justify-between space-x-4 rounded-md p-2"
                    >
                        {/* Image + Name */}
                        <Link href={`/details/${product.id}`}>
                        <div className="flex items-center space-x-4 group">
                            <div className="relative w-20 h-20 scale-110">
                                <Image
                                    src={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${product.id}/${product.profileImageId}.jpg`}
                                    alt={product.name}
                                    fill
                                    loading="lazy"
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
                                onClick={() => addItemToCart(product, 1)}
                                disabled={product?.quantity == 10}
                                className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-green-100 hover:text-green-500 rounded-md p-1"
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

                    <div className="flex flex-col justify-between py-4 mt-8 gap-2 w-full">
                        <div className="flex flex-col border-t py-4 gap-2 w-full items-start">
                            <div className="text-xl flex flex-col gap-2 items-start">
                                <p className="mt-1 text-xl text-gray-500">Preço Total:</p>
                                <span className="text-xl font-semibold text-gray-800">
                                    {!hasPromo && totalPrice > 5000 ? (
                                        <>
                                            <span>{formatCurrency(totalPrice * 0.95)}</span>
                                            <span className="text-sm font-thin"> no pix</span>
                                        </> ) 
                                    : ( formatCurrency(totalPrice) )}
                                </span>
                                {totalPrice >= 10000 ? (
                                    <span className="text-sm font-thin text-gray-700">
                                        ou 3x de {formatCurrency(totalPrice, 0, 3)} sem juros
                                    </span> ) 
                                : totalPrice >= 5000 ? (
                                    <span className="text-xs font-thin text-gray-700">
                                        ou 1x de {formatCurrency(totalPrice)} sem juros
                                    </span> ) 
                                : ("")}
                            </div>
                        </div>
                        
                        <Link 
                            href={'/checkout'}
                            className="text-white flex flex-row items-center justify-center gap-2 hover:gap-4 bg-black-1000 w-full self-end rounded-md px-5 py-3 md:mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Redirecionando...' : 'Revisar Pedido'}
                            <BsArrowRight className='text-white text-lg'></BsArrowRight>
                        </Link>
                    </div>
                </div>
                
                ) : null}
            </div>      
    )
}

export default ProtectedRoute(Cart);