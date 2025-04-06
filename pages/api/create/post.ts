import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

// create a new post in the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //verify if the user is authenticated
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

    const coverImage = await sharp(Buffer.from(req.body.coverImage, 'base64'))
        .resize(800, 600)
        .toFormat('jpg')
        .toBuffer()

    if (!coverImage) {
        return res.status(400).json({ error: 'Error processing image' })
    }

    // upload the image to supabase storage with authorization
    const { data: user } = await supabase.auth.getUser(req.headers.authorization.replace('Bearer ', ''))
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    supabase.functions.setAuth(req.headers.authorization.replace("Bearer ", ""))

    //veify if the image already exists
    if (!await supabase.storage.from('imgs').exists(`imgs/posts/${req.body.slug}.jpg`)) {
        const { error: uploadError } = await supabase.storage.from('imgs').upload(`imgs/posts/${req.body.slug}.jpg`, coverImage, {
            contentType: 'image/jpeg',
        })

        if (uploadError) {
            return res.status(500).json({ error: uploadError })
        }
    }

    const { data } = await supabase.storage.from("imgs").getPublicUrl(`imgs/posts/${req.body.slug}.jpg`)

    if (!data) {
        return res.status(500).json({ error: 'Error getting public url' })
    }
    if (!data.publicUrl) {
        return res.status(500).json({ error: 'Error getting public url' })
    }

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
    }

    const {error} = await supabase.from('posts').insert(post)

    if (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error creating post' })
    }

    res.status(200).json(post)
}