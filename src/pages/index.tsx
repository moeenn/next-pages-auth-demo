import { BaseLayout } from "@/components/layout/BaseLayout";
import { getSession, SessionProps } from "@/lib/auth/session";
export const getServerSideProps = getSession()

export default function HomePage(props: SessionProps) {
  return (
    <BaseLayout title="Home" user={props.user}>
      <h1>Content of the home page</h1>
    </BaseLayout>
  )
} 
