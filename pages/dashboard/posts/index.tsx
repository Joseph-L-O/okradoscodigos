import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Eye
} from "lucide-react";
import "../../../app/globals.css";
import DashboardLayout from "@/layouts/DashboardLayout";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  categorySlug: string;
  status: "published" | "draft";
  date: string;
  views: number;
}

// Mock posts data
const mockPosts: Post[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2023",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the landscape of web development in the coming year.",
    slug: "future-web-development-trends-2023",
    category: "Technology",
    categorySlug: "technology",
    status: "published",
    date: "May 15, 2023",
    views: 1502
  },
  {
    id: 2,
    title: "Minimalist Design Principles for Modern Interiors",
    excerpt: "Discover how the principles of minimalist design can transform your living space into a serene and functional environment.",
    slug: "minimalist-design-principles-modern-interiors",
    category: "Design",
    categorySlug: "design",
    status: "published",
    date: "May 10, 2023",
    views: 843
  },
  {
    id: 3,
    title: "Digital Detox: How to Create Healthy Tech Boundaries",
    excerpt: "Learn practical strategies for establishing boundaries with technology to improve your mental health and productivity.",
    slug: "digital-detox-healthy-tech-boundaries",
    category: "Lifestyle",
    categorySlug: "lifestyle",
    status: "published",
    date: "May 5, 2023",
    views: 1247
  },
  {
    id: 4,
    title: "Building Scalable Web Applications with Modern Architecture",
    excerpt: "An in-depth look at modern web architecture patterns that enable applications to scale efficiently.",
    slug: "scalable-web-applications-modern-architecture",
    category: "Technology",
    categorySlug: "technology",
    status: "published",
    date: "April 28, 2023",
    views: 987
  },
  {
    id: 5,
    title: "The Psychology of Color in User Interface Design",
    excerpt: "Understand how color choices in UI design affect user perception, emotions, and decision-making.",
    slug: "psychology-color-ui-design",
    category: "Design",
    categorySlug: "design",
    status: "published",
    date: "April 22, 2023",
    views: 621
  },
  {
    id: 6,
    title: "Sustainable Living: Small Changes with Big Impact",
    excerpt: "Discover simple, everyday changes you can make to live more sustainably and reduce your environmental footprint.",
    slug: "sustainable-living-small-changes-big-impact",
    category: "Lifestyle",
    categorySlug: "lifestyle",
    status: "draft",
    date: "April 15, 2023",
    views: 0
  }
];

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call to fetch posts
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeletePost = (id: number) => {
    // In a real app, this would be an API call to delete the post
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex gap-3">
      <DashboardLayout />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between md:items-center gap-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
            <p className="text-muted-foreground">Manage your blog posts here.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Link href="/dashboard/create-post">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        </div>

        <Card>

          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>
              {filteredPosts.length} posts found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Views</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <tr key={post.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 pr-4">
                          <div>
                            <Link href={`/dashboard/edit-post/${post.id}`} className="font-medium hover:underline">
                              {post.title}
                            </Link>
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                              {post.excerpt}
                            </p>
                          </div>
                        </td>
                        <td className="py-3">
                          <Link href={`/category/${post.categorySlug}`}>
                            <Badge variant="outline">{post.category}</Badge>
                          </Link>
                        </td>
                        <td className="py-3">
                          {post.status === "published" ? (
                            <Badge className="bg-green-500">Published</Badge>
                          ) : (
                            <Badge variant="outline">Draft</Badge>
                          )}
                        </td>
                        <td className="py-3">{post.date}</td>
                        <td className="py-3 text-right">{post.views}</td>
                        <td className="py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-amber-50" align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/${post.slug}`} className="flex items-center">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/edit-post/${post.id}`} className="flex items-center">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-muted-foreground">
                        No posts found. Try adjusting your search or create a new post.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Posts;
