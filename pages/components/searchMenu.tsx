import { BsArrowLeftRight, BsArrowDownShort } from 'react-icons/bs'

interface Props {
  itemsCount: number
}

const SearchMenu: React.FunctionComponent<Props> = ({ itemsCount }) => {
    return (
        <div className='flex justify-between px-8 items-center my-2 text-gray-500'>
        {itemsCount} resultados encontrados para sua busca
        <div className='flex justify-center content-center gap-8'>
        {/*
        <button className='grid grid-cols-2 justify-center items-center gap-3 text-gray-500'>Filtros <BsArrowLeftRight/></button> 
        
        <button className='rounded-full border-solid border-[1px] border-gray-300 p-3 px-6 mx-6 text-gray-500
                            flex gap-3 justify-center items-center'>
            Ordenar por <BsArrowDownShort/> </button>*/}
        </div>
    </div>
  )
}

export default SearchMenu;