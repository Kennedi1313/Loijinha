import { useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useShoppingFavorites } from '@/hooks/use-shopping-favorites';
import { BsCart, BsCartCheckFill, BsHeart, BsHeartFill, BsWhatsapp } from 'react-icons/bs';
import Head from 'next/head';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import Price from '@/components/price';
import { getProducts, getProductsById } from '@/lib/productClient';
import { Product } from '@/types/ProductTypes';

export default function Details(props: Product) {
    const router = useRouter();
    const { addItemToFavorites, favoritesDetails, removeItem: removeItemFavorites } = useShoppingFavorites();
    const { addItemToCart, cartDetails, removeItem: removeItemCart } = useShoppingCart();
    const toastId = useRef<string>();

    const handleOnAddToCart = () => {
        addItemToCart(props);
        toast.success(`${props.name} adicionado (a) ao seu carrinho!`, {
            id: toastId.current,
        })
    };

    const handleOnAddToFavorites = () => {
        addItemToFavorites(props);
        toast.success(`${props.name} adicionado (a) aos favoritos!`, {
            id: toastId.current,
        })
    };

    const isInFavorites = () => {
        if(favoritesDetails) {
            return Object.keys(favoritesDetails).includes(String(props.id))
         } else { return false }
    }

    const isInCart = () => {
        if(cartDetails) {
            return Object.keys(cartDetails).includes(String(props.id))
         } else { return false }
    }

    return router.isFallback ?  (
        <>
            <Head>
                <title>Loading...</title>
            </Head>
            <p className="text-center text-lg py-12">Loading...</p>
        </>
        ) : (
            <div className='md:container md:max-w-screen-lg mx-auto p-2 my-32 md:px-8 h-full'>
                <div className='flex flex-col md:flex-row justify-between items-center space-y-8 container pt-2 
                    md:pt-12 md:space-y-0 md:space-x-12 h-full'>
                    <div className='relative w-full md:w-[30rem] h-full bg-white'>
                        <img src={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${props.id}/${props.profileImageId}.jpg`}
                            alt='item' className='object-scale-down rounded-md' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 33vw"/>
                    </div>
                    
                    <div className='flex flex-col max-w-md w-full rounded-md gap-2'>
                        {props.quantity == 0 ? 
                            <span className='text-xl font-semibold rounded-lg bg-red-600 py-2 px-4 text-white w-fit'>
                                Produto Indisponível!
                            </span> 
                            : <></>}
                        <p className='text-2xl font-semibold'>{props.name}</p> 
                        <div className="mt-4 border-t pt-4">
                            <p className="text-gray-500">Preço:</p>
                            <Price price={props.price} promo={props.promo}></Price>
                        </div>
                        <div className='mt-4 border-t pt-4'>
                            <p className="text-gray-500">Descrição:</p>
                            <p className='whitespace-pre-line'>{props.description}</p>
                        </div>
                        <div className='flex flex-col w-full cursor-pointer'>
                            {props.quantity > 0 ?
                                
                                <div className='rounded-md flex flex-row text-white 
                                    bg-brown-1000 gap-2 justify-center items-center p-2 h-12 mt-2 w-full'
                                    onClick={() => { isInCart() ? removeItemCart(props) : handleOnAddToCart()}}>
                                    {
                                        isInCart() ? <> <BsCartCheckFill className='w-5 h-5 text-white'></BsCartCheckFill> Remover do carrinho </>
                                        : <><BsCart className='w-5 h-5 opacity-100 text-white'></BsCart> Adicionar ao carrinho </>
                                    }
                                </div>
                                /*
                                <a href={"https://api.whatsapp.com/send?phone=8498594171&text=Olá,%20tudo%20bem?%20Gostaria%20de%20informações%20sobre%20este%20produto:%20https://www.amanditapratas.com.br/details/" + props.id}
                                    target='blank'
                                    className='rounded-md flex flex-row text-white 
                                        bg-green-whatsapp gap-2 justify-center items-center p-2 h-12 mt-2 w-full'>
                                        <BsWhatsapp className='w-5 h-5'></BsWhatsapp>
                                        <span className='font-bold text-[14px]'>Consultar disponibilidade</span>
                                </a>*/
                                :
                                <a href={"https://api.whatsapp.com/send?phone=8498594171&text=Olá,%20tudo%20bem?%20Gostaria%20de%20ser%20avisado%20quando%20este%20produto%20chegar%20em%20estoque:%20https://www.amanditapratas.com.br/details/" + props.id}
                                    target='blank'
                                    className='rounded-md flex flex-row text-white 
                                        bg-green-whatsapp gap-2 justify-center items-center p-2 h-12 mt-2 w-full'>
                                        <BsWhatsapp className='w-5 h-5'></BsWhatsapp>
                                        <span className='font-bold text-[14px]'>Me avise quando chegar</span>
                                </a>
                            }
                            <div className='rounded-md border-[1px] border-rose-400 flex flex-row text-white 
                                    bg-rose-400 gap-2 justify-center items-center p-2 h-12 mt-2 w-full'
                                    onClick={() => { isInFavorites() ? removeItemFavorites(props) : handleOnAddToFavorites()}}>
                                {
                                    isInFavorites() ? 
                                    <><BsHeartFill className='w-5 h-5 text-white'></BsHeartFill> Remover dos favoritos</>
                                    : <><BsHeart className='w-5 h-5 opacity-100 text-white'></BsHeart> Adicionar aos favoritos</>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export async function getStaticPaths() {
    const data = await getProducts()
    const paths = data.content.map((product: Product) => ({params: { id: product.id.toString() }}))
    return { paths, fallback: true }
}
  
export async function getStaticProps({ params }: any) {
    try {
        const data = await getProductsById(params.id)
        return { props: data }
    } catch (error) { return { notFound: true } }
}

