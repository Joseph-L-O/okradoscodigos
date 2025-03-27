// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { auth, signInWithPopup, googleProvider } from "../../../lib/firebase"

const googleProvider = new googleProvider()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Google",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        try {
          const userCredential = await signInWithPopup(auth, googleProvider)
          const user = userCredential.user
          return { id: user.uid, email: user.email }
        } catch {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
})
