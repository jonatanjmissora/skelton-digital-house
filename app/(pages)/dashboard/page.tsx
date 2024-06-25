import { AccountDataTypes } from "@/app/api/accounts/RRRroute";
import AccountCard from "@/app/components/AccountCard";
import { getAccountData, getActivityData } from "@/app/services/account.services";
import { ActivityDataTypes } from "@/app/types/account.types";
import { cookies } from "next/headers"
import Link from "next/link";

export default async function Dashboard() {

  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';

  const activityData: ActivityDataTypes[] = await getActivityData(accountId, token)

  return (
    <>
      <AccountCard token={token} />

      <div className="w-full flex justify-between p-8 border border-gray-500">
        <Link href={`/dashboard/accounts/${accountId}/transferences`}>Transferir dinero</Link>
        <Link href="/dashboard/services">Pagar servicios</Link>
      </div>

      <div className="w-full flex justify-between p-8 border border-gray-500">
        <input className="p-2" type="text" placeholder="Buscar en tu actividad" />
      </div>

      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Actividad: </h2>
        {activityData.length === 0 && <span>No hay actividad</span>}
        <div className="my-2">
          {activityData.length !== 0 &&
            activityData.slice(0, 4).map(activity =>
              <ActivityRow key={activity.id} activity={activity} />
            )
          }
        </div>
        <Link href={`/dashboard/accounts/${accountId}/activity`}>Ver +</Link>
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