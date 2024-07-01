import AccountCard from "@/app/components/Account/AccountCard";
import ActivityCard from "@/app/components/Activity/ActivityCard";
import ActivitySearch from "@/app/components/Activity/ActivitySearch";
import { getActivitiesData } from "@/app/services/account.services";
import { getCookies } from "@/app/services/getCookies.services";
import { ActivityDataTypes } from "@/app/types/account.types";
import { getActualActivities } from "@/app/utils/getActualActivities";
import Link from "next/link";
import { Suspense } from "react";

export default async function Dashboard({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  const { token, accountId } = getCookies()
  const search = searchParams.search ?? ""

  const activitiesData: ActivityDataTypes[] = await getActivitiesData(accountId, token)
  const filteredActivities = getActualActivities(activitiesData, undefined, search.toString())
  const activitiesToShow = filteredActivities.slice(0, 4)

  return (
    <>
      <AccountCard token={token} />

      <div className="w-full flex justify-between p-8 border border-gray-500">
        <Link href={`/dashboard/accounts/${accountId}/transferences`}>Transferir dinero</Link>
        <Link href="/dashboard/services">Pagar servicios</Link>
      </div>

      <div className="w-full flex flex-col justify-between p-8 py-2 border border-gray-500">
        <ActivitySearch />
        {/*<input className="p-2" type="text" placeholder="Buscar en tu actividad" />*/}
      </div>

      <div className="card">
        <Suspense key={`${search}`} fallback={"LOADING"}>
          <ActivityCard activities={activitiesToShow} />
        </Suspense>
        {/*<ActivityCard activities={activitiesData.slice(0, 4)} />*/}
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