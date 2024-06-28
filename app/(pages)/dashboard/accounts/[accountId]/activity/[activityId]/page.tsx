import { getActivityData } from '@/app/services/account.services';
import { getCookies } from '@/app/services/getCookies.services';
import Link from 'next/link';

export default async function ActivityPage({ params }: { params: { accountId: string, activityId: string } }) {

  const { token, accountId } = getCookies()
  const { activityId } = params
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
