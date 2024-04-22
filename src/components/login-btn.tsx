import { useSession, signIn, signOut } from "next-auth/react"


export default function ButtonSessionTest() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    <br/>
     <div className="flex flex-shrink space-x-3 items-end">
     <button className="" onClick={() => signIn()}>Access with google.</button>
     </div>
    </>
  )
}