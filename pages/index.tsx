import Image from 'next/image'
import Link from 'next/link'
import Item from '../components/item'
import data from '../public/items-sample.json'
import capa1 from '../public/capa_1.png'
import capa2 from '../public/capa_2.png'
import capa3 from '../public/capa_3.png'
import capa4 from '../public/capa_4.png'

export default function Home() {
    return (
        <>
            <div className='w-full h-screen grid grid-cols-1 md:grid-cols-2 p-2'>
                <div className='w-full h-full relative'>
                    <Image 
                        src={capa2}
                        alt='item'
                        priority
                        fill
                        className='object-cover'
                        sizes="(max-width: 768px) 50vw,
                        (max-width: 1200px) 50vw,
                        33vw"/>
                </div>
                <div className='w-full h-full relative'>
                    <Image 
                        src={capa3}
                        alt='item'
                        fill
                        className='object-cover'
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"/>
                </div>
            </div>
            <div className='w-full p-4 flex flex-col items-center'>
                <h1 className='text-2xl mb-4 p-0 md:text-5xl font-extrabold md:w-80 text-center'>POWER OF MINIMALISM</h1>
                <span className='font-bold'>#MINIMALIST #HPLOVERS #NOVIDADES</span>
            </div>
            <div className='flex flex-row w-full justify-center items-center my-2 gap-3'>
                <Link className='text-white bg-black-1000 rounded-full px-5 py-3' href={''}>Ver Coleção</Link>
                <Link className='text-white bg-black-1000 rounded-full px-5 py-3' href={''}>Saiba Mais</Link>
            </div>
            
            <div className='my-8 p-2 md:p-4 md:mx-16'>
                <h1 className='font-extrabold text-black-1000 text-2xl'>MAIS COMPRADAS</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 my-2'>
                    {data.slice(0, 4).map(item => {
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
        </>
    )
    
}