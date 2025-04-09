import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import { remark } from "remark";
import remarkHtml from "remark-html";
import sharp from "sharp";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const supabaseUrl = process.env.SUPABASE_URL || "";
        const supabaseKey = process.env.SUPABASE_KEY || "";

        const supabase = createClient(supabaseUrl, supabaseKey);

        if (req.query.slug) {


            const { data, error } = await supabase.from("posts")
                .select("*")
                .eq("slug", req.query.slug);

            if (error) {
                return res.status(500).json({ error: error });
            }

            if (data.length === 0) {
                return res.status(404).json({ error: "Post not found" });
            }
            const { data: relatedPosts, error: relatedPostsError } = await supabase.from("posts")
                .select("*")
                .eq("category", data[0].category)
                .neq("slug", req.query.slug)
                .limit(3);

            if (relatedPostsError) {
                return res.status(500).json({ error: relatedPostsError });
            }
            if (relatedPosts.length === 0) {
                return res.status(404).json({ error: "No related posts found" });
            }

            return res.status(200).json({ data: data[0], relatedPosts });
        } else if (req.query.search) {
            const { data, error } = await supabase.from("posts")
                .select("*")
                .ilike("title", `%${req.query.search}%`)
                .limit(5);
            if (error) {
                return res.status(500).json({ error: error });
            }
            console.log(data);
            return res.status(200).json({ data });
        } else if (req.query.id) {
            const { data, error } = await supabase.from("posts")
                .select("*")
                .eq("id", req.query.id);
            if (error) {
                return res.status(500).json({ error: error });
            }
            if (data.length === 0) {
                return res.status(404).json({ error: "Post not found" });
            }
            return res.status(200).json({ data: data[0] });
        } else {
            const { data, error } = await supabase.from("posts")
                .select("*")
                .limit(10);
            if (error) {
                return res.status(500).json({ error: error });
            }
            return res.status(200).json({ data });
        }
    } if (req.method === "POST") {
        const supabase_url = process.env.SUPABASE_URL || "";
        const anon_key = process.env.SUPABASE_KEY || "";

        const supabase = createClient(supabase_url, anon_key)

        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' })
        }
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        if ((await supabase.auth.getUser(req.headers.authorization.replace('Bearer ', ''))).error !== null) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        if (!req.body) {
            return res.status(400).json({ error: 'No data' })
        }
        if (!req.body.title || !req.body.content || !req.body.slug || !req.body.category) {
            return res.status(400).json({ error: 'Missing title or content' })
        }
        if (!req.body.author) {
            return res.status(400).json({ error: 'Missing author' })
        }
        if (!req.body.category) {
            return res.status(400).json({ error: 'Missing category' })
        }

        const coverImage = await sharp(Buffer.from(`${req.body.coverImage}`.replace(/^data:image\/\w+;base64,/, ''), 'base64'))
            .resize(800, 600,
                {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true,
                }
            )
            .toFormat('jpg')
            .toBuffer()

        if (!coverImage) {
            return res.status(400).json({ error: 'Error processing image' })
        }
        supabase.functions.setAuth(req.headers.authorization.replace("Bearer ", ""))

        //veify if the image already exists
        if (!(await supabase.storage.from('imgs').exists(`posts/${req.body.slug}.jpg`))?.data.valueOf()) {
            const { error: uploadError } = await supabase.storage.from('imgs').upload(`posts/${req.body.slug}.jpg`, coverImage, {
                contentType: 'image/jpeg',
            })
            if (uploadError) {
                return res.status(500).json({ error: uploadError })
            }
        }

        const { data } = await supabase.storage.from("imgs").getPublicUrl(`posts/${req.body.slug}.jpg`)

        if (!data) {
            return res.status(500).json({ error: 'Error getting public url' })
        }
        if (!data.publicUrl) {
            return res.status(500).json({ error: 'Error getting public url' })
        }

        const { content } = matter(Buffer.from(req.body.content || ""));
        const contentHtml = await remark().use(remarkHtml).process(content);
        const post = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            categorySlug: req.body.categorySlug,
            excerpt: req.body.excerpt || null,
            status: 'published',
            date: new Date().toLocaleDateString(),
            slug: req.body.slug,
            author: req.body.author,
            tags: req.body.tags || [],
            coverImage: data.publicUrl,
            contentHtml: contentHtml.toString() || "",
        }

        const { error } = await supabase.from('posts').insert(post)

        if (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error creating post' })
        }

        res.status(200).json(post)
    } if (req.method === "PUT") {
        const supabaseUrl = process.env.SUPABASE_URL || "";
        const supabaseKey = process.env.SUPABASE_KEY || "";
        const supabase = createClient(supabaseUrl, supabaseKey);

        if (!req.body.slug) {
            return res.status(400).json({ error: "Missing slug" });
        }
        if (!req.body.title) {
            return res.status(400).json({ error: "Missing views" });
        }
        if (!req.body.content) {
            return res.status(400).json({ error: "Missing content" });
        }
        if (req.body.coverImage !== "") {
            const coverImage = await sharp(Buffer.from(`${req.body.coverImage}`.replace(/^data:image\/\w+;base64,/, ''), 'base64'))
                .resize(800, 600,
                    {
                        fit: sharp.fit.inside,
                        withoutEnlargement: true,
                    }
                )
                .toFormat('jpg')
                .toBuffer()

            if (!coverImage) {
                return res.status(400).json({ error: 'Error processing image' })
            }
            supabase.functions.setAuth(req.headers.authorization?.replace("Bearer ", "") || "")
            const { data: prevImage, error: prevImageError } = await supabase.storage.from('imgs').remove([`posts/${req.body.slug}.jpg`])
            if (prevImageError) {
                return res.status(500).json({ error: prevImageError })
            }

            if (!prevImage) {
                return res.status(500).json({ error: 'Error deleting image' })
            }

            const { error: uploadError } = await supabase.storage.from('imgs').upload(`posts/${req.body.slug}.jpg`, coverImage, {
                contentType: 'image/jpeg',
            })
            if (uploadError) {
                return res.status(500).json({ error: uploadError })
            }
        }
        const { data: dataUrl } = supabase.storage.from("imgs").getPublicUrl(`posts/${req.body.slug}.jpg`)
        if (!dataUrl) {
            return res.status(500).json({ error: 'Error getting public url' })
        }
        if (!dataUrl.publicUrl) {
            return res.status(500).json({ error: 'Error getting public url' })
        }
        const { content } = matter(Buffer.from(req.body.content || ""));
        const contentHtml = await remark().use(remarkHtml).process(content);
        const { data, error } = await supabase.from("posts")
            .update({
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags || [],
                slug: req.body.slug,
                author: req.body.author,
                contentHtml: contentHtml.toString() || "",
                category: req.body.category,
                categorySlug: req.body.categorySlug,
                excerpt: req.body.excerpt || null,
                status: req.body.status,
                coverImage: req.body.coverImage !== "" ? req.body.coverImage : dataUrl.publicUrl,
            })
            .eq("id", req.body.id);
        console.log(data, error)
        if (error) {
            return res.status(500).json({ error: error });
        }
        res.status(200).json(data);
    } else if (req.method === "DELETE") {
        const supabaseUrl = process.env.SUPABASE_URL || "";
        const supabaseKey = process.env.SUPABASE_KEY || "";
        const supabase = createClient(supabaseUrl, supabaseKey);
        if (!req.body.slug) {
            return res.status(400).json({ error: "Missing slug" });
        }
        supabase.functions.setAuth(req.headers.authorization?.replace("Bearer ", "") || "")
        const { data: prevImage, error: prevImageError } = await supabase.storage.from('imgs').remove([`posts/${req.body.slug}.jpg`])
        if (prevImageError) {
            return res.status(500).json({ error: prevImageError })
        }
        if (!prevImage) {
            return res.status(500).json({ error: 'Error deleting image' })
        }
        const { data, error } = await supabase.from("posts")
            .delete()
            .eq("slug", req.body.slug);
        if (error) {
            return res.status(500).json({ error: error });
        }
        res.status(200).json(data);
    }
}