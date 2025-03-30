// hooks/useAuth.js
'use client'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<User|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}