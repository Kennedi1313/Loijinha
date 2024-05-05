import { useEffect, useMemo, useState } from 'react';
import Item from '../components/item'
import { TbSearch } from 'react-icons/tb';
import Menu from '@/components/menu';
import Pagination from '@/components/pagination';
import { usePagination } from '@/components/Context/paginationContext';
import Link from 'next/link';
export default function Home({ products, itemsCount }: any) {
  const { currentPage, setCurrentPage } = usePagination();
  const [productList, setProductList] = useState(products);
  const [productListSize, setProductListSize] = useState(itemsCount);
  const pageSize = 8; 

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://api.amanditapratas.com.br/api/v1/products?page=${currentPage}&size=${pageSize}`);
      let products = await res.json();
      setProductList(products.content);
      setProductListSize(products.totalElements);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

    return (
      <>
        { productList && productListSize > 0 ? 
        <div>
          <div className="md:mt-32 mt-32 blur-[6px] h-80 md:h-96 bg-cover bg-no-repeat bg-center"></div>
          <div className="bg-[url('/colecao_dia_das_maes_retrato.png')] md:bg-[url('/colecao_dia_das_maes.png')]
             text-brown-1000 font-bold 
               absolute top-44 md:top-40 w-full text-center h-[40rem] md:h-[36rem]
               align-center justify-center flex flex-col gap-3 bg-contain bg-center bg-no-repeat bg-[#F2EEEB]">
          </div>
          <div className="bg-white z-10 mx-full flex items-center align-middle justify-center px-1 md:px-0 py-5 my-2 relative mt-80 md:mt-52 ">
            <div className=' z-30 md:max-w-screen-lg mx-auto center grid lg:grid-cols-4 grid-cols-2 w-full gap-1 gap-y-6'>
              {productList.map((item: any) => {
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
                totalCount={itemsCount}
                pageSize={productListSize}
                onPageChange={(page: number) => {
                  setCurrentPage(page)}}
              />
        </div>
        : <h1>NENHUM PRODUTO CADASTRADO</h1>}
      </>
    )
}

 export const getStaticProps = async ({ params }: any) => {
   //const res = await fetch("http://62.72.11.102:8088/api/v1/products");
   const res = await fetch(`https://api.amanditapratas.com.br/api/v1/products?page=${0}&size=${8}`);
   let products = await res.json();
   return {
     props: {
      products: products.content,
      itemsCount: products.totalElements
    }
  }
}