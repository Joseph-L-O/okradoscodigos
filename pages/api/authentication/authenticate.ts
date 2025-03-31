import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from '@supabase/supabase-js'


export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
  const supabase_url = process.env.SUPABASE_URL || "";
  const anon_key = process.env.SUPABASE_KEY || "";

  const supabase = createClient(supabase_url, anon_key)


  const user = req.body

  if (!user) {
    return res.status(400)
  }

  if (!user.email) {
    return res.status(400)
  }

  if (!user.password) {
    return res.status(400)
  }
  const { email, password } = user;
  const { data: { session: session }, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error)
    return res.status(400).json({ error: error.message })

  return res.status(200).json({ data: { access_token: session?.access_token, refresh_token: session?.refresh_token, expires_at: session?.expires_at } })
}
