import { useState } from "react";
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
import { useRouter } from "next/navigation";
import "../../../app/globals.css";

// Mock categories
const categories = [
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "lifestyle", label: "Lifestyle" }
];

const CreatePost = () => {
    const { toast } = useToast();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        excerpt: "",
        content: "",
        coverImage: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        // Auto-generate slug from title
        if (name === "title") {
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

        // In a real app, this would be an API call to create the post
        setTimeout(() => {
            toast({
                title: "Success",
                description: "Post created successfully!",
            });
            setIsSubmitting(false);
            router.push("/dashboard/posts");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create Post</h2>
                    <p className="text-muted-foreground">Create a new blog post.</p>
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
                                Publish Post
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default CreatePost;