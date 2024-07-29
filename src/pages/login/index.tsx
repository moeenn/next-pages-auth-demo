import { BaseLayout } from "@/components/layout/BaseLayout";
import { authLoginRequest } from "@/lib/api-calls";
import { useAPI } from "@/lib/hooks/useAPI";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function LoginPage() {
  const {request, call} = useAPI(authLoginRequest)
  const router = useRouter()

  return (
    <BaseLayout title="Login" user={null}>
      <button 
        className="text-xs px-4 py-1 bg-slate-100 hover:bg-slate-200 rounded"
        onClick={() => {
          call({}).then(() => {
            toast.success("Login successful")
            router.push("/")
          })
          .catch(() => toast.error("Failed to login"))
        }}
      >
        {request.loading && "Loading..."}
        {!request.loading && "Login"}
      </button>
    </BaseLayout>
  )
}