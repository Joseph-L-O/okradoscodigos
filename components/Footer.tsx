import Link from "next/link";
import "../app/globals.css";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState<{label: string}[]>([]);
  useEffect(() => {
    fetch("/api/categories").then(res => res.json()).then(categories => setCategories(categories));
  }, []);
  return (
    <footer className="bg-[#0f172a] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">OKraQPrograma</h3>
            <p className="text-gray-300 mb-4">
              Your blog about on technology and lifestyle.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              {
                categories.map((category:{label: string}, index) => (

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
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-gray-400 text-sm">
          <p>&copy; {currentYear} OKraQPrograma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;