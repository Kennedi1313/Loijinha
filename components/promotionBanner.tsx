import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { FaGlasses, FaMoneyBill, FaTruckPickup, FaTshirt } from 'react-icons/fa'
import { BsCash, BsCashStack, BsSunglasses, BsTruck } from 'react-icons/bs'
export default function PromotionBanner() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
    return (
        <div className='w-full text-center p-4 text-lg bg-brown-1000 text-white embla' ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide">
                    <BsTruck className='inline mx-2'></BsTruck>
                    Envios para <strong>todo</strong> o Brasil!
                </div>
                <div className="embla__slide"><FaGlasses className='inline mx-2'></FaGlasses>Estampas <strong>exclusivas</strong></div>
                <div className="embla__slide"><BsCashStack className='inline mx-2'></BsCashStack><strong>Promoções</strong> de lançamento</div>
                <div className="embla__slide"><FaTshirt className='inline mx-2'></FaTshirt>Impressão de alta <strong>qualidade</strong></div>
            </div>
        </div>
    )
}