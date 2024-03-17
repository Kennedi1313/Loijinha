import { useEffect, useMemo, useState } from 'react';
import Item from '../../components/item'
import { TbSearch } from 'react-icons/tb';
import Menu from '@/components/menu';
import Pagination from '@/components/pagination';
let PageSize = 12;
export default function Home({ products }: any) {
  const [productList, setProductList] = useState(products);
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
            <div className='fixed top-28 md:top-12 md:left-1/2 z-40 md:z-50 flex justify-end px-2 md:right-32 items-center text-gray-500 w-full 
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
          <div className="mt-40 md:max-w-screen-lg mx-auto flex items-center justify-center 
            px-1 md:px-0 py-5 my-2">
            {/*<SideMenu/>*/}
            <div className='center grid lg:grid-cols-4 grid-cols-2 w-full gap-1 gap-y-6'>
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
                onPageChange={(page: number) => setCurrentPage(page)}
              />
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
    {params: { category: 'tornozeleiras' }},
    {params: { category: 'pingentes' }},
    {params: { category: 'conjuntos' }},
  ]
  return { paths, fallback: false }
}

 export const getStaticProps = async ({ params }: any) => {
   //const res = await fetch("http://62.72.11.102:8088/api/v1/products");
   const res = await fetch("http://localhost:8080/api/v1/products");
   let products = await res.json();
   products = products?.filter((product: any) => product.quantity > 0 && product.category === params.category) ?? {}
   return {
     props: {
       products
     }
   }
}