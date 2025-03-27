import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Profile() {
    const { data: session } = useSession()
    const router = useRouter()

    if (!session) {
        router.push("/auth/signin")
        
        return (
            <div>
                <h1>Você não está logado.</h1>
                <p>Por favor, faça login para acessar seu perfil.</p>
            </div>
        )
    }

    return (
        <div>
            <Image src={session?.user?.image || "/default-image.png"} alt="User Image" width={100} height={100} />
            <p>Email: {session?.user?.email}</p>
            <button onClick={() => signOut()}>Sair</button>
        </div>
    )
}
