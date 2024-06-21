"use client"
import { login } from "@/app/services/auth.services"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {

const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    setServerError(null)
    try {
      await login({ email, password})
      console.log("Recibi los datos del swagger")
      router.push("/dashboard")
      router.refresh();
    }
    catch(e){
      if(e instanceof Error)
      setServerError(e.message)
    }
  }

  return (
    <article className="flex flex-col gap-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
          <input className="border border-gray-500 p-2 text-center"  type="text" placeholder="email" name="email" defaultValue={"jonatanjmissora@gmail.com"} required/>
          <input className="border border-gray-500 p-2 text-center"  type="text" placeholder="password" name="password" defaultValue={654321} required/>
        <button type="submit"  className="btn">Continuar</button>
      </form>
    <p>{serverError}</p>
    </article>
  )
}
