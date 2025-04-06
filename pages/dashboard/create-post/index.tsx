import { useEffect, useState } from "react";
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
import DashboardLayout from "@/layouts/DashboardLayout";
import Image from "next/image";



type FormData = {
    slug?: string;
    categorySlug?: string;
    excerpt?: string;
    coverImage?: string;
    title: string;
    date: string;
    category: string;
    contentHtml?: string;
    createdAt?: string;
    content?: string;
    tags?: string[];
    author?: string;
};

const CreatePost = () => {
    const { toast } = useToast();
    const router = useRouter();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);


    const [formData, setFormData] = useState<FormData>({
        title: "",
        slug: "",
        category: "",
        excerpt: "",
        coverImage: "",
        content: "",
        date: new Date().toISOString(),
        categorySlug: "",
        author: "Joseph",
        tags: [],
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
        } else if (name === "category") {
            const categorySlug = value
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');

            setFormData({
                ...formData,
                category: value,
                categorySlug
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
        if (!formData.title || !formData.category || !formData.content || !formData.slug || !formData.excerpt || !formData.coverImage) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
            });
            setIsSubmitting(false);
            return;
        }

        // In a real app, this would be an API call to create the post
        console.log("Creating post...", formData);

        fetch("/api/create/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                ...formData,
                contentHtml: formData.content,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    toast({
                        title: "Error",
                        description: data.error,
                    });
                    setIsSubmitting(false);
                    return;
                }
                toast({
                    title: "Success",
                    description: "Post created successfully.",
                });
                setIsSubmitting(false);
                router.push("/dashboard/posts");
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: error.message,
                });
                setIsSubmitting(false);
            })

    };

    return (

        <div className="min-h-screen bg-gray-50 flex gap-3">
            <DashboardLayout />
            <div className="container mx-auto px-4 py-8 max-h-[100vh] overflow-y-auto">
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
                                    <Label htmlFor="title">Title <span className="text-[red]">*</span></Label>
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
                                    <Label htmlFor="slug">Slug <span className="text-[red]">*</span></Label>
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
                                    <Label htmlFor="category">Category <span className="text-[red]">*</span></Label>
                                    {/* create a writable select component */}
                                    <Select
                                        name="category"
                                        onValueChange={handleSelectChange}
                                        defaultValue={formData.category}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent className="w-64 bg-white">
                                            {categories.map((category: { label: string, value: string }) => (
                                                <SelectItem
                                                    className="cursor-pointer hover:bg-gray-100"
                                                    key={category?.value}
                                                    value={category.value}
                                                >
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="coverImage">Cover Image</Label>
                                <Input
                                    type="file"
                                    id="coverImage"
                                    name="coverImage"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            file.arrayBuffer().then((buffer) => {
                                                const base64String = btoa(
                                                    new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
                                                );
                                                setFormData({
                                                    ...formData,
                                                    coverImage: base64String
                                                });
                                            })
                                        }
                                    }}
                                    placeholder="Upload cover image"
                                />
                                {formData.coverImage && (
                                    <Image
                                        src={`data:image/jpeg;base64,${formData.coverImage}`}
                                        alt="Cover Preview"
                                        width={500}
                                        height={300}
                                        className="mt-2 h-full w-full object-cover rounded-md"
                                    />
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt <span className="text-[red]">*</span></Label>
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
                                <Label htmlFor="content">Content <span className="text-[red]">*</span></Label>
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
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    value={formData.tags?.join(", ")}
                                    onChange={(e) => {
                                        const tags = e.target.value.split(",").map(tag => tag.trim());
                                        setFormData({
                                            ...formData,
                                            tags
                                        });
                                    }}
                                    placeholder="Enter tags separated by commas"
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
                                    className="bg-blue-600 text-white hover:bg-blue-700"
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
        </div>
    );
};

export default CreatePost;