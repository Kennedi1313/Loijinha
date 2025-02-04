import { useEffect, useState } from 'react';
import { getCustomerByEmail, sell } from '@/lib/client';
import { toast } from 'react-hot-toast';
import { BsArrowRight } from 'react-icons/bs';
import { formatCurrency } from '@/lib/utils';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import ProtectedRoute from '../protectedRoute';
import { useAuth } from '@/components/Context/authContext';
import Link from 'next/link';
import { Customer } from '@/types/CustomerTypes';

const Checkout = () => {
    const { cartDetails } = useShoppingCart();
    const [ hasMounted, setHasMounted ] = useState(false);
    const { customer } = useAuth();
    const [ frete, setFrete ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const [ hasPromo, setHasPromo ] = useState(false);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ fullCustomer, setFullCustomer ] = useState<Customer>({ id: 0, name: '', email: '', password: '', phone: '', cpf: '', addresses: [{ zip: '', street: '', number: 0, district: '', city: '', reference: '' } ]});
    const fetchCustomers = () => {
        setLoading(true);
        getCustomerByEmail(customer.username)
            .then((res) => { setFullCustomer(res.data) })
            .catch(err => { toast(err.code, err.response.data.message) })
            .finally(() => { setLoading(false) })
    }

    const fetchProducts = () => {
        let total = 0;
        let promo = false
        Object.entries(cartDetails).map(([key, product]: [any, any]) => {
            total += (product.price * (1-(product.promo/100))) * product.quantity;
            promo = promo || product.promo > 0;
            setTotalPrice(total);
            setHasPromo(promo);
        });
    }

    useEffect(() => {
        setHasMounted(true);
        fetchProducts();
        fetchCustomers();
    }, []);

    if (!hasMounted) {
        return null;
    }

    const handleFinalizeSale = async () => {
        setLoading(true);
        try {
            const saleItemRequests = Object.entries(cartDetails).map(([_, product]) => ({
                productId: product.id,
                quantity: product.quantity,
            }));

            const saleRequest = {
                saleItemRequests: saleItemRequests,
                customerEmail: customer.username,
                paymentMethod: "Web",
                shippingFee: frete
            };
            const response = await sell(saleRequest);

            if (response.data) {
                window.location.href = response.data; // Redireciona para o Mercado Pago
            }
        } 
        catch (error: any) { toast.error("Erro ao finalizar venda: " + error.response.data) } 
        finally { setLoading(false) }
    }

    return (
        <div className="md:container xl:max-w-screen-xl mx-auto py-12 p-2 md:px-6 mt-36 min-h-[40vh]">
            <h2 className="text-4xl font-semibold">Revise seu pedido</h2>
            <p className="mt-1 text-xl">Resumo do pedido</p>
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
                        {Object.entries(cartDetails).map(([key, product]: [any, any]) => (
                            <tr key={key} className="text-center">
                                <td className="pt-2 min-w-36 h-36">
                                    <img
                                        className="w-36 h-36 object-cover"
                                        src={`https://amandita-products-uploads.s3.sa-east-1.amazonaws.com/profile-images/${product.id}/${product.profileImageId}.jpg`}
                                        alt={product.name}
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    {product.name}
                                </td>
                                <td className="px-4 py-2">
                                    {product.quantity}
                                </td>
                                <td className="px-4 py-2">
                                    {
                                        product.promo > 0
                                        ?
                                        <span className='flex flex-col'>
                                            <span className='line-through text-sm text-red-600 font-normal'>{ formatCurrency(product.price) }</span>
                                            <span>{ formatCurrency(product.price, product.promo) }</span>
                                        </span>
                                        :
                                        <span>
                                            <span>{ formatCurrency(product.price, product.promo) }</span>
                                        </span>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-1 text-xl text-gray-500">
                    Informações de contato{' '}
                    <Link href={'account'} className="opacity-50 hover:opacity-100 text-base" > (alterar) </Link>
                </p>
                <div className='pb-5 max-w-sm md:max-w-full overflow-scroll md:overflow-hidden'>
                    <p><strong>Nome: </strong> {fullCustomer.name}</p>
                    <p><strong>Email: </strong> {fullCustomer.email}</p>
                    <p><strong>CPF: </strong> {fullCustomer.cpf}</p>
                    <p><strong>Celular (whatsapp): </strong> {fullCustomer.phone}</p>
                </div>
                <p className="mt-1 text-xl text-gray-500">
                    Endereço de entrega{' '}
                    <Link href={'account'} className="opacity-50 hover:opacity-100 text-base" > (alterar) </Link>
                </p>
                <div className='pb-5 max-w-sm md:max-w-full overflow-scroll md:overflow-hidden'>
                    <p><strong>CEP: </strong> {fullCustomer?.addresses[0].zip}</p>
                    <p><strong>Endereço: </strong> {fullCustomer?.addresses[0].street}, {fullCustomer?.addresses[0].number} - {fullCustomer?.addresses[0].district}, {fullCustomer?.addresses[0].city}</p>
                    <p><strong>Ponto de referência: </strong>{fullCustomer?.addresses[0].reference}</p>
                </div>
                <div className="flex flex-col justify-between py-4 gap-2 w-full">
                    <div className="flex flex-col border-t py-4 gap-2 w-full items-start">
                        <div className="text-xl flex flex-col gap-2 items-start">
                            <p className="mt-1 text-xl text-gray-500">Preço Total:</p>
                            <span className="text-xl font-semibold text-gray-800">
                                {!hasPromo && totalPrice > 5000 ? (
                                    <>
                                        <span>{formatCurrency(totalPrice * 0.95)}</span>
                                        <span className="text-sm font-thin"> no pix</span>
                                    </> ) 
                                : ( formatCurrency(totalPrice) )}
                            </span>
                            {totalPrice >= 10000 ? (
                                <span className="text-sm font-thin text-gray-700">
                                    ou 3x de {formatCurrency(totalPrice, 0, 3)} sem juros
                                </span> ) 
                            : totalPrice >= 5000 ? (
                                <span className="text-xs font-thin text-gray-700">
                                    ou 1x de {formatCurrency(totalPrice)} sem juros
                                </span> ) 
                            : ("")}
                        </div>
                    </div>

                <div className='flex flex-col justify-between items-start border-t py-4 gap-2 w-full'>
                    <div className="flex flex-col gap-2 justify-center items-start">
                        <h1 className='mt-1 text-xl text-gray-500'>Forma de envio:</h1>
                        <div className="">
                            <label className="flex gap-2 flex-row">
                                <input
                                    type="radio"
                                    name="retirada"
                                    value={0}
                                    onChange={() => setFrete(0)}
                                    checked={frete == 0}/>
                                Retirada na loja (grátis)
                            </label>
                        </div>
                        <div className="">
                            <label className="flex flex-row gap-2">
                                <input
                                    type="radio"
                                    name="entrega"
                                    value={10}
                                    onChange={() => setFrete(10)}
                                    checked={frete == 10}/>
                                Entrega para Natal (R$ 10,00)
                            </label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-2'>
                    <Link href={'/cart'} className='w-full bg-gray-400 rounded-md px-5 py-3 md:mt-8 text-white text-center'>
                        Voltar para o carrinho
                    </Link>
                    <button
                        onClick={handleFinalizeSale}
                        disabled={loading}
                        className="text-white flex flex-row items-center justify-center gap-2 hover:gap-4 bg-black-1000 w-full self-end rounded-md px-5 py-3 md:mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Redirecionando...' : 'Seguir para pagamento'}
                        <BsArrowRight className='text-white text-lg'></BsArrowRight>
                    </button>
                </div> 
            </div>
        </div>
    </div>)
}

export default ProtectedRoute(Checkout);