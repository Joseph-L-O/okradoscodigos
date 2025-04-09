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
import Loading from "@/components/Loading";
import Head from "next/head";

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
        return <Loading />
    }

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* imageitems                 */}
                <meta name="og:title" content={post.title} />
                <meta property="og:image" content={post?.coverImage || ""} />
                <meta name="twitter:image" content={post?.coverImage || ""} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <div className="min-h-screen flex flex-col">
                <HeaderNav />

                <main className="flex-1">
                    <section className="bg-[#0f172a] text-white py-16">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto text-center">
                                <Link href={`/categorias?category=${post.category}`}>
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
        </>
    );
};

export default BlogPost;