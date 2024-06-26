import AccountCard from "@/app/components/Account/AccountCard";
import ActivityCard from "@/app/components/Activity/ActivityCard";
import { getActivitiesData } from "@/app/services/account.services";
import { ActivityDataTypes } from "@/app/types/account.types";
import { cookies } from "next/headers"
import Link from "next/link";

export default async function Dashboard() {

  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';

  const activitiesData: ActivityDataTypes[] = await getActivitiesData(accountId, token)

  return (
    <>
      <AccountCard token={token} />

      <div className="w-full flex justify-between p-8 border border-gray-500">
        <Link href={`/dashboard/accounts/${accountId}/transferences`}>Transferir dinero</Link>
        <Link href="/dashboard/services">Pagar servicios</Link>
      </div>

      <div className="w-full flex justify-between p-8 py-2 border border-gray-500">
        <input className="p-2" type="text" placeholder="Buscar en tu actividad" />
      </div>

      <div className="w-full flex flex-col p-8 border border-gray-500">
        <ActivityCard activities={activitiesData.slice(0, 4)} />
        <Link href={`/dashboard/accounts/${accountId}/activity?page=1`}>Ver +</Link>
      </div>
    </>

  )
}

const ActivityRow = ({ activity }: { activity: ActivityDataTypes }) => {
  return (
    <div className="w-full flex justify-between py-1">
      <span>{activity.description}</span>
      <span>{activity.amount}</span>
    </div>
  )
}