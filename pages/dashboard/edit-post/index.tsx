import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import "../../app/globals.css";

// Mock categories
const categories = [
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "lifestyle", label: "Lifestyle" }
];

// Mock post data
const mockPost = {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2023",
    slug: "future-web-development-trends-2023",
    category: "technology",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the landscape of web development in the coming year.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nunc ultricies nunc, vitae ultricies nisl nunc eu nunc. Nullam euismod, nisl eget aliquam ultricies, nunc nunc ultricies nunc, vitae ultricies nisl nunc eu nunc.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    status: "published",
    date: "May 15, 2023"
};

const EditPost = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const router = useRouter();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        excerpt: "",
        content: "",
        coverImage: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be an API call to fetch the post by ID
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (id === mockPost.id.toString()) {
                setFormData({
                    title: mockPost.title,
                    slug: mockPost.slug,
                    category: mockPost.category,
                    excerpt: mockPost.excerpt,
                    content: mockPost.content,
                    coverImage: mockPost.coverImage
                });
            } else {
                // Post not found, redirect to posts list
                toast({
                    title: "Error",
                    description: "Post not found.",
                });
                router.push("/dashboard/posts");
            }
            setIsLoading(false);
        }, 500);
    }, [id, router, toast]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        // Auto-generate slug from title only if slug is empty or was auto-generated
        if (name === "title" && (!formData.slug || formData.slug === formData.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'))) {
            const slug = value
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');

            setFormData({
                ...formData,
                title: value,
                slug
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            category: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form
        if (!formData.title || !formData.category || !formData.content) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
            });
            setIsSubmitting(false);
            return;
        }

        // In a real app, this would be an API call to update the post
        setTimeout(() => {
            toast({
                title: "Success",
                description: "Post updated successfully!",
            });
            setIsSubmitting(false);
            router.push("/dashboard/posts");
        }, 1000);
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">Loading post data...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Edit Post</h2>
                    <p className="text-muted-foreground">Edit an existing blog post.</p>
                </div>
                <Button variant="outline" onClick={() => router.push("/dashboard/posts")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Posts
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Post Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter post title"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    placeholder="post-url-slug"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={handleSelectChange}
                                    required
                                >
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem
                                                key={category.value}
                                                value={category.value}
                                            >
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverImage">Cover Image URL</Label>
                                <Input
                                    id="coverImage"
                                    name="coverImage"
                                    value={formData.coverImage}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea
                                id="excerpt"
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleInputChange}
                                placeholder="Brief summary of the post"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content <span className="text-destructive">*</span></Label>
                            <Textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                placeholder="Write your post content here..."
                                rows={10}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t px-6 py-4">
                        <Button
                            variant="outline"
                            onClick={() => router.push("/dashboard/posts")}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                variant="outline"
                                disabled={isSubmitting}
                            >
                                Save as Draft
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Update Post
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default EditPost;