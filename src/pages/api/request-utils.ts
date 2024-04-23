import axios from "axios"


const base_url = process.env.BASE_URL_BACKEND

type User = {
    username: String;
    password: String;
}

let api = axios.create({
    baseURL: base_url,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})


export function loginRequest
    ({ username, password }: User) {

    console.log("function: " + username)
    return api.post("/user/login", {
        userName: username,
        password: password
    }
)

}