import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_KEY || "";

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === "GET") {
        const { data, error } = await supabase.from("categories").select("*");

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json(data);
    }
    if (req.method === "POST") {
        if (!req.body.category) {
            return res.status(400).json({ error: "Category is required" });
        }
        if ((await supabase.auth.getUser(req.headers["authorization"]?.replace("Bearer ", ""))).error !== null) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        supabase.functions.setAuth(req?.headers?.authorization?.replace("Bearer ", "") || "");

        if (req.body.category.length < 3) {
            return res.status(400).json({ error: "Category must be at least 3 characters" });
        }
        if (req.body.category.length > 20) {
            return res.status(400).json({ error: "Category must be less than 20 characters" });
        }
        const { data: existingCategories, error: existingCategoriesError } = await supabase
            .from("categories")
            .select("*")
            .eq("value", req.body.category.toLowerCase().replace(" ", "-"));

        if (existingCategoriesError) {
            return res.status(500).json(existingCategoriesError);
        }
        console.log(existingCategories, "existingCategories");
        if (existingCategories && existingCategories.length > 0) {
            return res.status(400).json({ error: "Category already exists" });
        }

        const { category } = req.body;
        const { data, error } = await supabase.from("categories").insert([{ label: category[0].toUpperCase() + category.slice(1).toLowerCase(), value: category.replace(" ", "-").toLowerCase() }]).select("*");

        if (error) {
            return res.status(500).json({ error: error });
        }
        return res.status(201).json(data);
    }
    if(req.method === "DELETE") {
        if (!req.body.category) {
            return res.status(400).json({ error: "Category is required" });
        }
        if ((await supabase.auth.getUser(req.headers["authorization"]?.replace("Bearer ", ""))).error !== null) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        supabase.functions.setAuth(req?.headers?.authorization?.replace("Bearer ", "") || "");

        const { category } = req.body;
        const { data, error } = await supabase.from("categories").delete().eq("value", category.replace(" ", "-").toLowerCase()).select("*");

        if (error) {
            return res.status(500).json({ error: error });
        }
        return res.status(200).json(data);
    }
    return res.status(405).json({ error: "Method not allowed" });

}