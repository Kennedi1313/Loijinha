import { useEffect, useState } from 'react';
import Item from '../../components/item'
import Head from 'next/head';
import Image from 'next/image';
import logo from '../../public/logo2.png'
import Link from 'next/link';
import { TbHeartFilled, TbPhoneCall, TbSearch } from 'react-icons/tb';
import Menu from '@/components/menu';
let productsArray = require('../../public/items-sample.json');

export default function Home({ products }: any) {
  const [productList, setProductList] = useState(products);
  useEffect(() => {
    setProductList(products);
  }, [products]);
    return (
      <>
        { productList ? 
        <div>
            <Menu></Menu>
            <div className='fixed top-24 md:top-[1.85rem] z-40 md:z-50 flex justify-end px-2 md:pr-32 items-center text-gray-500 w-full 
              bg-white md:bg-transparent h-16 md:h-12 md:w-[30%] md:right-0'>
              <div className='flex flex-row rounded-full w-full md:w-full border-solid border-[2px] border-brown-1000'>
                          <TbSearch className='text-2xl font-bold m-2 text-brown-1000'></TbSearch>
                          <input type="text" name="search" id="search" 
                            className='w-full rounded-full py-1 px-2 active:border-0 dark:text-black outline-none' 
                            onChange={(e) => setProductList(
                              products.filter((product: any) =>  {
                                return product.name.toUpperCase().includes(e.target.value.toUpperCase())}
                              ))}/>
                        
              </div>
            </div>
          <div className="mt-36 md:container md:max-w-screen-lg mx-auto flex items-center justify-center 
            px-2 md:px-8 py-5 my-2">
            {/*<SideMenu/>*/}
            <div className='md:container center grid lg:grid-cols-4 grid-cols-2 w-full gap-2 gap-y-6'>
              {productList.map((item: any) => {
                return (
                  <Item 
                    key={item.id}
                    id={item.id}
                    name={item.name} 
                    gender={item.gender}
                    price={item.price} 
                    srcImg={item.srcImg}/>)
              })}
            </div>
          </div>
        </div>
        : <h1>NENHUM PRODUTO CADASTRADO NESSA CATEGORIA</h1>}
      </>
    )
}

export async function getStaticPaths() {
  const paths = [
    {params: { category: 'index' }},
    {params: { category: 'aneis' }},
    {params: { category: 'brincos' }},
    {params: { category: 'colares' }},
    {params: { category: 'conjuntos' }},
    {params: { category: 'pulseiras' }},
    {params: { category: 'bolsas' }},
    {params: { category: 'sandalias' }},
  ]
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
  try {
      //const props = products?.find((product: any) => product.id === params.category) ?? {};
      
      productsArray.sort((a: any, b: any) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });

      if (params.category == 'index')
        return {
          props: {
            products: productsArray
          }
        }

      let productsArrayFiltered = productsArray.filter((product: any) =>  {
        return product.categories.includes(params.category)
      })

      return {
          props: {
            products: productsArrayFiltered
          },
      };
  } catch (error) {
      console.log(error)
      return { notFound: true };
  }
}

// export const getStaticProps = async ({ params }: any) => {

//   const headers = { Authorization: `Bearer ${process.env.PRINTIFUL_KEY}` };
//   const res = await fetch("https://api.printful.com/store/products", {
//     headers,
//   });
//   const products = await res.json();
//   const catalog = await Promise.all(products.result.map( async (product: any) => {
//     const resDetailed = await fetch(`https://api.printful.com/store/products/${product.id}`, {headers,});

//       const productsDetailed = await resDetailed.json();

//       return {
//         id: product.id,
//         name: product.name, 
//         gender: null,
//         price: Number(productsDetailed.result.sync_variants[0].retail_price) * 100,
//         srcImg: product.thumbnail_url
//       }
//   }));

//   console.log(catalog)
  
//   return {
//     props: {
//       products: catalog
//     }
//   }
//}