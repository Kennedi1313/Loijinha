import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useShoppingCart } from '@/hooks/use-shopping-favorites';
import { fetcher } from '@/lib/utils';
import { BsCheck } from 'react-icons/bs';
import Link from 'next/link';

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();

  const { clearCart } = useShoppingCart();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      clearCart();
    }
  }, [data]);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      {error ? (
        <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
          <p className="text-lg">Sorry, something went wrong!</p>
        </div>
      ) : !data ? (
        <div className="p-2 rounded-md bg-gray-100 text-gray-500 max-w-md mx-auto">
          <p className="text-lg animate-pulse">Loading...</p>
        </div>
      ) : (
        <div className="py-4 px-8 rounded-md bg-gray-100 max-w-lg mx-auto">
            <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
                <BsCheck className="w-12 h-12 flex-shrink-0 text-green-600" />
                <span>Obrigado pela compra!</span>
            </h2>
            <p className="text-lg mt-3 font-semibold">Aguarde mais informações através do seu email.</p>
            <p className="text-lg mt-3">Esqueceu alguma coisa? Volte as compras{' '}
                <Link href="/">
                    <span className="text-black-1000 underline">aqui!</span>
                </Link>
            </p>
        </div>
      )}
    </div>
  );
};

export default Success;