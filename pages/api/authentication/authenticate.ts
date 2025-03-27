import { NextResponse } from "next/server"
import { allowedEmails } from "./allowedEmails"
import { NextApiRequest } from "next"

export default async function Auth(req: NextApiRequest) {
  const request = req.body
  console.log(request)
  const user = request?.email || null
  
  if (!user) {
    return null
  }
  if (!allowedEmails.includes(user || "")) {
    return null
  }

  return NextResponse.json({data: user})
}
