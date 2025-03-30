export type ArticleItem = {
    id: number;
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
    readTime?: string;
};