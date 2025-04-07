import Link from "next/link";
import "../app/globals.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState<{ label: string }[]>([]);
  useEffect(() => {
    fetch("/api/categories").then(res => res.json()).then(categories => setCategories(categories));
  }, []);
  return (
    <footer className="bg-[#0f172a] text-white py-12 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/">
            <div className="mb-8 md:mb-0 flex items-center">
              <Image alt="logo" src="/logo.png" width={600} height={600} className="w-[60px] h-[50px] mb-2 mr-2" />
              <h3 className="text-xl font-semibold mb-4">OKraQPrograma</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Seu blog de tecnologia.
            </p>
          </Link>

          <div>
            <h4 className="text-lg font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              {
                categories.map((category: { label: string }, index) => (

                  <li key={index}>
                    <Link href={`/category/${category.label}`} className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
                      {category.label}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
                  Início
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-gray-400 text-sm">
          <p>&copy; {currentYear} OKraQPrograma. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;