// components/AuthGuard.js
'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function AuthGuard({ children, requireAuth = true }: { children: React.ReactNode, requireAuth?: boolean }) {
    const router = useRouter()
    const { loading } = useAuth()
    const user = auth.currentUser

    useEffect(() => {
        fetch("/api/authentication/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user?.email }),
        }).then((response) => {
            if (!response.ok) {
                signOut(auth)
                alert("Erro ao fazer login com o Google")
                return
            }
            const body = response?.json()
            console.log(response)
            console.log(body)

            if (!loading) {
                if (requireAuth && !user) {
                    router.push('/auth/signin')
                } else if (!requireAuth && user) {
                    router.push('/profile')
                }
            }
        })
    }, [user, loading, requireAuth, router])

    if (loading) {
        return <div>Carregando...</div>
    }

    if ((requireAuth && !user) || (!requireAuth && user)) {
        return null
    }

    return <>{children}</>
}