export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  promo: number;
  profileImageId: string;
};

export type ProductsResponse = {
  content: Product[];
  totalElements: number;
};

export type HomeProps = {
  products: Product[];
  category: string;
  itemsCount: number;
};