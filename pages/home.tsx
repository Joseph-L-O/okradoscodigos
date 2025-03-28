import { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import BlogCard, { BlogPost } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import "../app/globals.css";
import { getCategoriesArticles } from "@/lib/articles";
// Mock data for blog posts
const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2023",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the landscape of web development in the coming year.",
    slug: "future-web-development-trends-2023",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1172&q=80",
    category: "Technology",
    categorySlug: "technology",
    date: "May 15, 2023",
    readTime: "8 min"
  },
  {
    id: 2,
    title: "Minimalist Design Principles for Modern Interiors",
    excerpt: "Discover how the principles of minimalist design can transform your living space into a serene and functional environment.",
    slug: "minimalist-design-principles-modern-interiors",
    coverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1170&q=80",
    category: "Design",
    categorySlug: "design",
    date: "May 10, 2023",
    readTime: "6 min"
  },
  {
    id: 3,
    title: "Digital Detox: How to Create Healthy Tech Boundaries",
    excerpt: "Learn practical strategies for establishing boundaries with technology to improve your mental health and productivity.",
    slug: "digital-detox-healthy-tech-boundaries",
    coverImage: "https://images.unsplash.com/photo-1529586691389-2d3d4039a5c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1170&q=80",
    category: "Lifestyle",
    categorySlug: "lifestyle",
    date: "May 5, 2023",
    readTime: "7 min"
  },
  {
    id: 4,
    title: "Building Scalable Web Applications with Modern Architecture",
    excerpt: "An in-depth look at modern web architecture patterns that enable applications to scale efficiently.",
    slug: "scalable-web-applications-modern-architecture",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1334&q=80",
    category: "Technology",
    categorySlug: "technology",
    date: "April 28, 2023",
    readTime: "10 min"
  },
  {
    id: 5,
    title: "The Psychology of Color in User Interface Design",
    excerpt: "Understand how color choices in UI design affect user perception, emotions, and decision-making.",
    slug: "psychology-color-ui-design",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1170&q=80",
    category: "Design",
    categorySlug: "design",
    date: "April 22, 2023",
    readTime: "9 min"
  },
  {
    id: 6,
    title: "Sustainable Living: Small Changes with Big Impact",
    excerpt: "Discover simple, everyday changes you can make to live more sustainably and reduce your environmental footprint.",
    slug: "sustainable-living-small-changes-big-impact",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1213&q=80",
    category: "Lifestyle",
    categorySlug: "lifestyle",
    date: "April 15, 2023",
    readTime: "5 min"
  }
];

const Home = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setFeaturedPost(mockPosts[0]);
    setRecentPosts(mockPosts.slice(1));
    getCategoriesArticles().then((data) => {
      setCategories(Object.keys(data));
    });
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
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <Link href={`/category/${featuredPost.categorySlug}`}>
                  <span className="text-[#0ea5e9] font-medium mb-3 inline-block">
                    {featuredPost.category}
                  </span>
                </Link>
                <Link href={`/post/${featuredPost.slug}`}>
                  <h3 className="text-3xl font-bold mb-4 text-[#0f172a] hover:text-[#0ea5e9] transition-colors">
                    {featuredPost.title}
                  </h3>
                </Link>
                <p className="text-blog-[#334155] text-lg mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-sm text-blog-[#334155] mb-6">
                  <span>{featuredPost.date}</span>
                </div>
                <Link href={`/post/${featuredPost.slug}`}>
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
              {recentPosts.map(post => (
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

                <Link href="/category/technology" className="bg-white rounded-lg shadow p-8 text-center transition-transform hover:translate-y-[-5px]">
                  <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">Technology</h3>
                  <p className="text-blog-[#334155]">
                    The latest in tech trends, innovations, and digital transformation.
                  </p>
                </Link>
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