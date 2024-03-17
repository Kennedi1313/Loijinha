import { useAuth } from "@/components/Context/authContext";
import ProtectedRoute from "../protectedRoute"
import { useEffect, useState } from "react";
import { findAddressByCep, getCustomerByEmail, getCustomers, saveCustomer } from "@/lib/client";
import toast from "react-hot-toast";
import Menu from "@/components/menu";
import { Form, Formik, FormikValues, useField } from "formik";
import { cepMask, phoneMask } from "@/lib/utils";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import * as Yup from 'yup';

const MyTextInput = ({label, ...props} : any) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="border-solid border-[1px] border-gray-300 p-2 rounded-md" {...field} {...props} />
            {meta.touched && meta.error ? (
                <span className="font-bold text-red-500">{meta.error}</span>
            ) : null}
        </div>
    );
};

interface Customer {
    name: string,
    email: string,
    password: string,
    phone: string,
    zip: string,
    street: string,
    number: number,
    district: string,
    city: string,
    reference: string
}

const Account = () => {
    const { logOut, customer, setCustomerFromToken } = useAuth();
    const [fullCustomer, setFullCustomer] = useState<Customer>({
        name: '',
        email: '',
        password: '',
        phone: '',
        zip: '',
        street: '',
        number: 0,
        district: '',
        city: '',
        reference: ''
    });
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");
    const fetchCustomers = () => {
        setLoading(true);
        getCustomerByEmail(customer.username).then((res) => {
            setFullCustomer(res.data)
            console.log(fullCustomer)
            console.log(res.data)
        }).catch(err => {
            setError(err.response.data.message)
            toast(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            setLoading(false)
        })
    }

    const onSuccess = (token: any) => {
        localStorage.setItem("access_token", token)
        setCustomerFromToken()
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    const getAddress = (cep: string, values: FormikValues, e: any, setFieldValue: any) => {
        e.preventDefault()
        if (cep.length < 8)
            return;
        findAddressByCep(cep)
        .then( res => {
            console.log(res);
            setFieldValue("street", res.data.logradouro);
            setFieldValue("district", res.data.bairro);
            setFieldValue("city", res.data.localidade);
        }).catch(err => {
            console.log(err);
            toast.error(
                err.code,
                err.response.data.message
            )
        })
    }

    if (fullCustomer.name == '')
        return (<span>Carregando dados</span>)

    return (
        <>
            <Menu></Menu>
            <Formik
                initialValues={fullCustomer}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Obrigatório'),
                    email: Yup.string()
                        .email("Email tem um formato inválido")
                        .required('Obrigatório'),
                    password: Yup.string()
                        .min(4, 'No mínimo 4 dígitos')
                        .max(15, 'No máximo 15 dígitos')
                        .required('Obrigatório'),
                    confirmPassword: Yup.string()
                    .required('Obrigatório')
                    .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais'),
                    phone: Yup.string().required('Obrigatório')
                })}
                onSubmit={(customer, {setSubmitting}) => {
                    setSubmitting(true);
                    saveCustomer(customer)
                        .then(res => {
                            console.log(res);
                            toast.success(
                                `${customer.name} foi salvo com sucesso.`
                            )
                            onSuccess(res.headers["authorization"]);
                        }).catch(err => {
                            console.log(err);
                            toast.error(
                                err.code,
                                err.response.data.message
                            )
                    }).finally(() => {
                         setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting, values, setFieldValue}) => (
                    <Form className='flex flex-col w-full gap-2 md:px-20 mt-28 md:mt-44'>
                        <div className='flex flex-col md:flex-row align-top w-full justify-around gap-4'>
                            <div className="flex flex-col p-4 gap-2 w-full bg-white  rounded-lg md:border-solid md:border-[1px] border-gray-300">
                                <h1 className='text-2xl font-semibold mb-4'>Informações Pessoais</h1>
                                <MyTextInput
                                    label="Nome"
                                    name="name"
                                    type="text"
                                    placeholder="Amanda"
                                />
                                <MyTextInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="exemplo@amanditapratas.com"
                                />

                                <MyTextInput
                                    label="Senha"
                                    name="password"
                                    type="password"
                                    placeholder={"Escolha uma senha segura"}
                                />

                                <MyTextInput
                                    label="Confirme sua senha"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder={"Reescreva sua senha"}
                                />

                                <MyTextInput
                                    label="Telefone para contato (somente os números)"
                                    name="phone"
                                    type="text"
                                    onChange = {(e: any) => setFieldValue("phone", phoneMask(e.target.value))} 
                                    placeholder="(88) 98888-8888"
                                />
                            </div>
                            <div className="flex flex-col p-4 gap-2 w-full bg-white rounded-lg md:border-solid md:border-[1px] border-gray-300">
                                <h1 className='text-2xl font-semibold mb-4'>Endereço Para Entrega</h1>
                                <div className='flex flex-row w-full gap-2'>
                                    <MyTextInput
                                        label="CEP (somente os números)"
                                        name="zip"
                                        type="text"
                                        onChange = {(e: any) => setFieldValue("zip", cepMask(e.target.value))}
                                        placeholder="59000200"
                                    />
                                    <button className='w-full rounded-md bg-gray-300 border-solid 
                                        border-[1px] border-gray-400 p-2 self-end' 
                                        onClick={(e) => getAddress(values.zip, values, e, setFieldValue)}>Buscar</button>
                                </div>

                                <MyTextInput
                                    label="Rua"
                                    name="street"
                                    type="text"
                                    disabled
                                    placeholder="Rua dos bobos"
                                />

                                <MyTextInput
                                    label="Número"
                                    name="number"
                                    type="number"
                                    placeholder={0}
                                />

                                <MyTextInput
                                    label="Bairro"
                                    name="district"
                                    type="text"
                                    disabled
                                    placeholder={"Lagoa Nova"}
                                />

                                <MyTextInput
                                    label="Cidade"
                                    name="city"
                                    type="text"
                                    disabled
                                    placeholder="Natal"
                                />

                                <MyTextInput
                                    label="Ponto de referência (opcional)"
                                    name="reference"
                                    type="text"
                                    placeholder="Bloco 3 ap 103"
                                />
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-4 p-2 md:p-0'>
                            Algum erro com seus dados? Por favor, entre em contato com o nosso suporte através do Whatsapp
                        </div>

                        <div className='flex cursor-pointer w-full md:w-fit bg-red-400 p-3 font-semibold rounded-md text-white text-center'
                            onClick={logOut}>
                            Sair da sua conta
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ProtectedRoute(Account);