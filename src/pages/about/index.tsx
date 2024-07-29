import { BaseLayout } from "@/components/layout/BaseLayout"
import { getSession, SessionProps } from "@/lib/auth/session"
export const getServerSideProps = getSession()

export default function AboutPage(props: SessionProps) {
  return (
    <BaseLayout user={props.user} title="About">
      <h1>Content of the about page</h1>
    </BaseLayout>
  )
}