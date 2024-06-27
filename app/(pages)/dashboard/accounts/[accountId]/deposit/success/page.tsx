import { getActivitiesData, getActivityData } from '@/app/services/account.services'
import { ActivityDataTypes } from '@/app/types/account.types'
import { getActualActivities } from '@/app/utils/getActualActivities'
import { cookies } from 'next/headers'
import React from 'react'

export default async function DepositSuccess({ searchParams }: { searchParams: { id: string } }) {

  const id = searchParams.id
  const token = cookies().get("token")?.value ?? ""
  const accountId = cookies().get("accountid")?.value ?? ""
  const actualActivity = await getActivityData(id, accountId, token)

  return (
    <div>
      DepositSuccess {id}
      {JSON.stringify(actualActivity, null, 2)}
    </div>
  )
}
