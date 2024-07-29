import { User } from "@/types"
import Link from "next/link"
import { UserAvatar } from "../UserAvatar"
import { useAPI } from "@/lib/hooks/useAPI"
import { authLogoutRequest } from "@/lib/api-calls"
import { useRouter } from "next/router"
import classNames from "classnames"
import toast from "react-hot-toast"
import JSLogo from "@/assets/images/js-logo.png"
import Image from "next/image"

type Props = {
  user: User | null
}

function NavLink(props: { pathname: string; text: string; currentPath: string }) {
  return (
    <Link href={props.pathname} className={classNames("px-2 py-1 border-b-2 flex", {
      "border-red-600": props.pathname === props.currentPath,
      "border-transparent": props.pathname !== props.currentPath
    })}>
      <span className="my-auto">{props.text}</span>
    </Link>
  )
}

export function Navbar(props: Props) {
  const { request, call } = useAPI(authLogoutRequest)
  const router = useRouter()

  return (
    <nav className="flex justify-between">
      <Link href="/">
        <Image src={JSLogo} alt="logo" className="h-8 w-8" />
      </Link>

      <div className="text-xs flex space-x-4">
        <NavLink currentPath={router.pathname} pathname="/about" text="About" />

        {props.user == null && (
          <NavLink currentPath={router.pathname} pathname="/login" text="Login" />
        )}

        {props.user != null && (
          <>
            <span className="cursor-pointer my-auto border-b-2 border-transparent" onClick={() => {
              call({}).then(() => {
                router.push("/")
                toast.success("Logged-out successfully")
              })
                .catch(() => toast.error("Failed to logout"))
            }}>
              {request.loading && "Loading..."}
              {!request.loading && "Logout"}
            </span>

            <UserAvatar user={props.user} />
          </>
        )}
      </div>
    </nav>
  )
}