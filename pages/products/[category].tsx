import { useEffect, useState } from 'react';
import Item from '../../components/item'
import SearchMenu from '../../components/searchMenu'
import SkeletonCategory from './skeleton_category';
let products = require('../../public/items-sample.json');

export default function Home({ products }: any) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  
  if (isLoading)
    return <div><SkeletonCategory /></div>
  if (!isLoading)
    return (
      <>
        { products ? 
        <div>
          <SearchMenu itemsCount={products.length} category={''} />
          <div className='flex items-center justify-center px-2 md:px-8 py-5 my-2'>
            {/*<SideMenu/>*/}
            <div className='md:container center grid lg:grid-cols-4 grid-cols-2 w-full gap-2'>
              {products.map((item: any) => {
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
        : <div><SkeletonCategory /></div>}
      </>
    )
}

export async function getStaticPaths() {
  const paths = [
    {params: { category: 'filmes' }},
    {params: { category: 'series' }},
    {params: { category: 'jogos' }},
    {params: { category: 'geek' }}
  ]
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: any) => {
  let productsArray = products
  productsArray = productsArray.filter((product: any) => product.categories.includes(params.category.toString()))

  return {
    props: {
      products: productsArray
    }
  }
}