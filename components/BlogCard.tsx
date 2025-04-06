import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ArticleItem } from "@/types";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
}

interface BlogCardProps {
  post: ArticleItem;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-md ${featured ? 'h-full' : ''}`}>
      <Link href={`/blogpost/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image 
            src={post.coverImage || 'https://dummyimage.com/800x450/000/fff'} 
            alt={post.title}  
            width={featured ? 800 : 400}
            height={featured ? 450 : 225}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      <CardContent className={`p-5 ${featured ? 'space-y-4' : 'space-y-3'}`}>
        <div>
          <Link href={`/category/${post.category}`}>
            <Badge variant="outline" className="text-[#0ea5e9] border-[#0ea5e9] hover:bg-[#0ea5e9]/10">
              {post.category}
            </Badge>
          </Link>
        </div>
        <Link href={`/blogpost/${post.slug}`}>
          <h3 className={`font-semibold text-[#0f172a] hover:text-[#0ea5e9] transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
            {post.title}
          </h3>
        </Link>
        <p className="text-blog-[#334155]">
          {post.excerpt?.slice(0, 100)}
        </p>
      </CardContent>
      <CardFooter className="px-5 py-4 text-sm text-muted-foreground border-t flex justify-between">
        <span>{post.date}</span>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;