import { getActivityData } from '@/app/services/account.services';
import { getCookies } from '@/app/services/getCookies.services';
import Link from 'next/link';

export default async function ActivityPage({ params }: { params: { accountId: string, activityId: string } }) {

  const { token, accountId } = getCookies()
  const { activityId } = params
  const actualActivity = await getActivityData(activityId, accountId, token)

  return (
    <>
      <div className="card">
        <div className='flex justify-between'>
          <span>Aprobada:</span>
          <span>creada el : {actualActivity.dated}</span>
        </div>
        <div>
          <span>{actualActivity.type}</span>
          <span>${actualActivity.amount}</span>
        </div>
        <span>{actualActivity.description}</span>
        <span>Numero de operación</span>
        <span>{actualActivity.id}</span>
      </div>
      <Link className='btn' href={`/dashboard/accounts/${accountId}/activity?page=1`}>Volver</Link>
    </>
  )
}
