import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import "../app/globals.css";

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-[#334155] font-semibold text-2xl">
          OKraQPrograma
        </Link>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMenu} 
          className="md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className="text-blog-[#334155] hover:text-[#0f172a] transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            href="/category/technology" 
            className="text-blog-[#334155] hover:text-[#0f172a] transition-colors font-medium"
          >
            Technology
          </Link>
          <Link 
            href="/category/lifestyle" 
            className="text-blog-[#334155] hover:text-[#0f172a] transition-colors font-medium"
          >
            Lifestyle
          </Link>
          <Link 
            href="/category/design" 
            className="text-blog-[#334155] hover:text-[#0f172a] transition-colors font-medium"
          >
            Design
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="ml-4">
              Dashboard
            </Button>
          </Link>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0f172a] border-t border-border py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-blog-[#334155] hover:text-[#0f172a] dark:text-gray-200 dark:hover:text-white transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/category/technology" 
              className="text-blog-[#334155] hover:text-[#0f172a] dark:text-gray-200 dark:hover:text-white transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Technology
            </Link>
            <Link 
              href="/category/lifestyle" 
              className="text-blog-[#334155] hover:text-[#0f172a] dark:text-gray-200 dark:hover:text-white transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Lifestyle
            </Link>
            <Link 
              href="/category/design" 
              className="text-blog-[#334155] hover:text-[#0f172a] dark:text-gray-200 dark:hover:text-white transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Design
            </Link>
            <Link 
              href="/dashboard" 
              className="text-[#0ea5e9] hover:text-[#0f172a] dark:text-[#0ea5e9] dark:hover:text-white transition-colors py-2 font-medium"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;