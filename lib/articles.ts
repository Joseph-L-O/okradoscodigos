import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import {remark} from "remark";
import html from "remark-html";

import type {ArticleItem} from "@/types";

const articlesDirectory = path.join(process.cwd(), "articles");

export const getArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const {data} = matter(fileContents);
        return {
            id,
            title: data.title,
            date: moment(data.date).format("MMMM D, YYYY"),
            category: data.category,
            contentHtml: data.content,
        };
    });
    return allArticlesData.sort((a, b) => {
        const format = "DD-MM-YYYY";
        const dateOne = moment(a.date, format);
        const dateTwo = moment(b.date, format);
        if(dateOne.isBefore(dateTwo)) {
            return -1;
        }
        if(dateTwo.isAfter(dateOne)) {
            return 1;
        }
        return 0;
    });
};

export const getCategoriesArticles = (): Record<string, ArticleItem[]> => {
    const sortedArticles = getArticles();
    const categorisedArticles: Record<string, ArticleItem[]> = {};
    sortedArticles.forEach((article) => {
        if(!categorisedArticles[article.category]) {
            categorisedArticles[article.category] = [];
        }
        categorisedArticles[article.category].push(article);
    });
    return categorisedArticles;
}

export const getArticleData = async (id: string): Promise<ArticleItem> => {
    const fullPath = path.join(articlesDirectory, `${decodeURI(id)}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const {data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    return {
        id,
        title: data.title,
        date: moment(data.date, "DD-MM-YYYY").format("MMMM D, YYYY"),
        category: data.category,
        contentHtml,
    };
};