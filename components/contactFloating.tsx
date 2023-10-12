import { BsArrowUpCircle, BsWhatsapp } from 'react-icons/bs'

export default function ContactFloating() {
    return (
        <a href="https://api.whatsapp.com/send?phone=27995074930&text=Olá,%20tudo%20bem?" 
            target='blank' 
            className='fixed right-3 bottom-14 w-14 h-14 rounded-full 
                bg-rose-1000 flex items-center justify-center 
                text-brown-1000 cursor-pointer shadow-md shadow-slate-500'>
            <BsWhatsapp className='w-7 h-7'></BsWhatsapp>
        </a>
    )
}