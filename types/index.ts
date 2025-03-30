export type ArticleItem = {
    id: string;
    coverImage?: string;
    excerpt: string;
    slug: string;
    categorySlug: string;
    title: string;
    date: string;
    category: string;
    contentHtml: string;
    createdAt?: string;
    content?: string;
};

export type Params = { params: { slug: string } }