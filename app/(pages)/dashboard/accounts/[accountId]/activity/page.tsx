import ActivityCard from '@/app/components/Activity/ActivityCard';
import ActivityFilter from '@/app/components/Activity/ActivityFilter';
import ActivityPagination from '@/app/components/Activity/ActivityPagination';
import ArrayList from '@/app/components/Services/ArrayList';
import SearchBar from '@/app/components/SearchBar';
import { getActivitiesData } from '@/app/services/account.services';
import { getCookies } from '@/app/services/getCookies.services';
import { ActivityDataTypes } from '@/app/types/account.types';
import { ACTIVITIES_PER_PAGE } from '@/app/utils/constants';
import { getActualActivities } from '@/app/utils/getActualActivities';
import { Suspense } from 'react'

export default async function ActivityPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const search = searchParams.search
  const filter = searchParams.filter
  const page = searchParams.page ?? "1"

  const { token, accountId } = getCookies()
  const activitiesData: ActivityDataTypes[] = await getActivitiesData(accountId, token)

  const filteredActivities = getActualActivities(activitiesData, filter, search)
  const start = (Number(page) - 1) * Number(ACTIVITIES_PER_PAGE)
  const end = start + Number(ACTIVITIES_PER_PAGE)
  const activitiesToShow = filteredActivities.slice(start, end)

  return (
    <>
      <div className="w-full flex justify-between items-center p-2 px-8 border border-gray-500">
        <SearchBar placeholder={"Busca en tu actividad"} />
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

