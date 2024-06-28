import ActivityCard from '@/app/components/Activity/ActivityCard';
import ActivityFilter from '@/app/components/Activity/ActivityFilter';
import ActivityPagination from '@/app/components/Activity/ActivityPagination';
import ActivitySearch from '@/app/components/Activity/ActivitySearch';
import { getActivitiesData } from '@/app/services/account.services';
import { getCookies } from '@/app/services/getCookies.services';
import { ActivityDataTypes } from '@/app/types/account.types';
import { ACTIVITIES_PER_PAGE } from '@/app/utils/constants';
import { getActualActivities } from '@/app/utils/getActualActivities';
import { Suspense } from 'react'

type ParamsType = {
  filter?: string;
  search?: string;
  page?: string;
}

export default async function ActivityPage({ searchParams }: { searchParams: ParamsType }) {
  const search = searchParams.search
  const filter = searchParams.filter
  const page = searchParams.page

  const { token, accountId } = getCookies()
  const activityData: ActivityDataTypes[] = await getActivitiesData(accountId, token)

  const filteredActivities = getActualActivities(activityData, filter, search)
  const start = (Number(page) - 1) * Number(ACTIVITIES_PER_PAGE)
  const end = start + Number(ACTIVITIES_PER_PAGE)
  const activitiesToShow = filteredActivities.slice(start, end)

  return (
    <>
      <div className="w-full flex justify-between items-center p-2 px-8 border border-gray-500">
        <ActivitySearch />
        <ActivityFilter />
      </div>
      <div className="flex-1 w-full flex flex-col justify-between p-8 border border-gray-500">
        <Suspense key={`${search}-${filter}-${page}`} fallback={"LOADING"}>
          <ActivityCard activities={activitiesToShow} />
        </Suspense>
        <ActivityPagination totalActivityLength={filteredActivities.length} />
      </div>
    </>
  )
}

