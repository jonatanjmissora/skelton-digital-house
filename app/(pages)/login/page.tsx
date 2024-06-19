"use client"
import { login } from "@/app/services/auth.services"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {

const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const handleClick = async () => {
    setServerError(null)
    try {
      await login({ email: "jonatanjmissora@gmail.com", password: "654321" })
      console.log("Recibi los datos del swagger")
      router.push("/dashboard")
      router.refresh();
    }
    catch(e){
      setServerError(e.message)
    }
  }

  return (
    <article className="flex flex-col gap-4">
    <button onClick={handleClick} className="btn">Login</button>
    <p>{serverError}</p>
    </article>
  )
}
