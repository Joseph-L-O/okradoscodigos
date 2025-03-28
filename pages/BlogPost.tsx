import { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import BlogCard, { type BlogPost as BlogPostType } from "@/components/BlogCard";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Mock data for a single blog post
const mockPost = {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2023",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the landscape of web development in the coming year.",
    slug: "future-web-development-trends-2023",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1172&q=80",
    category: "Technology",
    categorySlug: "technology",
    date: "May 15, 2023",
    readTime: "8 min",
    content: `
<p>The web development landscape is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. As we look ahead to 2023, several trends are poised to reshape how we build and interact with web applications.</p>

<h2>1. The Rise of WebAssembly</h2>
<p>WebAssembly (Wasm) continues to gain traction as a powerful technology that enables high-performance execution of code on web browsers. Originally designed to allow languages like C, C++, and Rust to run on the web, WebAssembly is evolving into a universal compilation target for numerous programming languages.</p>

<p>In 2023, we can expect to see WebAssembly moving beyond the browser, establishing itself as a lightweight, secure, and portable runtime for server-side applications, edge computing, and IoT devices. This expansion will open new possibilities for web developers to create faster, more efficient applications across various platforms.</p>

<h2>2. Edge Computing Takes Center Stage</h2>
<p>The shift towards edge computing is becoming increasingly prominent in web development. By processing data closer to where it's generated, edge computing reduces latency and improves performance. Frameworks and platforms that support edge runtime environments, such as Cloudflare Workers, Vercel Edge Functions, and Deno Deploy, are gaining popularity.</p>

<p>In 2023, we'll see more web applications leveraging edge computing to deliver near-instantaneous user experiences, especially for globally distributed applications. This trend aligns with the broader movement towards distributed architecture and microservices.</p>

<h2>3. AI-Powered Development Tools</h2>
<p>Artificial Intelligence is transforming the web development process itself. AI-powered tools are now capable of generating code, suggesting optimizations, and automating repetitive tasks. These tools analyze patterns in codebases to provide contextually relevant suggestions, helping developers work more efficiently.</p>

<p>In the coming year, expect to see more sophisticated AI assistants that can understand higher-level intentions and generate substantial portions of applications based on natural language descriptions. This will democratize web development, making it more accessible to individuals with limited coding experience.</p>

<h3>Popular AI Development Tools to Watch:</h3>
<ul>
  <li>GitHub Copilot</li>
  <li>TensorFlow.js</li>
  <li>Lovable</li>
  <li>chatGPT API integrations</li>
</ul>

<h2>4. The Maturation of Serverless Architecture</h2>
<p>Serverless architecture has been gaining momentum for several years, and in 2023 it will continue to mature and become even more mainstream. The promise of reduced operational complexity, automatic scaling, and pay-per-use pricing models makes serverless an attractive option for web developers.</p>

<p>As the serverless ecosystem grows, we'll see more sophisticated development patterns emerge, along with improved developer tools that address the current challenges of debugging, monitoring, and testing serverless applications.</p>

<blockquote>
  "Serverless architecture is quickly becoming the default choice for new web applications, allowing teams to focus on building features rather than managing infrastructure."
</blockquote>

<h2>5. Increased Adoption of Web Components</h2>
<p>Web Components, a set of standardized APIs built into browsers, enable the creation of custom, reusable, and encapsulated HTML elements. Despite being around for several years, their adoption has been slower than proprietary component systems.</p>

<p>However, 2023 may see a shift in this trend as more developers recognize the benefits of using platform-native solutions that don't require heavy frameworks. The improved browser support and the growing ecosystem of tools and libraries around Web Components are making them an increasingly viable option for building modern web interfaces.</p>

<h2>Conclusion</h2>
<p>The web development landscape in 2023 promises exciting advancements that will enhance performance, developer productivity, and user experience. By staying informed about these trends and selectively adopting those that align with your project goals, you can position yourself at the forefront of web innovation.</p>

<p>As with any technological shift, it's important to approach these trends with a critical eye, evaluating their long-term viability and relevance to your specific use cases. The most successful web developers will be those who can strategically incorporate new tools and methodologies while maintaining focus on delivering value to users.</p>
  `
};

// Mock related posts
const mockRelatedPosts: BlogPostType[] = [
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

const BlogPost = () => {

    const params = useParams<{ slug: string }>();
    const slug = params?.slug || "";
    const [post, setPost] = useState<typeof mockPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

    useEffect(() => {
        if (slug === mockPost.slug) {
            setPost(mockPost);
            setRelatedPosts(mockRelatedPosts);
        } else {
            window.location.href = "/404";
        }
    }, [slug]);

    if (!post) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <HeaderNav />

            <main className="flex-1">
                <section className="bg-[#0f172a] text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <Link href={`/category/${post.categorySlug}`}>
                                <Badge className="mb-4 bg-[#0ea5e9] hover:bg-[#0ea5e9]/90">
                                    {post.category}
                                </Badge>
                            </Link>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                            <div className="flex justify-center items-center text-gray-300 text-sm md:text-base">
                                <span>{post.date}</span>
                                <span className="mx-2">•</span>
                                <span>{post.readTime} read</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 -mt-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <Link href="/" className="inline-flex items-center text-[#0ea5e9] hover:text-[#0f172a] transition-colors mb-8">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>

                            <article className="prose prose-lg max-w-none blog-content">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </article>

                            <div className="mt-12 pt-8 border-t">
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-blog-[#334155]">Tags:</span>
                                    <Link href={`/tag/webdev`}>
                                        <Badge variant="outline" className="hover:bg-secondary">
                                            Web Development
                                        </Badge>
                                    </Link>
                                    <Link href={`/tag/technology`}>
                                        <Badge variant="outline" className="hover:bg-secondary">
                                            Technology
                                        </Badge>
                                    </Link>
                                    <Link href={`/tag/trends`}>
                                        <Badge variant="outline" className="hover:bg-secondary">
                                            2023 Trends
                                        </Badge>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-[#f8fafc]">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#0f172a]">Related Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;