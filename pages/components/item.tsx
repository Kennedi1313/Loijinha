import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ItemProps {
    id: string,
    name: string,
    gender: string,
    price: number,
    srcImg: string
}

export default function Item(props: ItemProps) {
    return (
        <Link href={'/details/' + props.id}>
            <div className=' w-full h-80 relative'>
                <Image 
                    src={props.srcImg}
                    alt='item'
                    fill
                    className='object-cover'
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"/>
            </div>
            <div className='grid grid-rows-3'>
                <span className='text-lg'>{props.name}</span> 
                <span className='text-gray-600'>{props.gender}</span>
                <span className='text-lg'>{formatCurrency(props.price)}</span>
            </div>
        </Link>
    )
}