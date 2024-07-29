import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize('auth.session', JSON.stringify(null), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // immediate expiry
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
  return res.json({ message: "User logged-out successfully"})
}