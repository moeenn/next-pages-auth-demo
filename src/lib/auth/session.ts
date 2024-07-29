import { User } from "@/types"
import { GetServerSideProps } from "next"

export type SessionProps = {
  user: User | null
}

export const getSession: () => GetServerSideProps<SessionProps> = () => async (ctx) => {
  const cookie = ctx.req.cookies["auth.session"]
  if (!cookie) {
    return { props: { user: null }}
  }

  const user: User = JSON.parse(cookie)
  return { props: { user } }
}