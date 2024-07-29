import { serialize } from "cookie";
import { User } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "node:crypto"

const dummyUser: User = {
  id: crypto.randomUUID(),
  email: "admin@site.com",
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize('auth.session', JSON.stringify(dummyUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 1, // One day
    path: '/',
  })
  res.setHeader('Set-Cookie', cookie)
  return res.json({ success: true, user: dummyUser })
}