"use client"
import { login } from "@/app/services/auth.services"
import { useRouter } from "next/navigation"

export default function Login() {

  const router = useRouter()

  const handleClick = async () => {
    await login({ firstname: "Jonatan", lastname: "Missora" })
    router.push("/dashboard")
    router.refresh();
  }

  return (
    <button onClick={handleClick} className="btn">Login</button>
  )
}
