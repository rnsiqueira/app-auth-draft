import LoginForm from "@/components/login-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"


export default function LoginPage() {
    const { status } = useSession()
    const route = useRouter()

    if (status === "authenticated") {
        route.push("/logado")
    }

    else {

        return (
            <>
                <LoginForm />
            </>
        )
    }
}