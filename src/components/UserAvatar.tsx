import { User } from "@/types"

type Props = {
  user: User | null
}

export function UserAvatar(props: Props) {
  return (
    <div className="text-xs my-auto border-b-2 border-transparent">
      {props.user && (
        <span>{props.user.email}</span>
      )}

      {props.user == null && (
        <span>[Anonymous]</span>
      )}
    </div>
  )
}