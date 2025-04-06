import { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArticleItem } from "@/types";

// Mock categories data
const categories = [
  { 
    slug: "technology", 
    name: "Technology", 
    description: "The latest in tech trends, innovations, and digital transformation."
  },
  { 
    slug: "design", 
    name: "Design", 
    description: "Insights on UI/UX, graphic design, and creative processes."
  },
  { 
    slug: "lifestyle", 
    name: "Lifestyle", 
    description: "Tips for well-being, productivity, and balanced living."
  }
];

// Mock posts by category
const mockPostsByCategory: Record<string, ArticleItem[]> = {
  technology: [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2023",
      excerpt: "Explore the cutting-edge technologies and methodologies shaping the landscape of web development in the coming year.",
      slug: "future-web-development-trends-2023",
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
      category: "Technology",
      categorySlug: "technology",
      date: "May 15, 2023",
      contentHtml: ""
    },
    {
      id: "4",
      title: "Building Scalable Web Applications with Modern Architecture",
      excerpt: "An in-depth look at modern web architecture patterns that enable applications to scale efficiently.",
      slug: "scalable-web-applications-modern-architecture",
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1334&q=80",
      category: "Technology",
      categorySlug: "technology",
      date: "April 28, 2023",
      contentHtml: ""
    }
  ],
  design: [
    {
      id: "2",
      title: "Minimalist Design Principles for Modern Interiors",
      excerpt: "Discover how the principles of minimalist design can transform your living space into a serene and functional environment.",
      slug: "minimalist-design-principles-modern-interiors",
      coverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Design",
      categorySlug: "design",
      date: "May 10, 2023",
      contentHtml: ""
    },
    {
      id: "5",
      title: "The Psychology of Color in User Interface Design",
      excerpt: "Understand how color choices in UI design affect user perception, emotions, and decision-making.",
      slug: "psychology-color-ui-design",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Design",
      categorySlug: "design",
      date: "April 22, 2023",
      contentHtml: ""
    }
  ],
  lifestyle: [
    {
      id: "3",
      title: "Digital Detox: How to Create Healthy Tech Boundaries",
      excerpt: "Learn practical strategies for establishing boundaries with technology to improve your mental health and productivity.",
      slug: "digital-detox-healthy-tech-boundaries",
      coverImage: "https://images.unsplash.com/photo-1529586691389-2d3d4039a5c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Lifestyle",
      categorySlug: "lifestyle",
      date: "May 5, 2023",
      contentHtml: ""
    },
    {
      id: '6',
      title: "Sustainable Living: Small Changes with Big Impact",
      excerpt: "Discover simple, everyday changes you can make to live more sustainably and reduce your environmental footprint.",
      slug: "sustainable-living-small-changes-big-impact",
      coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1213&q=80",
      category: "Lifestyle",
      categorySlug: "lifestyle",
      date: "April 15, 2023",
      contentHtml: ""
    }
  ]
};

const Category = () => {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "";
  const [category, setCategory] = useState<typeof categories[0] | null>(null);
  const [posts, setPosts] = useState<ArticleItem[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch the category by slug
    // and its associated posts
    if (slug) {
      const foundCategory = categories.find(cat => cat.slug === slug);
      if (foundCategory) {
        setCategory(foundCategory);
        setPosts(mockPostsByCategory[slug] || []);
      } else if (slug === 'all') {
        // Handle "all" posts
        setCategory({ 
          slug: 'all', 
          name: 'All Posts', 
          description: 'Browse through all our blog posts across various categories.'
        });
        // Combine all posts from all categories
        const allPosts = Object.values(mockPostsByCategory).flat();
        setPosts(allPosts);
      } else {
        // Redirect to 404 page if category not found
        window.location.href = "/404";
      }
    }
  }, [slug]);

  if (!category) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />
      
      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-[#0f172a] text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
              <p className="text-lg text-gray-300">
                {category.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Posts Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-500">No posts found in this category.</h3>
                <Link href="/" className="text-[#0ea5e9] hover:underline mt-4 inline-block">
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;
