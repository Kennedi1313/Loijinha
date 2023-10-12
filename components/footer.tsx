import FormasPagamento from '../public/formas-pagamento.png'
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from 'react-icons/bs'
import Image from 'next/image'
import logo from '../public/logo.png'

export default function Footer() {
    return (
        <div className='bg-rose-1000 flex flex-col items-center px-3 mt-20'>
            <div className='flex flex-col md:flex-row gap-6 justify-evenly w-fill md:w-full'>
                <ul>
                <div className='w-72 h-64 relative mt-2'>
                    <Image 
                        src={logo}
                        alt='item'
                        priority
                        fill
                        className='object-cover'
                        sizes="(max-width: 768px) 50vw,
                        (max-width: 1200px) 50vw,
                        33vw"/>
                </div>
                </ul>
            </div>
            <div className='border-solid border-brown-1000 w-3/5 border-b-[1px] mb-10'></div>
        </div>
    )
}