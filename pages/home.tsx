import { useState, useEffect, SetStateAction } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import "../app/globals.css";
import { getAllArticles,  } from "@/lib/articles";
import { ArticleItem } from "@/types";
// Mock data for blog posts
// [
//   {
//     id: 6,
//     title: "Sustainable Living: Small Changes with Big Impact",
//     excerpt: "Discover simple, everyday changes you can make to live more sustainably and reduce your environmental footprint.",
//     slug: "sustainable-living-small-changes-big-impact",
//     coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1213&q=80",
//     category: "Lifestyle",
//     categorySlug: "lifestyle",
//     date: "April 15, 2023",
//     readTime: "5 min"
//   }
// ];

const Home = () => {
  const [featuredPost, setFeaturedPost] = useState<ArticleItem | null>(null);
  const [recentPosts, setRecentPosts] = useState<ArticleItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getAllArticles();
      console.log(articles);
      setFeaturedPost(articles[0] as unknown as SetStateAction<ArticleItem | null>);
      setRecentPosts(articles.slice(0, 2) as unknown as SetStateAction<ArticleItem[]>);
      setCategories(articles.map(article => article.category).filter((value, index, self) => self.indexOf(value) === index) as unknown as SetStateAction<string[]>);
    };

    fetchArticles();
  }, []);

  if (!featuredPost) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0f172a] text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">OKraQPrograma</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Your blog about on technology and lifestyle.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 md:py-16 bg-[#f8fafc]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#0f172a]">Featured Post</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <Image
                  src={featuredPost.coverImage || "https://dummyimage.com/800x500/000/fff"}
                  alt={featuredPost.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <Link href={`/category/${featuredPost.category}`}>
                  <span className="text-[#0ea5e9] font-medium mb-3 inline-block">
                    {featuredPost.category}
                  </span>
                </Link>
                <Link href={`/post/${featuredPost.id}`}>
                  <h3 className="text-3xl font-bold mb-4 text-[#0f172a] hover:text-[#0ea5e9] transition-colors">
                    {featuredPost.title}
                  </h3>
                </Link>
                <p className="text-blog-[#334155] text-lg mb-6">
                  {featuredPost.contentHtml?.slice(0, 150)}...
                </p>
                <div className="flex items-center text-sm text-blog-[#334155] mb-6">
                  <span>{featuredPost.date}</span>
                </div>
                <Link href={`/post/${featuredPost.id}`}>
                  <Button className="bg-[#0f172a] hover:bg-[#0f172a]/90 text-white w-fit">
                    Read Post <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a]">Recent Posts</h2>
              <Link href="/category/all" className="text-[#0ea5e9] hover:text-[#0f172a] transition-colors">
                View all <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts?.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-[#f8fafc]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#0f172a]">Explore by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {
                categories.map((category, index) => (
                  <Link key={index} href="/category/technology" className="bg-white rounded-lg shadow p-8 text-center transition-transform hover:translate-y-[-5px]">
                    <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${category}.png}`} alt={category} width={100} height={100} className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">{category}</h3>
                    <p className="text-blog-[#334155]">
                      {`Explore the latest articles in ${category} category.`}
                    </p>
                  </Link>
                ))
              }
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 md:py-16 bg-[#0f172a] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-lg text-gray-300 mb-8">
                Stay updated with our latest articles, news, and insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] w-full sm:w-auto"
                />
                <Button className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;