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
        <Link href={'/details/' + props.id} className='flex flex-col gap-1 h-60 md:h-80 w-full'>
            <div className=' w-full h-40 md:h-60 relative rounded-md'>
                <Image 
                    src={props.srcImg}
                    alt='item'
                    fill
                    className='object-cover rounded-md'
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"/>
            </div>
            <div className='flex flex-col gap-1 justify-between'>
                <span className='text-md font-semibold'>{props.name}</span> 
                <span className='text-lg'>{formatCurrency(props.price)}</span>
            </div>
        </Link>
    )
}