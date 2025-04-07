import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

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
        }else if(req.query.search){
            const { data, error } = await supabase.from("posts")
            .select("*")
            .ilike("title", `%${req.query.search}%`)
            .limit(5);
            if (error) {
                return res.status(500).json({ error: error });
            }
            console.log(data);
            return res.status(200).json({ data });
        }else{
            const { data, error } = await supabase.from("posts")
            .select("*")
            .limit(5);
            if (error) {
                return res.status(500).json({ error: error });
            }
            return res.status(200).json({ data });
        }
    }
}