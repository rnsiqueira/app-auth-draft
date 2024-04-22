import axios from "axios"


const base_url = process.env.BASE_URL_BACKEND

type UserData = {
    username: String,
    password: String
}


export async function loginRequest
    ({username, password}: UserData) {


    return await axios.post(base_url+"/user/login", {
        username: username,
        password: password
    })
    .then((response) => {
        console.log(response)
    })

}