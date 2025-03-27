import { allowedEmails } from "./allowedEmails"
import { NextApiRequest, NextApiResponse } from "next"

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
  const request = req.body
  const user = request?.email || null
  
  if (!user) {
    return res.status(400)
  }
  if (!allowedEmails.includes(user || "")) {
    return res.status(403).json({error: "Not allowed"})
  }

  return res.status(200).json({isAllowed: true})
}
