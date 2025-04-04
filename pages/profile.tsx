"use client";
import AuthGuard from "@/components/AuthGuard";
import { getCategoriesArticles } from "@/lib/articles";
import { auth, database } from "@/lib/firebase";
import { ArticleItem } from "@/types";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, push } from "firebase/database";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [articles, setArticles] = useState<Record<string, ArticleItem[]> | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Define como falso quando o estado do usuário é carregado
        });
        getCategoriesArticles().then((articles) => setArticles(articles)); 
        return () => unsubscribe(); // Limpa o listener quando o componente é desmontado
    }, []);

    const handleFileUpload = async () => {
        if (!file || !user) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const content = event.target?.result as string;

            // Salva o conteúdo no Firebase Realtime Database
            const articlesRef = ref(database, `articles/${user.uid}`);
            await push(articlesRef, {
                title: file.name.replace(".md", ""),
                content,
                createdAt: new Date().toISOString(),
            });

            alert("Arquivo enviado com sucesso!");
        };

        reader.readAsText(file);
    };

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

                <h2>Upload de Arquivo Markdown</h2>
                <input
                    type="file"
                    accept=".md"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button onClick={handleFileUpload} disabled={!file}>
                    Enviar
                </button>

                <h2>Artigos do Usuário</h2>
                <ul>
                    {articles &&
                        Object.values(articles).flat().map((article) => (
                            <li key={article.id}>
                                <h3>{article.title}</h3>
                                <p>{article.date}</p>
                                <p>{article.category}</p>
                                <button>Editar</button>
                                <button>Excluir</button>
                            </li>
                        ))}
                </ul>
            </div>
        </AuthGuard>
    );
}