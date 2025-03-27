import { useState } from "react"
import { useRouter } from "next/router"
import AuthGuard from "@/components/AuthGuard"
import { GoogleAuthProvider, signOut } from "firebase/auth"
import { auth, signInWithPopup } from "@/lib/firebase"

const googleProvider = new GoogleAuthProvider()

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState(null)

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider)
      const user = userCredential.user
      const request = await fetch("/api/authentication/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      })
      if(!request.ok) {
        signOut(auth)
        alert("Erro ao fazer login com o Google")
        return 
      }
      const body = await request?.json()
      console.log(request)
      console.log(body)
      return 

      if (body?.data === null) {
        signOut(auth)
        alert("Erro ao fazer login com o Google")
        return
      }

      router.push("/profile")
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error)
      setError(null)
    }
  }

  return (
    <AuthGuard requireAuth={false}>
      <div>
        <h1>Login</h1>
        <button onClick={handleGoogleLogin}>Login com Google</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </AuthGuard>
  )
}
