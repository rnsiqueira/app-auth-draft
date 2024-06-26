import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { api, apiAddToken, loginRequest } from "../request-utils";
import test from "node:test";

const base_url = process.env.BASE_URL_BACKEND

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: String;
          password: String;
        };

    


        

        const { data } = await api.post("/user/auth", {}, {
          auth: {
            username: email,
            password: password
          }
        })

        api.defaults.headers.common["Authorization"] = "Bearer " + data


        // if everything is fine
        return data
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRECT
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params) {

      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },

    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
};


export default NextAuth(authOptions)