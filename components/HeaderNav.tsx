import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import "../app/globals.css";
import Image from "next/image";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    if (searchTerm.length < 3) {
      return;
    }
    // wait until stops typing
    const timeout = setTimeout(() => {
      fetch(`/api/posts?search=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data.data)
          console.log(data.data);
        });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-h-[70px]">
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
        <nav className="hidden md:flex items-center space-x-8 mr-[150px]">
          <Link
            href="/"
            className="text-blog-[#334155] hover:text-[#0f172a] transition-colors font-medium"
          >
            Home
          </Link>
          <Command className="flex flex-col w-full h-[600px]">
            <CommandInput className="w-[200px] fixed top-[15px]" placeholder="🔍 Search..." onValueChange={(e) => setSearchTerm(e)} />
            <CommandList className="relative top-[300px] w-full h-[600px] z-10 shadow-lg">
              <CommandEmpty></CommandEmpty>
              <CommandGroup className="w-full" >
                {searchResults.length > 0 && searchResults.map((result: { id: number; title: string; slug: string; excerpt: string; coverImage: string; }) => (
                  <CommandItem key={result.id} className="p-2 hover:bg-[#0ea5e9] bg-amber-50" >
                    <Link href={`/blogpost/${result.slug}`} className="flex items-center space-x-2">
                      <Image
                        src={result.coverImage || 'https://dummyimage.com/800x450/000/fff'}
                        alt={result.title}
                        width={400}
                        height={225}
                        className="w-10 h-10 object-cover transition-transform hover:scale-105 duration-300"
                      />
                      <div className="space-y-1">
                        <h2 className="font-semibold text-[12px]">{result.title.slice(0, 40)}</h2>
                        <h3 className="font-normal text-[10px]">{result.excerpt.slice(0, 40)}</h3>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

        </nav>
      </div >

      {/* Mobile Navigation */}
      {
        isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0f172a] border-t border-border py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="text-blog-[#334155] hover:text-[#0f172a] dark:text-gray-200 dark:hover:text-white transition-colors py-2 font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Command className="bg-white dark:bg-white flex flex-col w-full h-[300px]">
                <CommandInput className="w-64 fixed top-[145px]" placeholder="🔍 Search..." onValueChange={(e) => setSearchTerm(e)} />
                <CommandList className="relative top-[0px] w-full z-10 shadow-lg">
                  <CommandGroup className="w-full" >
                    {searchResults && searchResults.map((result: { id: number; title: string; slug: string; excerpt: string; coverImage: string; }) => (
                      <CommandItem key={result.id} className="p-2 hover:bg-[#0ea5e9] bg-amber-50" >
                        <Link href={`/blogpost/${result.slug}`} className="flex items-center space-x-2">
                          <Image
                            src={result.coverImage || 'https://dummyimage.com/800x450/000/fff'}
                            alt={result.title}
                            width={400}
                            height={225}
                            className="w-10 h-10 object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="space-y-1">
                            <h2 className="font-semibold text-[12px]">{result.title.slice(0, 40)}</h2>
                            <h3 className="font-normal text-[10px]">{result.excerpt.slice(0, 40)}</h3>
                          </div>
                        </Link>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        )
      }
    </header >
  );
};

export default HeaderNav;