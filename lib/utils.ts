import axios from 'axios';
import X2JS from "x2js";

export const formatCurrency = (amount = 0, currency = 'BRL') =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumIntegerDigits: 2,
  }).format(amount / 100);

export const isClient = typeof window === 'object';

export const fetcher = (url: any) => axios.get(url).then(res => res.data);

export const calcFrete = async (destino: string) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'api-key': 'ee948c424e1165aa154a8431eb4456da', 
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const fretes = await axios.post('https://camisadimona.com.br/api/v2/shipping',{
      zipcode: destino,
      quantity: "1"
    }, 
    {headers});

  return {
    data: JSON.stringify(fretes.data)
  };
}