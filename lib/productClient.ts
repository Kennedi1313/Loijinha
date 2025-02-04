import { ProductsResponse } from '@/types/ProductTypes';
import axios from 'axios';

const API_URL = 'https://api.amanditapratas.com.br/api/v1/products';
const PAGE_SIZE = 8;
const PROMO_PAGE_SIZE = 500;

export const getProducts = async () => {
    try {
        const res = await axios.get(`${API_URL}`);
        return res.data;
    } catch (e) { throw e }
}

export const getProductsById = async (id: number) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    } catch (e) { throw e }
}

export const getProductsPaginated = async (page: number) => {
    try {
        const res = await axios.get(`${API_URL}?page=${page}&size=${PAGE_SIZE}`);
        return res.data;
    } catch (e) { throw e }
}

export const getProductsByName = async (query: string, page: number) => {
    try {
      const res = await axios.get(`${API_URL}/by-name?query=${query}&page=${page}&size=${PAGE_SIZE}`);
      return res.data;
    } catch (e) { throw e }
}

export const getProductsByCategory = async (category: string, page: number) => {
    try {
        const endpoint = category === 'promo' 
        ? `${API_URL}?page=0&size=${PROMO_PAGE_SIZE}`
        : `${API_URL}/by-category?category=${category}&page=${page}&size=${PAGE_SIZE}`;
        const res = await axios.get(endpoint);
        const data: ProductsResponse = res.data;

        if (category === 'promo') {
            data.content = data.content.filter((product) => product.promo > 0);
            data.totalElements = data.content.length;
        }

        return data;
    } catch (e) { throw e }
}