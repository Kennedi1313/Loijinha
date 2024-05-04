import { useEffect, useMemo, useState } from 'react';
import Item from '../../components/item'
import { TbSearch } from 'react-icons/tb';
import Menu from '@/components/menu';
import Pagination from '@/components/pagination';
import { usePagination } from '@/components/Context/paginationContext';
import { useRouter } from 'next/router';
export default function Search() {
  const [productList, setProductList] = useState([]);
  const { currentPage, setCurrentPage } = usePagination();
  const router = useRouter()
  let query = router.query.name;
  const pageSize = 8; 

  useEffect(() => {
    fetchProducts();
  }, [currentPage, query]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://62.72.11.102:8088/api/v1/products/by-name?query=${query}&page=${currentPage}&size=${pageSize}`);
      let products = await res.json();
      setProductList(products.content);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
      <>
        { productList && productList.length > 0 ? 
        <div>
          <div className="mt-40 md:max-w-screen-lg mx-auto flex flex-col items-center justify-center 
            px-1 md:px-0 py-5 my-2">
              <h1>Resultados encontrados para a sua busca: {query}</h1>
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
          <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={productList.length}
                pageSize={pageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
        </div>
        : 
            <div className="mt-40 md:max-w-screen-lg mx-auto flex flex-col items-center justify-center 
              px-1 md:px-0 py-5 my-2">
              <h1>Que pena 🙁 Não encontramos nenhum produto para a sua busca: {query} <br></br>Que tal conferir nossas categorias ou buscar um outro termo?</h1>
            </div>
        }
      </>
    )
}