import FormasPagamento from '../public/formas-pagamento.png'
import { BsInstagram, BsWhatsapp, BsTelephone } from 'react-icons/bs'
import Image from 'next/image'
import logo from '../public/logo.png'
import cartoes from '../public/cartoes.png'
import { MdMailOutline } from "react-icons/md";

export default function Footer() {
    return (
        <div className='flex flex-col items-center mt-20'>
            <div className='bg-rose-1000 flex justify-center w-full'>
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
            <div className='md:p-10 flex flex-col md:flex-row gap-3 w-full justify-around p-3'>
                <div className='flex flex-col w-full justify-center items-center'>
                    <span className='font-semibold'>Pague com </span>
                    <div className='w-full h-12 relative mt-2'>
                        <Image 
                            src={cartoes}
                            alt='cartoes'
                            priority
                            fill
                            className='object-contain'
                            sizes="(max-width: 768px) 50vw,
                            (max-width: 1200px) 50vw,
                            33vw"/>
                    </div>
                </div>
                <div className='flex flex-col w-full justify-center items-center md:items-center'>
                <span className='font-semibold'>Contato</span>
                    <div>
                        
                        <div className='flex flex-row gap-2 items-center'>
                            <BsInstagram></BsInstagram>
                            @amanditapratasoficial
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <BsTelephone></BsTelephone>
                            (84) 99859-4171
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <BsWhatsapp></BsWhatsapp>
                            (84) 99859-4171
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <MdMailOutline></MdMailOutline>
                            amandita.pratas@outlook.com
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row w-full items-center justify-center md:gap-2 p-3 md:p-4 text-sm'>
                
                <div className='flex'>
                    Copyright © 2024. Todos os direitos reservados. 
                </div>
                <div className='flex flex-col'>
                    <div>
                        AMANDITA PRATAS - CNPJ: 53.484.412/0001-00
                    </div>
                </div>
            </div>
        </div>
    )
}