import { fetchJSON } from "@/lib/helpers/fetch"
import { User } from "@/types"

type AuthLoginResponse = {
  success: boolean
  user: User
}

export async function authLoginRequest(): Promise<AuthLoginResponse> {
  const url = "/api/auth/login"
  return await fetchJSON(url, { method: "GET" })
}

type AuthLogoutResponse = {
  message: string
}

export async function authLogoutRequest(): Promise<AuthLogoutResponse> {
  const url = "/api/auth/logout"
  return await fetchJSON(url, { method: "GET" })
}