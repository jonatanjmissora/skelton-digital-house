import { getUserData } from "@/app/services/user.services"
import { cookies, headers } from "next/headers"

export default async function Dashboard() {

  const token = cookies().get('token')?.value ?? '';
  await getUserData(token)
  //const user = await userData.json()
  //const accountData = await getAccountData()

  return (
    <>
    <h1 className="text-2xl">Dashboard</h1>
    {/*JSON.stringify(user, null, 2)*/}
    </>
  )
}
