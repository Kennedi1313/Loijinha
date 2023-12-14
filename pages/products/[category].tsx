import { useEffect, useState } from 'react';
import Item from '../../components/item'
import { TbSearch } from 'react-icons/tb';
import Menu from '@/components/menu';

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
          <div className="mt-40 md:max-w-screen-lg mx-auto flex items-center justify-center 
            px-1 md:px-0 py-5 my-2">
            {/*<SideMenu/>*/}
            <div className='center grid lg:grid-cols-4 grid-cols-2 w-full gap-1 gap-y-6'>
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
        </div>
        : <h1>NENHUM PRODUTO CADASTRADO NESSA CATEGORIA</h1>}
      </>
    )
}

export async function getStaticPaths() {
  const paths = [
    {params: { category: 'aneis' }},
    {params: { category: 'brincos' }},
    {params: { category: 'colares' }},
    {params: { category: 'correntes' }},
    {params: { category: 'pulseiras' }},
    {params: { category: 'conjuntos' }},
  ]
  return { paths, fallback: false }
}

 export const getStaticProps = async ({ params }: any) => {
   const res = await fetch("http://62.72.11.102:8088/api/v1/products");
   let products = await res.json();
   products = products?.filter((product: any) => product.quantity > 0 && product.category === params.category) ?? {}
   return {
     props: {
       products
     }
   }
}