import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import 'tailwindcss/tailwind.css'


export default function App({
    Component,
    pageProps: { session, ...pageProps }, }: AppProps) {
    return (
        <SessionProvider session={session}>

            {Component.auth ? (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            ) : (
                <Component {...pageProps} />
            )}

        </SessionProvider>

    )
}

function Auth({ children }) {
    const { status } = useSession()
    const route = useRouter()

    if (status === "loading") {
        return <div className="justify-center border-blue-400 text-red-800">Loading ...</div>
    }

    if (status === "unauthenticated") {
        route.push('/auth/login')
    }
    
    console.log(status)
    return children
}


