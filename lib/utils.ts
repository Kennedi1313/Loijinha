import axios from 'axios';
import X2JS from "x2js";

export const formatCurrency = (amount = 0,  promo = 0, parcelas = 1,  currency = 'BRL') => {
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumIntegerDigits: 2,
  }).format(((promo > 0 ? amount * (1-(promo/100)) : amount) / 100) / parcelas)};

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

export const phoneMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

export const cepMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{5})(\d)/,"$1-$2")
  return value
}

export const cpfMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}