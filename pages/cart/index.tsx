import Image from 'next/image'
import { useEffect, useState } from 'react';
import {
    BsXCircle,
    BsX,
    BsDash,
    BsPlus,
    BsHeart,
    BsWhatsapp,
  } from 'react-icons/bs';
import { formatCurrency } from '@/lib/utils';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import Menu from '@/components/menu';
import ProtectedRoute from '../protectedRoute';
import Link from 'next/link';

const Cart = () => {
    const { cartDetails, totalPrice, cartCount, addItemToCart, removeItem, clearCart } = useShoppingCart();
    const [redirecting, setRedirecting] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }
    return (
        <>
            <Menu></Menu>
            <div className="md:container xl:max-w-screen-xl mx-auto py-12 p-2 md:px-6 mt-36 min-h-[40vh]">
                {cartCount > 0 ? (
                <>
                    <h2 className="text-4xl font-semibold">Seu Carrinho</h2>
                    <p className="mt-1 text-xl">
                    {cartCount} itens{' '}
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
                <div className="mt-12">
                    {Object.entries(cartDetails).map(([key, product]: [any, any]) => (
                    <div
                        key={key}
                        className="flex flex-col gap-4 mt-2 md:flex-row justify-between space-x-4 hover:shadow-lg hover:border-opacity-50 border border-opacity-0 rounded-md p-2 md:p-4"
                    >
                        {/* Image + Name */}
                        <Link href={`/details/${product.id}`}>
                        <div className="flex items-center space-x-4 group">
                            <div className="relative w-20 h-20 group-hover:scale-110 transition-transform">
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
                                className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                            >
                                <BsPlus className="w-6 h-6 flex-shrink-0 " />
                            </button>
                        </div>

                        {/* Price */}
                        <div className="font-semibold text-xl md:ml-16 items-center justify-center flex flex-row">
                            <BsX className="w-4 h-4 text-gray-500 inline-block" />
                            <div className='flex flex-col justify-start items-start ml-1'>
                                {formatCurrency(product.price)}
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

                    <div className="flex flex-col justify-between items-center md:items-end border-t py-4 mt-8 gap-2">
                    <p className="text-xl self-end flex flex-row gap-2 justify-center items-end">
                        Total:{' '}
                        <span className="font-semibold flex flex-col">
                            {formatCurrency(totalPrice)}
                        </span>
                    </p>
                    <div className='flex flex-col w-full p-2 mb-2'>
                        <h1 className='text-2xl mb-2'>Forma de envio:</h1>
                        <div className="w-full">
                            <label className="flex gap-2 flex-row">
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="retirada"
                                    checked={true}/>
                                Retirada na loja (grátis)
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="flex flex-row gap-2">
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="entrega"/>
                                Entrega para Natal (R$ 10,00)
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={() => {}}
                        disabled={redirecting}
                        className="text-white bg-black-1000 w-full self-end rounded-md px-5 py-3 md:mt-8 md:block disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {redirecting ? 'Redirecionando...' : 'Revisar Pedido'}
                    </button>
                    
                    </div>
                </div>
                
                ) : null}
            </div>           
        </>
    )
}

export default ProtectedRoute(Cart);