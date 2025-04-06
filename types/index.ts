export type ArticleItem = {
    id: number | string;
    slug?: string;
    categorySlug?: string;
    excerpt?: string;
    coverImage?: string;
    excerpt: string;
    slug: string;
    categorySlug: string;
    title: string;
    date: string;
    category: string;
    contentHtml?: string;
    createdAt?: string;
    content?: string;
    readTime?: string;
};

export type Params = { params: { slug: string } }