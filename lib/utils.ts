import axios from 'axios';

export const formatCurrency = (amount = 0, currency = 'BRL') =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumIntegerDigits: 2,
  }).format(amount / 100);

export const isClient = typeof window === 'object';

export const fetcher = (url: any) => axios.get(url).then(res => res.data);