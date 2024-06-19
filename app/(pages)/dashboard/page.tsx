import { getUserData } from "@/app/services/user.services"
import { cookies, headers } from "next/headers"

export default async function Dashboard() {

  const token = cookies().get('token')?.value ?? '';
  const userId = cookies().get('userid')?.value ?? '';

  const userData = await getUserData(token, userId)

  return (
    <>
      <h1 className="text-2xl">Dashboard</h1>
      {JSON.stringify(userData, null, 2)}
    </>
  )
}
