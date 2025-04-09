import { useState } from "react"
import { useRouter } from "next/router"
import AuthGuard from "@/components/AuthGuard"
import "../../app/globals.css"
import { LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"


export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleAuthenticate = async () => {
    try {

      const user = { email: email, password: password }
      const request = await fetch("/api/authentication/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      })
      if (!request.ok) {
        alert("Erro ao fazer login")
        return
      }
      const { data } = await request?.json()

      if (data === null) {
        alert("Erro ao fazer login")
        return
      }

      if(data?.access_token === null || data?.refresh_token === null || data?.expires_at === null) {
        alert("Erro ao fazer login")
        return
      }
      
      localStorage.setItem("token", data?.access_token)
      localStorage.setItem("refresh_token", JSON.stringify(data?.refresh_token))
      localStorage.setItem("expires_at", JSON.stringify(data?.expires_at))

      router.push("/dashboard")
    } catch (error) {
      console.error(error)
      setError(null)
    }
  }

  return (
    <AuthGuard requireAuth={false}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 w-64"  />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 w-64" />
        <button onClick={handleAuthenticate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"> <LogIn className="h-6 w-6 mr-2" /> Login </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </AuthGuard>
  )
}
