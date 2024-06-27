import { getActivitiesData, getActivityData } from '@/app/services/account.services';
import { ActivityDataTypes } from '@/app/types/account.types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

export default async function ActivityPage({ params }: { params: { accountId: string, activityId: string } }) {

  const token = cookies().get('token')?.value ?? '';
  const { accountId, activityId } = params
  const actualActivity = await getActivityData(activityId, accountId, token)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2 className='mb-4'>Actividad:</h2>
        <span>Tipo : {actualActivity.type}</span>
        <span>Descripcion : {actualActivity.description}</span>
        <span>Destino : {actualActivity.destination}</span>
        <span>Origen : {actualActivity.origin}</span>
        <span>Fecha : {actualActivity.dated}</span>
      </div>
      <Link className='btn' href={`/dashboard/accounts/${accountId}/activity?page=1`}>Volver</Link>
    </>
  )
}
