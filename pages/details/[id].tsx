import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import Image from 'next/image'
import { BsCartDash, BsCartPlus, BsHeart } from 'react-icons/bs';
import { TbRulerMeasure } from 'react-icons/tb'
import Head from 'next/head';
import { formatCurrency } from '@/lib/utils';
import Item from '@/components/item';
import mascSizeImg from '../../public/masc_size.png';
import femSizeImg from '../../public/fem_size.png';
let products = require('../../public/items-sample.json');
interface ItemProps {
    id: string,
    name: string,
    gender: string,
    price: number,
    srcImg: string,
    size: string
}

export default function Details(props: ItemProps) {
    const router = useRouter();
    const { cartCount, addItem } = useShoppingCart();
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);
    const toastId = useRef<string>();
    const actualCartCount = useRef(cartCount);
    const [size, setSize] = useState('');
    const [model, setModel] = useState('');
    const [modelTable, setModelTable] = useState('masc');

    const handleOnAddToCart = () => {
        if (size && model) {
            setAdding(true);
            addItem(props, qty, size, model);
        } else 
            toast.error(`Necessário informar todas as características do produto`, {
                id: toastId.current,
            })
    };

    function toggleSizeButton (e: any, target: any): any {
        var button = document.getElementById(target);
        button?.classList.toggle('bg-black-1000');
        button?.classList.toggle('text-white');

        if (size != target) {
            var button2 = document.getElementById(size); 
            button2?.classList.toggle('bg-black-1000');
            button2?.classList.toggle('text-white');
            setSize(target)
        } else {
            setSize('');
        }
    }

    function toggleModelButton (e: any, target: any): any {
        var button = document.getElementById(target);
        button?.classList.toggle('bg-black-1000');
        button?.classList.toggle('text-white');

        if (model != target) {
            var button2 = document.getElementById(model); 
            button2?.classList.toggle('bg-black-1000');
            button2?.classList.toggle('text-white');
            setModel(target)
        } else {
            setModel('');
        }
    }

    useEffect(() => {
        if (cartCount == actualCartCount.current) {
            return;
        } else {
            actualCartCount.current = cartCount;
        }
        setAdding(false);
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
            <div className='md:container md:max-w-screen-lg mx-auto p-2 md:pt-12 md:px-8'>
                <div className='flex flex-col md:flex-row justify-between items-center space-y-8 container pt-2 md:pt-12 md:space-y-0 md:space-x-12'>
                    <div className='relative w-full h-96 md:w-[30rem] md:h-[30rem]'>
                        <Image 
                            src={props.srcImg}
                            alt='item'
                            fill
                            className='object-contain bg-gray-200'
                            sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 100vw,
                                33vw"/>
                    </div>
                    <div className='flex-1 flex-col max-w-md w-full rounded-md gap-2'>
                        <p className='text-2xl font-semibold'>{props.name}</p> 
                        <div className="mt-8 border-t pt-4">
                            <p className="text-gray-500">Preço:</p>
                            <p className="text-xl font-semibold">{formatCurrency(props.price)}</p>
                        </div>
                        <div className='mt-4 border-t pt-4'>
                            <p className="text-gray-500">Tamanho:</p>
                            <div className='mt-1 gap-2 flex flex-row justify-between text-center'>
                                <button 
                                    id='p'
                                    onClick={(e) => toggleSizeButton(e, 'p')}
                                    className='w-full py-1 px-2 border-solid border-black-1000 border-2 rounded-md'>
                                        P
                                </button>
                                <button 
                                    id='m'
                                    onClick={(e) => toggleSizeButton(e, 'm')}
                                    className='w-full py-1 px-2 border-solid border-black-1000 border-2 rounded-md'>
                                        M
                                </button>
                                <button 
                                    id='g'
                                    onClick={(e) => toggleSizeButton(e, 'g')}
                                    className='w-full py-1 px-2 border-solid border-black-1000 border-2 rounded-md'>
                                        G
                                </button>
                                <button 
                                    id='gg'
                                    onClick={(e) => toggleSizeButton(e, 'gg')}
                                    className='w-full py-1 px-2 border-solid border-black-1000 border-2 rounded-md'>
                                        GG
                                </button>
                            </div>
                        </div>
                        <div className='mt-4 border-t pt-4'>
                            <p className="text-gray-500">Modelo:</p>
                            <div className='mt-1 flex flex-row justify-between text-center gap-2'>
                                <button 
                                    id='masc'
                                    onClick={(e) => toggleModelButton(e, 'masc')}
                                    className='w-full py-1 px-2 border-solid border-black-1000 border-2 rounded-md'>
                                        Masculino
                                </button>
                                <button 
                                    id='fem'
                                    onClick={(e) => toggleModelButton(e, 'fem')}
                                    className='w-full py-1 px-2 border-solid border-black-1000 border-2 rounded-md'>
                                        Feminino
                                </button>
                            </div>
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
                                disabled={adding}
                                className='text-white bg-black-1000 rounded-md px-5 py-3 w-full mt-8 block disabled:opacity-50 disabled:cursor-not-allowed' 
                                onClick={handleOnAddToCart}>
                                Adicionar ao Carrinho ({qty}) 
                            </button>
                        </div>
                    </div>
                </div>
                
                <h2 className='font-extrabold text-black-1000 text-2xl mt-24 flex flex-row items-center gap-2'>
                    <TbRulerMeasure></TbRulerMeasure>TABELA DE MEDIDAS</h2>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className=' relative w-[96vw] md:w-[30rem] h-[20rem] md:h-[20rem]'>
                        <Image 
                            src={modelTable === 'masc' ? mascSizeImg : femSizeImg}
                            alt='item'
                            fill
                            className='object-contain'
                            sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 100vw,
                                100vw"/>
                    </div>
                    <div className='p-4 mt-10 w-full'>
                        
                        <select name="sizes" id="sizes" className='' onChange={e => setModelTable(e.target.value)}>
                            <option value="masc">Masculino</option>
                            <option value="fem">Feminino</option>
                        </select>
                        <div className='flex flex-row mt-5 w-full content-between justify-between font-bold'>
                            <span className='w-24'>Medida</span>
                            <span>P</span>
                            <span>M</span>
                            <span>G</span>
                            <span>GG</span>
                        </div>
                        <table className='flex flex-row w-full content-around'>
                            <div className='flex flex-col w-full'>
                                <div className='flex flex-row content-around justify-between'>
                                    <span className='w-24 font-bold'>Larg. (cm) </span>
                                    <span>{modelTable === 'masc' ? '46-50' : '38-42'}</span>
                                    <span>{modelTable === 'masc' ? '48-52' : '41-45'}</span>
                                    <span>{modelTable === 'masc' ? '53-57' : '43-47'}</span>
                                    <span>{modelTable === 'masc' ? '56-60' : '45-49'}</span>
                                </div>
                                
                                <div className='flex flex-row  content-around justify-between'>
                                    <span className='w-24 font-bold'>Comp. (cm)</span>
                                    <span>{modelTable === 'masc' ? '65-69' : '57-61'}</span>
                                    <span>{modelTable === 'masc' ? '67-71' : '60-64'}</span>
                                    <span>{modelTable === 'masc' ? '69-73' : '62-66'}</span>
                                    <span>{modelTable === 'masc' ? '72-76' : '63-67'}</span>
                                </div>
                            </div>
                            
                        </table>
                    </div>
                    
                </div>
                <div className='my-4 mt-24'>
                    <h1 className='font-extrabold text-black-1000 text-2xl flex flex-row items-center gap-2 mb-4'>
                        <BsHeart></BsHeart> VOCÊ TAMBÉM VAI CURTIR</h1>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 my-2'>
                        {products.slice(0, 4).map((item: any) => {
                            return (
                            <Item
                                key={item.id}
                                id={item.id}
                                name={item.name} 
                                gender={item.gender}
                                price={item.price} 
                                srcImg={item.srcImg}/>)
                        })}
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

