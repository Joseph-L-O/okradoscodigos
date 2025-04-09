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
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/DashboardLayout";
import Image from "next/image";
import AuthGuard from "@/components/AuthGuard";
import Loading from "@/components/Loading";


type FormData = {
    id?: string;
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

const EditPost = () => {
    const router = useRouter();
    const postSlug = usePathname();

    const [categories, setCategories] = useState<{ label: string, value: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCoverImageChanged, setIsCoverImageChanged] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        id: "",
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

    useEffect(() => {
        fetch("/api/categories", { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then((res) => res.json())
            .then((data) => setCategories(data))
    }, []);

    useEffect(() => {
        if (postSlug) {
            setIsLoading(true);
            fetch(`/api/posts?slug=${postSlug.replace("/dashboard/edit-post/", "")}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(async (res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data) {
                        setFormData(data.data);
                        setIsLoading(false);
                    }
                })
        } else {
            setIsLoading(false);
        }
    }, [postSlug, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.title || !formData.category || !formData.content || !formData.slug || !formData.excerpt) {
            setIsSubmitting(false);
            return;
        }

        fetch(`/api/posts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                ...formData,
                coverImage: isCoverImageChanged ? formData.coverImage : "",
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setIsSubmitting(false);
            })
    };

    if (isLoading) {
        return (
            <AuthGuard requireAuth={true}>
                <Loading />
            </AuthGuard>
        );
    }

    return (
        <AuthGuard requireAuth={true}>
            <div className="min-h-screen bg-gray-50 flex gap-3">
                <DashboardLayout />
                <div className="container mx-auto px-4 py-8 max-h-[100vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Edit Post</h2>
                            <p className="text-muted-foreground">Edit the details of the blog post.</p>
                        </div>
                        <Button variant="outline" onClick={() => router.push("/dashboard/posts")} disabled={isSubmitting}>
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
                                            value={formData?.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Enter post title"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="slug"
                                            name="slug"
                                            value={formData?.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            placeholder="post-url-slug"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                                        <Select
                                            name="category"
                                            value={formData?.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="w-64 bg-white">
                                                {categories.length > 0 ? categories.map((category) => (
                                                    <SelectItem
                                                        className="cursor-pointer hover:bg-gray-100"
                                                        key={category.value}
                                                        value={category.value}
                                                    >
                                                        {category.label}
                                                    </SelectItem>
                                                )) : <SelectItem value="loading" disabled>Loading categories...</SelectItem>}
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
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, coverImage: reader.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                                setIsCoverImageChanged(true);
                                            }
                                        }}
                                        placeholder="Upload cover image"
                                        disabled={isSubmitting}
                                    />
                                    {formData?.coverImage && (
                                        <div className="mt-2">
                                            <p className="text-sm text-muted-foreground mb-1">Current Image Preview:</p>
                                            <Image
                                                src={formData?.coverImage && formData?.coverImage}
                                                alt="Cover Preview"
                                                width={500}
                                                height={300}
                                                className="h-auto w-full max-w-md object-cover rounded-md border"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt <span className="text-destructive">*</span></Label>
                                    <Textarea
                                        id="excerpt"
                                        name="excerpt"
                                        value={formData?.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        placeholder="Brief summary of the post"
                                        rows={3}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content <span className="text-destructive">*</span></Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        value={formData?.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Write your post content here..."
                                        rows={10}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <Input
                                        id="tags"
                                        name="tags"
                                        value={formData?.tags?.join(", ")}
                                        onChange={(e) => {
                                            const tags = e.target.value.split(",").map(tag => tag.trim()).filter(Boolean);
                                            setFormData(prev => ({ ...prev, tags }));
                                        }}
                                        placeholder="Enter tags separated by commas"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t px-6 py-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/dashboard/posts")}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 text-white hover:bg-blue-700"
                                        disabled={isSubmitting || isLoading}
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Save className="mr-2 h-4 w-4" />
                                        )}
                                        {isSubmitting ? "Saving..." : "Update Post"}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </AuthGuard>
    );
};

export default EditPost;