import moment from "moment";
import type { ArticleItem } from "@/types";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const getAllArticles = async () => {
    const articlesData: Record<string, Record<string, ArticleItem>> = [{}] as unknown as Record<string, Record<string, ArticleItem>>;
    const allArticlesData: ArticleItem[] = [];

    Object.keys(articlesData).forEach((userId) => {
        const userArticles = articlesData[userId];
        Object.keys(userArticles).forEach(async (articleId) => {
            const article = userArticles[articleId];
            const { data, content } = matter(Buffer.from(article.content || ""));
            const processedContent = await remark().use(html).process(content);
            const contentHtml = processedContent.toString();
            allArticlesData.push({
                id: articleId,
                coverImage: data.coverImage,
                excerpt: data.excerpt,
                slug: data.slug,
                categorySlug: data.categorySlug,
                title: data.title,
                date: moment(data.createdAt).format("MMMM D, YYYY"),
                category: data.category || "Uncategorized",
                contentHtml: contentHtml || "",
                createdAt: article.createdAt,
            });
        });
    });

    return allArticlesData.sort((a, b) => {
        const dateOne = moment(a.date, "MMMM D, YYYY");
        const dateTwo = moment(b.date, "MMMM D, YYYY");
        if (dateOne.isBefore(dateTwo)) {
            return -1;
        }
        return 1;
    });
};