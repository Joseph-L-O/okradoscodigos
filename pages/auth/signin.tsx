import { useState } from "react"
import { useRouter } from "next/router"
import AuthGuard from "@/components/AuthGuard"
import { GoogleAuthProvider, signOut } from "firebase/auth"
import { auth, signInWithPopup } from "@/lib/firebase"
import "../../app/globals.css"
import { LogIn } from "lucide-react"


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
      if (!request.ok) {
        signOut(auth)
        alert("Erro ao fazer login com o Google")
        return
      }
      const body = await request?.json()

      if (body?.data === null) {
        signOut(auth)
        alert("Erro ao fazer login com o Google")
        return
      }

      router.push("/profile")
    } catch (error) {
      console.error(error)
      setError(null)
    }
  }

  return (
    <AuthGuard requireAuth={false}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <button onClick={handleGoogleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"> <LogIn className="h-6 w-6 mr-2" /> Login com Google</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </AuthGuard>
  )
}
