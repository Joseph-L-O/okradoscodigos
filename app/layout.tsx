import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OKraQPrograma",
  description: "Um blog sobre desenvolvimento web e outras coisas, aqui você encontrará notícias, artigos e dicas de desenvolvimento web.", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
