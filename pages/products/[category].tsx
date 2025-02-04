import { useEffect, useState } from 'react';
import Item from '../../components/item';
import Pagination from '@/components/pagination';
import { usePagination } from '@/components/Context/paginationContext';
import Head from 'next/head';
import { HomeProps, Product } from '@/types/ProductTypes';
import { getProductsByCategory } from '@/lib/productClient';
const PAGE_SIZE = 8;
const PROMO_PAGE_SIZE = 500;

export default function Home({ products, category, itemsCount }: HomeProps) {
  const [productList, setProductList] = useState<Product[]>(products);
  const [productListSize, setProductListSize] = useState<number>(itemsCount);
  const { currentPage, setCurrentPage } = usePagination();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, category]);

  const fetchProducts = async () => {
    try {
      const data = await getProductsByCategory(category, currentPage);
      setProductList(data.content);
      setProductListSize(data.totalElements);
    } catch (error) { }
  }

  const renderProductList = () => (
    <div>
      <div className="mt-40 md:max-w-screen-lg mx-auto flex items-center justify-center px-1 md:px-0 py-5 my-2">
        <div className="center grid lg:grid-cols-4 grid-cols-2 w-full gap-1 gap-y-6">
          {productList.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} price={item.price} description={item.description} quantity={item.quantity} promo={item.promo} profileImageId={item.profileImageId} />
          ))}
        </div>
      </div>
      <Pagination className="pagination-bar" currentPage={currentPage} totalCount={productListSize} pageSize={category !== 'promo' ? PAGE_SIZE : PROMO_PAGE_SIZE} onPageChange={(page: any) => setCurrentPage(page)} />
    </div>
  );

  const renderEmptyState = () => (
    <div className="mt-40 md:max-w-screen-lg mx-auto flex flex-col items-center justify-center px-1 md:px-0 py-5 my-2">
      <h1>NENHUM PRODUTO CADASTRADO NESSA CATEGORIA</h1>
    </div>
  );

  return (
    <>
      <Head>
        <title>Amandita | {category[0].toUpperCase() + category.substring(1)}</title>
      </Head>
      {productList && productListSize > 0 ? renderProductList() : renderEmptyState()}
    </>
  );
}

export async function getStaticPaths() {
  const categories = ['promocional', 'aneis', 'brincos', 'colares', 'correntes', 'pulseiras', 'tornozeleiras', 'pingentes', 'conjuntos', 'berloque', 'promo',];
  const paths = categories.map((category) => ({ params: { category } }));
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: { params: { category: string } }) => {
  const { category } = params;
  try {
    const data = await getProductsByCategory(category, 0);
    return { props: { products: data.content, category, itemsCount: data.totalElements } }
  } catch (err) {
    return { props: { products: [], category, itemsCount: 0 } } }
}
