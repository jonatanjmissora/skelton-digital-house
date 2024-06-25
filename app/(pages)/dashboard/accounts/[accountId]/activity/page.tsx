import ActivityFilter from '@/app/components/ActivityFilter';
import { getActivityData } from '@/app/services/account.services';
import { ActivityDataTypes } from '@/app/types/account.types';
import { cookies } from 'next/headers';
import React from 'react'

const getFiltered = (activityData: ActivityDataTypes[], qry: string) => {
  const [day, month, year] = new Date().toLocaleDateString().split("/");
  const correctMonth = month.length < 2 ? "0" + month : month
  const correctDay = day.length < 2 ? "0" + day : day
  const today = `${year}-${correctMonth}-${correctDay}`
  if (qry === "hoy") {
    return activityData.filter(activity => activity.dated.substring(0, 10) === today)
  }
  if (qry === "mes") {
    return activityData.filter(activity => activity.dated.substring(5, 7) === correctMonth &&
      activity.dated.substring(0, 4) === year)
  }
  if (qry === "anio") {
    return activityData.filter(activity => activity.dated.substring(0, 4) === year)
  }
  if (!qry) {
    return activityData
  }
}

export default async function ActivityPage({ searchParams }: { searchParams: { qry: string } }) {

  const { qry } = searchParams

  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';
  const activityData: ActivityDataTypes[] = await getActivityData(accountId, token)
  const filteredActivities = getFiltered(activityData, qry) ?? []

  return (
    <>
      <div className="w-full flex justify-between p-8 border border-gray-500">
        <input className='p-2' type="text" placeholder='Busca en tu actividad' />
        <ActivityFilter accountId={accountId} />
      </div>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Actividad</h2>
        <div className='py-2'>
          {filteredActivities.length === 0 && <span>No hay actividad</span>}
          {filteredActivities.length !== 0 &&
            filteredActivities.map(activity =>
              <ActivityRow key={activity.id} activity={activity} />
            )
          }
        </div>
        <div className='w-full text-center'>1 2 3 4 5</div>
      </div>
    </>
  )
}

const ActivityRow = ({ activity }: { activity: ActivityDataTypes }) => {

  return (
    <div className="w-full flex justify-between">
      <span>{activity.description}</span>
      <span>{activity.dated.substring(0, 10)}</span>
      <span>{activity.amount}</span>
    </div>
  )
}