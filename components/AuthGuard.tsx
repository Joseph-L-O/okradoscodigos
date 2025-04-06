'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthGuard({ children, requireAuth = true }: { children: React.ReactNode, requireAuth?: boolean }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isAllowed, setIsAllowed] = useState(false)

    useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        const expires_at = localStorage.getItem('expires_at')
        const refresh_token = localStorage.getItem('refresh_token')

        if (!access_token) {
            // Redireciona para a página de login se o usuário não estiver autenticado
            if (requireAuth) {
                router.push('/auth/signin')
            }
            setLoading(false)
            return
        }
        if (expires_at && new Date(expires_at) < new Date()) {
            // Redireciona para a página de login se o token estiver expirado
            if (requireAuth) {
                router.push('/auth/signin')
            }
            setLoading(false)
            return
        }
        if (refresh_token && (+new Date(expires_at || "")) - (+new Date()) < 15 * 60 * 1000 &&
            new Date(expires_at || "") > new Date()) {
            // Atualiza o token se estiver prestes a expirar e não estiver expirado
            fetch("/api/authentication/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh_token }),
            })
                .then((response) => response.json())
                .then(({ data }: { data: { access_token: string, expires_at: string, refresh_token: string } }) => {
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('expires_at', data.expires_at)
                    localStorage.setItem('refresh_token', data.refresh_token)
                })
                .catch(() => {
                    if (requireAuth) {
                        router.push('/auth/signin')
                    }
                })
                .finally(() => {
                    setLoading(false)
                    return
                })
        }
        // Redireciona para a página de perfil se o usuário estiver logado e tentar acessar a página de login
        if (!requireAuth && window.location.pathname === '/auth/signin' && access_token) {
            router.push('/profile')
            setLoading(false)
            return
        }

        setIsAllowed(true)
        setLoading(false)
    }, [requireAuth, router])

    if (loading) {
        return <div>Carregando...</div>
    }

    if (requireAuth && !isAllowed) {
        return null // Evita renderizar o conteúdo enquanto redireciona
    }

    return <>{children}</>
}