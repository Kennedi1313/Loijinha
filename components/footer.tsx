import FormasPagamento from '../public/formas-pagamento.png'
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from 'react-icons/bs'
import Image from 'next/image'
import logo from '../public/logo.png'

export default function Footer() {
    return (
        <div className='bg-rose-1000 flex flex-col items-center px-3 mt-20'>
            <div className='flex flex-col md:flex-row gap-6 justify-evenly w-fill md:w-full'>
                <div className='w-72 h-52 relative mt-2'>
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
            </div>
            <div className='border-solid border-brown-1000 w-3/5 border-b-[1px] mb-10 text-center'> 
                <span className='font-semibold'>✨ VISITE NOSSA LOJA FÍSICA ✨</span> 
            </div>
            <div className='w-full h-[20rem] mb-12'>
                
                <iframe src="https://storage.googleapis.com/maps-solutions-k9mybl2fxd/locator-plus/88wu/locator-plus.html"
                    width="100%" height="100%"
                    style={{border:0}}
                    loading="lazy">
                </iframe>
            </div>
            <div className='border-solid border-brown-1000 w-3/5 border-b-[1px] mb-10'></div>
        </div>
    )
}