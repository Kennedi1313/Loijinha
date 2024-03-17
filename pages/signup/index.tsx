import {useAuth} from "../../components/Context/authContext";
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import CreateCustomerForm from "@/components/createCustomerForm";
import Menu from "@/components/menu";

const Signup = () => {
    const { customer, setCustomerFromToken } = useAuth();
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
  
    useEffect(() => {
        if (customer) {
            router.push("/account");
        }
        setIsClient(true)
    }, [])

    return (
        <>{isClient ? 
        <>
        <Menu></Menu>
        <div className="md:mt-48 mt-28 flex-col md:flex-row">
            <div className="flex items-center justify-center">
                <div className="w-full max-w-5xl">
                    <div className="flex align-top">
                        
                        <CreateCustomerForm onSuccess={(token: any) => {
                            localStorage.setItem("access_token", token)
                            setCustomerFromToken()
                            router.push("/cart");
                        }}/>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
         : ""
        }</>
    );
}

export default Signup;