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
        <div className="md:mt-48 mt-28 flex-col md:flex-row">
            <div className="flex items-center justify-center">
                <div className="w-full max-w-5xl">
                    <div className="flex align-top">
                        <h1 className="text-3xl font-bold m-4">Faça seu cadastro</h1>
                        <CreateCustomerForm 
                            onSubmit={onSubmit} 
                            initialValues={initialValues} 
                            validationSchema={validationSchema} 
                            newCustomer={true}
                        />
                    </div>
                </div>
            </div>
        </div>
         : ""
        }</>
    );
}

export default Signup;