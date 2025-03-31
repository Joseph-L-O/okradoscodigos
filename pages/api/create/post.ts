import { NextApiRequest, NextApiResponse } from "next"

// create a new post in the database
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    //verify if the user is authenticated
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    if (!req.body) {
        return res.status(400).json({ error: 'No data' })
    }
    if (!req.body.title || !req.body.content || !req.body.slug || !req.body.category) {
        return res.status(400).json({ error: 'Missing title or content' })
    }

    const post = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        status: 'draft',
        date: new Date().toLocaleDateString(),
        views: 0,
        slug: req.body.slug,
        author: req.body.user.name,
    } 



    res.status(200).json(post)
}