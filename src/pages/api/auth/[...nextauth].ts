import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { loginRequest } from "../request-utils"



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
 
  
    Credentials({
      name: "Your Credetials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
       const response = await loginRequest(credentials)
       console.log(response)
        
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

  ],

  callbacks: {

    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },

    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@google.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },

  },


}




export default NextAuth(authOptions)