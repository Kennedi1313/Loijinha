import { useEffect, useState } from 'react';
import { getSalesByCustomerEmail } from '@/lib/client';
import { formatCurrency } from '@/lib/utils';
import ProtectedRoute from '../protectedRoute';
import { useAuth } from '@/components/Context/authContext';
import Link from 'next/link';
import { useShoppingCart } from '@/hooks/use-shopping-cart';

const Success = () => {
    const { customer } = useAuth();
    const [sales, setSales] = useState([] as any);
    const { clearCart } = useShoppingCart();
    const fetchSales = () => {
        getSalesByCustomerEmail(customer.username).then((res) => {
            setSales( res.data.content);
        }).catch (err => {})}

    useEffect(() => {
        clearCart();
        fetchSales();
    }, []);

    if (sales.length > 0) {
        return (
            <div className="md:container xl:max-w-screen-xl mx-auto py-12 p-2 md:px-6 mt-36 min-h-[40vh]">
                <h2 className="text-4xl font-semibold">Parabéns!!</h2>
                <p className="mt-1 text-xl">Seu pedido foi recebido com sucesso.</p>
                <p className="mt-1 text-md">Em breve você receberá um email indicando que recebemos o pagamento. Após isso o seu pedido já estará sendo separado!</p>
                <p className="mt-1 text-md">Entraremos em contato através do whatsapp para agendar a entrega ou retirada, então garanta que o seu número esteja cadastrado corretamente. Caso precise modificar suas informações de contato <Link href="account" className='border-b-2'>clique aqui</Link>.</p> 
                <p className="mt-10 text-xl">Resumo do pedido</p>
                <div className="mx-auto flex flex-col gap-2 md:px-0 my-2">
                    <div className=' max-w-screen-sm md:max-w-full overflow-scroll md:overflow-hidden py-5 '>
                        <table className="table-auto min-w-max w-full border-collapse overflow-scroll">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">Produto</th>
                                    <th className="px-4 py-2">Nome</th>
                                    <th className="px-4 py-2">Quantidade</th>
                                    <th className="px-4 py-2">Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                            {sales[0].saleItems?.map((item: any, index: number) => (
                                <tr key={index} className="text-center">
                                    <td className="pt-2 min-w-36 h-36">
                                        <img
                                            className="w-36 h-36 object-cover"
                                            src={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${item.product.id}/${item.product.profileImageId}.jpg`}
                                            alt={item.product.name}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.product.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.quantity}
                                    </td>
                                    <td className="px-4 py-2">    
                                        <span className='flex flex-col'>
                                            {item.price != item.product.price
                                                ?   <span className='line-through text-red-600'>
                                                        { formatCurrency(item.product.price) }
                                                    </span>
                                                :   ""
                                            }
                                            { formatCurrency(item.price) }
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-1 text-xl text-gray-500">
                        Informações de contato{' '}
                    </p>
                    <div className='pb-5 max-w-sm md:max-w-full overflow-scroll md:overflow-hidden'>
                        <p><strong>Nome: </strong> {sales[0].customer.name}</p>
                        <p><strong>Email: </strong> {sales[0].customer.email}</p>
                        <p><strong>CPF: </strong> {sales[0].customer.cpf}</p>
                        <p><strong>Celular (whatsapp): </strong> {sales[0].customer.phone}</p>
                    </div>

                    <p className="mt-1 text-xl text-gray-500">
                        Endereço de entrega{' '}
                    </p>
                    {(!sales[0].shipment) ?
                        <>RETIRADA NA LOJA</>
                        :
                        <div className='pb-5 max-w-sm md:max-w-full overflow-scroll md:overflow-hidden'>
                            <p><strong>CEP: </strong> {sales[0].customer?.addresses[0].zip}</p>
                            <p><strong>Endereço: </strong> {sales[0].customer?.addresses[0].street}, {sales[0].customer?.addresses[0].number} - {sales[0].customer?.addresses[0].district}, {sales[0].customer?.addresses[0].city}</p>
                            <p><strong>Ponto de referência: </strong>{sales[0].customer?.addresses[0].reference}</p>
                        </div>
                    }
                    
                    <div className="flex flex-col py-4 gap-2 w-full border-t">
                        <div className="text-xl flex flex-col gap-2">
                            <p className="mt-1 text-xl text-gray-500">Preço Total:</p>
                            <span className="text-xl font-semibold text-gray-800">
                                {formatCurrency(sales[0]?.totalPrice)}
                            </span>
                        </div>
                    </div>

                    <Link href="/" className='w-full p-2 bg-gray-100 rounded-md text-center'>
                        <span className="text-black-1000 underline">Voltar para o site</span>
                    </Link>
                </div>
            </div>      
        )}
}

export default ProtectedRoute(Success);