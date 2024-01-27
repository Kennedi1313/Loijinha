import { BsArrowUpCircle, BsInstagram, BsWhatsapp } from 'react-icons/bs'

export default function ContactFloating() {
    return (
        <div>
            <a href="https://api.whatsapp.com/send?phone=8498594171&text=Olá,%20tudo%20bem?%20Gostaria%20de%20algumas%20informações." 
                target='blank' 
                className='z-50 fixed right-3 bottom-14 w-14 h-14 rounded-full 
                    bg-rose-1000 flex items-center justify-center 
                    text-brown-1000 cursor-pointer shadow-md shadow-slate-500'>
                <BsWhatsapp className='w-7 h-7'></BsWhatsapp>
            </a>
            <a className="z-50 fixed right-3 bottom-32 w-14 h-14 rounded-full 
                    bg-rose-1000 flex items-center justify-center 
                    text-brown-1000 cursor-pointer shadow-md shadow-slate-500" 
                href="https://www.instagram.com/amanditapratasoficial" target='blank'>
                <BsInstagram className='w-7 h-7'></BsInstagram>
            </a>
        </div>
    )
}