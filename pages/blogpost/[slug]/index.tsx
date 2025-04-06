import { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArticleItem } from "@/types";

const BlogPost = () => {
    const slug = usePathname();

    const [post, setPost] = useState<ArticleItem | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<ArticleItem[]>([]);
    useEffect(() => {
        if (slug) {

            fetch("/api/posts?slug=" + slug?.replace("/blogpost/", ""))
                .then(res => res.json())
                .then(data => {
                    setPost(data?.data);
                    setRelatedPosts(data?.relatedPosts || []);
                });
        }
    }, [slug]);

    if (!post) {
        return <div className="flex items-center justify-center h-screen flex-col">
            <svg className="animate-bounce h-10 w-10 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-3h11a2.5 2.5 0 0 1 0 5h-11a2.5 2.5 0 0 1 0-5z"></path>
                <path className="opacity-75" fill="currentColor" d="M12 4a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm0-2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"></path>
            </svg>
            <span className="text-gray-500">Loading</span>
        </div>;
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
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 -mt-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src={post?.coverImage || ""}
                                alt={post.title}
                                width={1600}
                                height={900}
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
                                <div dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />
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