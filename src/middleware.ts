import { NextRequest } from "next/server";

const anonymousOnlyPage = [
  "/login"
]

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("auth.session")
  const url = new URL(req.url)

  if (cookie) {
    // const parsed = JSON.parse(cookie.value)

    if (anonymousOnlyPage.includes(url.pathname)) {
      return Response.redirect(new URL("/", req.url))
    }
  }
}