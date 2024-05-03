import axios from "axios"


const base_url = process.env.BASE_URL_BACKEND


export const api = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
