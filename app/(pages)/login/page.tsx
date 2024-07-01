"use client"
import SVGSpinner from "@/app/components/SVG/SVGSpinner"
import { login } from "@/app/services/auth.services"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {

  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const email = event.currentTarget.email.value;
      const password = event.currentTarget.password.value;
      setServerError(null)
      const resp = await login({ email, password })
      console.log("Recibi respuesta del swagger")
      if (resp.token) {
        router.push("/dashboard")
        router.refresh();
      }
      else throw new Error(resp.error)

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        setServerError(error.message)
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="flex flex-col gap-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
        <input className="border border-gray-500 p-2 text-center" type="text" placeholder="email" name="email" defaultValue={"jonatanjmissora1@gmail.com"} required />
        <input className="border border-gray-500 p-2 text-center" type="password" placeholder="password" name="password" defaultValue={"123qQ*"} required />
        <button type="submit" className="btn flex justify-center" disabled={isLoading}>
          {isLoading ? <SVGSpinner /> : "Continuar"}
        </button>
      </form>
      <p>{serverError}</p>
    </article>
  )
}
