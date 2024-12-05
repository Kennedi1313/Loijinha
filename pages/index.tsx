import { useEffect, useMemo, useState } from 'react';
import Item from '../components/item'
import { TbSearch } from 'react-icons/tb';
import Menu from '@/components/menu';
import Pagination from '@/components/pagination';
import { usePagination } from '@/components/Context/paginationContext';
import Link from 'next/link';
import Head from 'next/head'
import { BsInstagram } from 'react-icons/bs';
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
      //const res = await fetch(`http://localhost:8080/api/v1/products?page=${0}&size=${8}`);
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
          <Head>
            <title>Amandita | Joias em Prata 925 | Natal/RN</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="md:mt-32 mt-32 blur-[6px] h-80 md:h-96 bg-cover bg-no-repeat bg-center"></div>
          <div className="bg-[url('/2.png')] md:bg-[url('/3.png')]
             text-brown-1000 font-bold 
               absolute top-44 md:top-40 w-full text-center h-[48rem] md:h-[36rem]
               align-center justify-center flex flex-col gap-3 bg-cover md:bg-contain bg-center bg-no-repeat bg-black-1000">
          </div>
          <div className="bg-white z-10 mx-full flex flex-col items-center align-middle justify-center px-1 md:px-0 py-5 my-2 relative mt-72 md:mt-36 ">
            <h1 className='pb-5 text-4xl mt-12 w-full md:text-center'>Novidades</h1>
            <div className=' z-30 md:max-w-screen-lg mx-auto center grid lg:grid-cols-4 grid-cols-2 w-full gap-1 gap-y-6'>
              {productList.map((item: any) => {
                return (
                  <Item 
                    key={item.id}
                    id={item.id}
                    name={item.name} 
                    price={item.price} 
                    quantity={item.quantity}
                    description={item.description}
                    promo={item.promo}
                    profileImageId={item.profileImageId}/>)
              })}
            </div>
            <h1 className='pb-5 text-4xl mt-12 w-full md:text-center'>Loja física</h1> 
            <div className='w-full h-[20rem] mb-12'>
                <iframe src="https://storage.googleapis.com/maps-solutions-k9mybl2fxd/locator-plus/88wu/locator-plus.html"
                    width="100%" height="100%"
                    style={{border:0}}
                    loading="lazy">
                </iframe>
            </div>
          </div>

        </div>
        : <h1>NENHUM PRODUTO CADASTRADO</h1>}

      </>
    )
}

 export const getStaticProps = async ({ params }: any) => {
   //const res = await fetch(`http://localhost:8080/api/v1/products?page=${0}&size=${8}`);
   const res = await fetch(`https://api.amanditapratas.com.br/api/v1/products?page=${0}&size=${8}`);
   let products = await res.json();
   return {
     props: {
      products: products.content,
      itemsCount: products.totalElements
    }
  }
}