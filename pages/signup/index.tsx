import {useAuth} from "../../components/Context/authContext";
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import CreateCustomerForm from "@/components/createCustomerForm";
import { saveCustomer } from "@/lib/client";

const Signup = () => {
    const { customer, setCustomerFromToken } = useAuth();
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const [validationSchema] = useState(Yup.object({
        name: Yup.string().required('Obrigatório'),
        email: Yup.string().email("Email tem um formato inválido").required('Obrigatório'),
        password: Yup.string().min(4, 'No mínimo 4 dígitos').max(15, 'No máximo 15 dígitos').required('Obrigatório'),
        confirmPassword: Yup.string().required('Obrigatório').oneOf([Yup.ref('password')], 'As senhas precisam ser iguais'),
        cpf: Yup.string().required('Obrigatório'),
        phone: Yup.string().required('Obrigatório'),
    }))
    const [initialValues] = useState({name: '', email: '', password: '', cpf: '', phone: '', zip: '', street: '', number: 0, district: '', city: '', reference: ''})
  
    useEffect(() => {
        if (customer) {
            router.push("/account");
        }
        setIsClient(true)
    }, [])

    const onSubmit = (customer: any) => {
        saveCustomer(customer).then(res => {
            toast.success(`${customer.name} foi salvo com sucesso.`)
            localStorage.setItem("access_token", res.headers["authorization"])
            setCustomerFromToken()
            router.push("/cart");
        }).catch((err) => { toast.error( err.response.data.message)})
    }

    return (
        <>{isClient ? 
            <div className="md:container xl:max-w-screen-xl mx-auto py-12 p-2 md:px-6 mt-36 min-h-[40vh]">
                <h2 className="text-4xl font-semibold">Faça seu cadastro</h2>
                <p className="mt-1 text-xl">Insira informações de nome e endereço</p>
                <CreateCustomerForm onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema} newCustomer={true}/>
            </div>
         : ""
        }</>
    );
}

export default Signup;