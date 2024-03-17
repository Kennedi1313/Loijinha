import axios from 'axios';

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const login = async (usernameAndPassword: any) => {
    try {
        return await axios.post(
            `http://62.72.11.102:8088/api/v1/auth/login`,
            //`http://localhost:8080/api/v1/auth/login`,
            usernameAndPassword
        )
    } catch (e) {
        throw e;
    }
}

export const getCustomers = async () => {
    try {
        return await axios.get(
            `http://62.72.11.102:8088/api/v1/customers`
            //`http://localhost:8080/api/v1/customers`
        )
    } catch (e) {
        throw e;
    }
}

export const getCustomerByEmail = async (email: string) => {
    try {
        return await axios.get(
            `http://62.72.11.102:8088/api/v1/customers/${email}`
            //`http://localhost:8080/api/v1/customers/email/${email}`
        )
    } catch (e) {
        throw e;
    }
}

export const saveCustomer = async (customer: any) => {
    try {
        return await axios.post(
            `http://62.72.11.102:8088/api/v1/customers`,
            //`http://localhost:8080/api/v1/customers`,
            customer
        )
    } catch (e) {
        throw e;
    }
}

export const findAddressByCep = async (cep: string) => {
    try {
        return axios.get(
            `https://viacep.com.br/ws/${cep}/json/`
        )
    } catch (e) {
        throw e;
    }
} 