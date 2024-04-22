import axios from "axios"


const base = process.env.BASE_URL_BACKEND


export async function loginRequest
    ( credentials ) {
   

   

    return await axios({
        method: "post",
        url: base+"user/login",
        data: {
            username: credentials.username,
            password: credentials.password
        }
    })

}