'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'

export default function AuthGuard({ children, requireAuth = true }: { children: React.ReactNode, requireAuth?: boolean }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isAllowed, setIsAllowed] = useState(false)

    useEffect(() => {
        const user = auth.currentUser

        if (!user) {
            // Redireciona para a página de login se o usuário não estiver autenticado
            if (requireAuth) {
                router.push('/auth/signin')
            }
            setLoading(false)
            return
        }

        // Verifica a autorização do usuário através da API
        fetch("/api/authentication/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("API returned an error")
                }
                return response.json()
            })
            .then((body) => {
                if (body?.isAllowed) {
                    setIsAllowed(true)
                } else {
                    setIsAllowed(false)
                    if (requireAuth) {
                        router.push('/auth/signin') // Redireciona para login se não autorizado
                    }
                }
            })
            .catch(() => {
                if (requireAuth) {
                    router.push('/auth/signin') // Redireciona para login em caso de erro
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [requireAuth, router])

    if (loading) {
        return <div>Carregando...</div>
    }

    if (requireAuth && !isAllowed) {
        return null // Evita renderizar o conteúdo enquanto redireciona
    }

    return <>{children}</>
}