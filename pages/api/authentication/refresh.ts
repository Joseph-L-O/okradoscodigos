import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function useRefresh(req: NextApiRequest, res: NextApiResponse) {
    const supabase_url = process.env.SUPABASE_URL || "";
    const anon_key = process.env.SUPABASE_KEY || "";

    const supabase = createClient(supabase_url, anon_key)
    if (!req.body.refresh_token) {
        return res.status(400).json({ error: "No refresh token" });
    }
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "No authorization header" });
    }
    console.log()
    if ((await supabase.auth.getUser(req.headers.authorization.split(" ")[1])).error !== null) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const { data: { session }, error } = await supabase.auth.refreshSession({ refresh_token: req.body.refresh_token })

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    if (!session) {
        return res.status(400).json({ error: "No session" });
    }

    res.status(200).json({ data: { refresh_token: session.refresh_token, expires_at: session.expires_at, access_token: session.access_token } });

}