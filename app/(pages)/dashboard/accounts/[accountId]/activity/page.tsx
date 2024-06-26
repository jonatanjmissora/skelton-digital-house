import ActivityFilter from '@/app/components/ActivityFilter';
import ActivityPagination from '@/app/components/ActivityPagination';
import ActivitySearch from '@/app/components/ActivitySearch';
import { getActivityData } from '@/app/services/account.services';
import { ActivityDataTypes } from '@/app/types/account.types';
import { getActualActivities } from '@/app/utils/getActualActivities';
import { cookies } from 'next/headers';
import React from 'react'

export type ParamsType = {
    filter?: string;
    search?: string;
    page: string;
}

export default async function ActivityPage({ searchParams }: {searchParams: ParamsType}) {
  const search = searchParams.search
  const filter = searchParams.filter
  const page = searchParams.page

  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';
  const activityData: ActivityDataTypes[] = await getActivityData(accountId, token)
  
  const filteredActivities = getActualActivities(activityData, page, filter, search  )

  return (
    <>
      <div className="w-full flex justify-between p-8 border border-gray-500">
        <ActivitySearch />
        <ActivityFilter />
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
        <ActivityPagination activityLength={filteredActivities.length} />
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