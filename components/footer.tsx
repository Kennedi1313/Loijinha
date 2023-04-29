import FormasPagamento from '../public/formas-pagamento.png'
import { BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from 'react-icons/bs'
import Image from 'next/image'

export default function Footer() {
    return (
        <div className='text-white bg-black-1000 flex flex-col items-center px-6 py-16 mt-20'>
            <div className='flex flex-col md:flex-row gap-6 justify-evenly w-fill md:w-full'>
                <ul>
                    <p className='text-6xl font-extrabold font-unlock'>13<span className='text-3xl font-thin'>GeekStore</span></p>

                    <div className='flex flex-row justify-between mt-8'>
                        <BsInstagram></BsInstagram>
                        <BsFacebook></BsFacebook>
                        <BsYoutube></BsYoutube>
                        <BsLinkedin></BsLinkedin>
                    </div>
                </ul>
                <ul>
                    Formas de pagamento

                    <Image src={FormasPagamento} alt="" width={200} height={150}></Image>
                </ul>
            </div>
            <div className='border-solid border-white w-3/5 border-b-[1px] my-10'></div>
            <div className='flex flex-row text-sm w-3/5'>
                <p>@13geekstore 2023.  Todos os direitos reservados.  Brasil.</p>
            </div>
        </div>
    )
}