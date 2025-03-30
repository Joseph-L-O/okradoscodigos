import Link from "next/link";
import "../app/globals.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              <li>
                <Link href="/category/technology" className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
                  Design
                </Link>
              </li>
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
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-[#0ea5e9] transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-gray-400 text-sm">
          <p>&copy; {currentYear} ElegantBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;