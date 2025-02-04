import axios from 'axios';

const API_URL = 'https://api.amanditapratas.com.br/api/v1';

const getAuthConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
})

export const login = async (usernameAndPassword: any) => {
    try {
        return await axios.post(`${API_URL}/auth/login`, usernameAndPassword )
    } catch (e) { throw e }
}

export const getCustomers = async () => {
    try {
        return await axios.get(`${API_URL}/customers`)
    } catch (e) { throw e }
}

export const getCustomerByEmail = async (email: string) => {
    try {
        return await axios.get(`${API_URL}/customers/email/${email}`)
    } catch (e) { throw e }
}

export const saveCustomer = async (customer: any) => {
    try {
        return await axios.post(`${API_URL}/customers`, customer)
    } catch (e) { throw e }
}

export const findAddressByCep = async (cep: string) => {
    try {
        return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    } catch (e) { throw e }
} 

export const sell = async (details: any) => {
    try {
        return await axios.post(`${API_URL}/checkout/checkout-pro`, details)
    } catch (e) { throw e }
}

export const getSales = async () => {
    try {
        return await axios.get(`${API_URL}/products/sales`)
    } catch (e) { throw e }
}

export const getSalesByCustomerEmail = async (email: any) => {
    try {
        return await axios.get(`${API_URL}/products/sales/email/${email}`)
    } catch (e) { throw e }
}

export const updateSale = async (details: any) => {
    try {
        return await axios.post(`${API_URL}/products/sales`, details, { ...getAuthConfig() })
    } catch (e) { throw e }
}

export const updateCustomer = async (customerId: number, updateRequest: any) => {
    try {
        return await axios.put(`${API_URL}/customers/${customerId}`, updateRequest, { ...getAuthConfig() })
    } catch (e) { throw e }
}