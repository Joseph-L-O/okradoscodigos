"use client";
import AuthGuard from "@/components/AuthGuard";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Define como falso quando o estado do usuário é carregado
        });

        return () => unsubscribe(); // Limpa o listener quando o componente é desmontado
    }, []);

    if (loading) {
        // Exibe um indicador de carregamento enquanto o estado do usuário está sendo carregado
        return <p>Carregando...</p>;
    }

    return (
        <AuthGuard requireAuth>
            <div>
                <Image
                    src={user?.photoURL || "/default-image.png"}
                    alt="User Image"
                    width={100}
                    height={100}
                />
                <p>Email: {user?.email}</p>
                <button onClick={() => signOut(auth)}>Sair</button>
            </div>
        </AuthGuard>
    );
}