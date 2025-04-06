"use client";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from "react";

export default function Profile() {
    const [file, setFile] = useState<File | null>(null);
    useEffect(() => {
    }, []);

    const handleFileUpload = async () => {
        if (!file ) return;

        const reader = new FileReader();

        reader.readAsText(file);
    };

    return (
        <AuthGuard requireAuth>
            <div>

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
                </ul>
            </div>
        </AuthGuard>
    );
}