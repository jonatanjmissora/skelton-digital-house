import { AccountDataTypes } from "@/app/api/accounts/RRRroute";
import { getAccountData, getActivityData } from "@/app/services/account.services";
import { ActivityDataTypes } from "@/app/types/account.types";
import { cookies } from "next/headers"
import Link from "next/link";

export default async function Dashboard() {

  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';

  const accountDataPromise: Promise<AccountDataTypes> = await getAccountData(token)
  const activityDataPromise: Promise<ActivityDataTypes[]> = await getActivityData(accountId, token)

  const [accountData, activityData] = await Promise.all([accountDataPromise, activityDataPromise])
  if(!accountData || !activityData) return <>No hay datos</>

  return (
    <>
      <div className="w-full flex justify-between p-8 border border-gray-500">
        <span>$ {accountData.available_amount}</span>
        <Link href={`/dashboard/accounts/${accountId}/cards`}>tarjetas</Link>
        <Link href="/dashboard/profile">CVU</Link>
      </div>

      <div className="w-full flex justify-between p-8 border border-gray-500">
        <Link href={`/dashboard/accounts/${accountId}/transferences`}>Transferir dinero</Link>
        <Link href="/dashboard/services">Pagar servicios</Link>
      </div>

      <div className="w-full flex justify-between p-8 border border-gray-500">Buscar actividad</div>

      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Actividad: </h2>
        {activityData.length === 0 && <span>No hay actividad</span>}
        {activityData.length !== 0 &&
          activityData.map(activity =>
            <ActivityRow key={activity.id} activity={activity} />
          )
        }
      </div>
    </>

  )
}

const ActivityRow = ({ activity }: { activity: ActivityDataTypes }) => {
  return (
    <div className="w-full flex justify-between">
      <span>{activity.description}</span>
      <span>{activity.amount}</span>
    </div>
  )
}