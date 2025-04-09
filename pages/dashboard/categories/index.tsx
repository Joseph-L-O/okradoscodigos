import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
    Plus,
    MoreHorizontal,
    Edit,
    Trash,
    Eye
} from "lucide-react";
import "../../../app/globals.css";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    postCount: number;
}

// Mock categories data
const mockCategories: Category[] = [
    {
        id: 1,
        name: "Technology",
        slug: "technology",
        description: "The latest in tech trends, innovations, and digital transformation.",
        postCount: 8
    },
    {
        id: 2,
        name: "Design",
        slug: "design",
        description: "Insights on UI/UX, graphic design, and creative processes.",
        postCount: 5
    },
    {
        id: 3,
        name: "Lifestyle",
        slug: "lifestyle",
        description: "Tips for well-being, productivity, and balanced living.",
        postCount: 7
    }
];

const Categories = () => {
    const { toast } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        slug: "",
        description: ""
    });

    useEffect(() => {
        // In a real app, this would be an API call to fetch categories
        setCategories(mockCategories);
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        // Auto-generate slug from name
        if (name === "name") {
            const slug = value
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');

            setFormData({
                ...formData,
                name: value,
                slug
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleOpenCreateDialog = () => {
        setFormData({
            id: 0,
            name: "",
            slug: "",
            description: ""
        });
        setIsEditing(false);
        setIsOpen(true);
    };

    const handleOpenEditDialog = (category: Category) => {
        setFormData({
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description
        });
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.name) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
            });
            return;
        }

        if (isEditing) {
            // Update existing category
            const updatedCategories = categories.map(cat =>
                cat.id === formData.id
                    ? { ...cat, name: formData.name, slug: formData.slug, description: formData.description }
                    : cat
            );
            setCategories(updatedCategories);
            toast({
                title: "Success",
                description: "Category updated successfully!"
            });
        } else {
            // Create new category
            const newCategory: Category = {
                id: Math.max(0, ...categories.map(c => c.id)) + 1,
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                postCount: 0
            };
            setCategories([...categories, newCategory]);
            toast({
                title: "Success",
                description: "Category created successfully!"
            });
        }

        setIsOpen(false);
    };

    const handleDeleteCategory = (id: number) => {
        // In a real app, this would be an API call to delete the category
        setCategories(categories.filter(cat => cat.id !== id));
        toast({
            title: "Success",
            description: "Category deleted successfully!"
        });
    };

    return (
        <AuthGuard requireAuth={true}>
            <div className="min-h-screen bg-gray-50 flex gap-3">
                <DashboardLayout />
                <div className="container mx-auto px-4 py-8 flex-1">

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
                            <p className="text-muted-foreground">Manage your blog categories.</p>
                        </div>
                        <Button onClick={handleOpenCreateDialog}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Category
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>All Categories</CardTitle>
                            <CardDescription>
                                {categories.length} categories found
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="pb-3 font-medium">Name</th>
                                            <th className="pb-3 font-medium">Slug</th>
                                            <th className="pb-3 font-medium">Description</th>
                                            <th className="pb-3 font-medium text-right">Posts</th>
                                            <th className="pb-3 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.length > 0 ? (
                                            categories.map(category => (
                                                <tr key={category.id} className="border-b hover:bg-muted/50">
                                                    <td className="py-3 pr-4 font-medium">
                                                        {category.name}
                                                    </td>
                                                    <td className="py-3">
                                                        <Badge variant="outline">{category.slug}</Badge>
                                                    </td>
                                                    <td className="py-3 max-w-xs">
                                                        <p className="text-sm text-muted-foreground truncate">
                                                            {category.description}
                                                        </p>
                                                    </td>
                                                    <td className="py-3 text-right">{category.postCount}</td>
                                                    <td className="py-3 text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Actions</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="bg-amber-50">
                                                                <DropdownMenuItem asChild>
                                                                    <a href={`/category/${category.slug}`} target="_blank" rel="noreferrer" className="flex items-center">
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View
                                                                    </a>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleOpenEditDialog(category)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="text-destructive focus:text-destructive"
                                                                    onClick={() => handleDeleteCategory(category.id)}
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
                                                <td colSpan={5} className="py-6 text-center text-muted-foreground">
                                                    No categories found. Create a new category to get started.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Create/Edit Category Dialog */}
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent className="bg-amber-50">
                            <DialogHeader>
                                <DialogTitle>
                                    {isEditing ? "Edit Category" : "Create Category"}
                                </DialogTitle>
                                <DialogDescription>
                                    {isEditing
                                        ? "Update the category details below."
                                        : "Fill in the details below to create a new category."}
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Category name"
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
                                            placeholder="category-slug"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Brief description of the category"
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        {isEditing ? "Update Category" : "Create Category"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AuthGuard>
    );
};

export default Categories;