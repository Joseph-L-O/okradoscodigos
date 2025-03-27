import { useState } from "react"
import { useRouter } from "next/router"
import { auth, googleProvider, signInWithPopup } from "../../lib/firebase"
import { allowedEmails } from "../api/auth/allowedEmails"


export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState(null)

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Você pode adicionar verificações de permissão aqui, por exemplo, permitir apenas certos e-mails
      if (!user.email || !allowedEmails.includes(user.email)) {
        setError(null)
        return
      }

      // Se o login for bem-sucedido, redireciona para a página inicial
      router.push("/profile")
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error)
      setError(null)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Login com Google</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}
