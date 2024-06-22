import { ActivityDataTypes, getActivityData } from '@/app/services/account.services';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

export default async function ActivityPage() {

  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';
  const activityData: ActivityDataTypes[] = await getActivityData(accountId, token)
  console.log(activityData)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <Link href={`/dashboard/accounts/${accountId}/activity/new`}>Nueva actividad +</Link>
      </div>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Actividad</h2>
        <div>
          {activityData.length === 0 && <span>No hay actividad</span>}
          {activityData.length !== 0 &&
            activityData.map(activity =>
              <ActivityRow key={activity.id} activity={activity} />
            )
          }
        </div>
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