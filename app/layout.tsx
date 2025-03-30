import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Min joe blog",
  description: "A blog about web development and other stuff",
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
