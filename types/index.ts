export type ArticleItem = {
    id: string;
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
    readTime?: string;
};

export type Params = { params: { slug: string } }