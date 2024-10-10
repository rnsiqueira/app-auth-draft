import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function Logado() {
  const { data: session } = useSession()
  console.log(session)
  if(session) {
    return <>
      Signed in as {session.user?.name} <br/>

      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn("google")}>Sign in</button>
  </>
}

Logado.auth = true