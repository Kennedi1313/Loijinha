import { useEffect, useMemo, useState } from 'react';
import Item from '../components/item'
import { TbSearch } from 'react-icons/tb';
import Menu from '@/components/menu';
import Pagination from '@/components/pagination';
let PageSize = 12;
export default function Home({ products }: any) {
  const [productList, setProductList] = useState(products);
  let currentPageFromStorage;
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    currentPageFromStorage = sessionStorage.getItem("currentPage");
  }
  //const [currentPage, setCurrentPage] = useState(currentPageFromStorage ? Number(currentPageFromStorage) : 1);
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return productList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, productList]);
  useEffect(() => {
    setProductList(products);
  }, [products]);
    return (
      <>
        { productList ? 
        <div>
            <Menu></Menu>
            <div className='fixed top-28 md:top-12 md:left-1/2 z-40 md:z-50 flex px-2 md:right-32 items-center text-gray-500 w-full 
              bg-white md:bg-transparent h-16 md:h-12 md:w-[30%]'>
              <div className='flex flex-row rounded-full w-full md:w-full border-solid border-[1px] border-brown-1000'>
                          <TbSearch className='text-2xl font-bold m-2 text-brown-1000'></TbSearch>
                          <input type="email" name="email" id="search" autoComplete="off"
                            className='w-full rounded-full py-1 px-2 active:border-0 dark:text-black outline-none' 
                            onChange={(e) => {
                              setCurrentPage(1)
                              setProductList(
                              products.filter((product: any) =>  {
                                return product.name.toUpperCase().includes(e.target.value.toUpperCase())}
                              ))}}/>
                        
              </div>
            </div>
          <div className="md:mt-36 mt-32 blur-[6px] h-80 md:h-96 bg-cover bg-no-repeat bg-center"></div>
          <div className='bg-rose-1000 text-brown-1000 font-bold 
               absolute md:1/2 top-80 left-1/2 md:p-10 p-2
               md:max-w-screen-lg md:w-full w-[90%] text-center -translate-x-1/2 -translate-y-1/2 h-min md:h-64 
               align-center justify-center flex flex-col gap-3'>
              <h1 className='text-6xl font-dream-avenue font-semibold'>JOIAS EM PRATA 925</h1>
              <h2 className='text-2xl font-normal'>CONFIRA AS NOSSAS PEÇAS E DESPERTE O SEU BRILHO</h2>
            </div>
          <div className="bg-white z-10 -mt-2 mx-full flex items-center align-middle justify-center 
            px-1 md:px-0 py-5 my-2 relative">
            {/*<SideMenu/>*/}
            <div className=' z-30 md:max-w-screen-lg mx-auto center grid lg:grid-cols-4 grid-cols-2 w-full gap-1 gap-y-6'>
              {currentTableData.map((item: any) => {
                return (
                  <Item 
                    key={item.id}
                    id={item.id}
                    name={item.name} 
                    price={item.price} 
                    srcImg={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${item.id}/${item.profileImageId}.jpg`}/>)
              })}
            </div>
          </div>
          <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={productList.length}
                pageSize={PageSize}
                onPageChange={(page: number) => {
                  //sessionStorage.setItem("currentPage", String(page));
                  setCurrentPage(page)}}
              />
        </div>
        : <h1>NENHUM PRODUTO CADASTRADO NESSA CATEGORIA</h1>}
      </>
    )
}

 export const getStaticProps = async ({ params }: any) => {
   const res = await fetch("http://62.72.11.102:8088/api/v1/products");
   //const res = await fetch("http://localhost:8080/api/v1/products");
   let products = await res.json();
   products = products?.filter((product: any) => product.quantity > 0) ?? {}
   return {
     props: {
       products
     }
   }
}