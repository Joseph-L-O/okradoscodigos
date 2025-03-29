import { database } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import moment from "moment";
import type { ArticleItem } from "@/types";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const getAllArticles = async () => {
    const articlesRef = ref(database, "articles");
    const snapshot = await get(articlesRef);

    if (!snapshot.exists()) {
        return [];
    }

    const articlesData: Record<string, Record<string, ArticleItem>> = snapshot.val();
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
export const getArticles = async (): Promise<ArticleItem[]> => {
    const articlesRef = ref(database, "articles");
    const snapshot = await get(articlesRef);

    if (!snapshot.exists()) {
        return [];
    }

    const articlesData: Record<string, Record<string, ArticleItem>> = snapshot.val();
    const allArticlesData: ArticleItem[] = [];

    Object.keys(articlesData).forEach((userId) => {
        const userArticles = articlesData[userId];
        Object.keys(userArticles).forEach(async (articleId) => {
            const article = userArticles[articleId];
            const { data } = matter(Buffer.from(article.content || ""));
            allArticlesData.push({
                id: articleId,
                title: data.title,
                date: moment(data.createdAt).format("MMMM D, YYYY"),
                category: data.category || "Uncategorized",
                contentHtml: "",
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
        if (dateTwo.isAfter(dateOne)) {
            return 1;
        }
        return 0;
    });
};

export const getCategoriesArticles = async (): Promise<Record<string, ArticleItem[]>> => {
    const sortedArticles = await getArticles();
    const categorisedArticles: Record<string, ArticleItem[]> = {};

    sortedArticles.forEach((article) => {
        if (!categorisedArticles[article.category]) {
            categorisedArticles[article.category] = [];
        }
        categorisedArticles[article.category].push(article);
    });

    return categorisedArticles;
};



export const getArticleData = async (id: string): Promise<ArticleItem | null> => {
    const articleRef = ref(database, `articles/${process.env.NEXT_PUBLIC_FIREBASE_USER_ID}/${id}`);
    const snapshot = await get(articleRef);



    if (!snapshot.exists()) {
        return null;
    }

    const article = snapshot.val();
    console.log(article)
    const { content } = matter(Buffer.from(article?.content || ""));
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        id,
        title: article.title,
        date: moment(article.createdAt).format("MMMM D, YYYY"),
        category: article.category || "Uncategorized",
        contentHtml: contentHtml,
    };
};