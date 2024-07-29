import Head from "next/head"
import { ReactNode } from "react"
import { User } from "@/types"
import { Navbar } from "./Navbar"
import { Toaster } from "react-hot-toast"

type Props = {
  title: string
  children: ReactNode
  user: User | null 
}

export function BaseLayout(props: Props) {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>{"Sandbox - " + props.title}</title>
      </Head>

      <Navbar user={props.user} />

      <main className="py-4">
        {props.children}
      </main>

      <Toaster position="bottom-center" />
    </div>
  )
}