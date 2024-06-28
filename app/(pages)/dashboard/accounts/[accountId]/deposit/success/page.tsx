import { getAccountData, getActivitiesData, getActivityData } from '@/app/services/account.services'
import { getCookies } from '@/app/services/getCookies.services'
import { AccountDataTypes } from '@/app/types/account.types'

export default async function DepositSuccess({ searchParams }: { searchParams: { id: string } }) {

  const id = searchParams.id
  const { token, accountId } = getCookies()
  const actualActivityPromise = await getActivityData(id, accountId, token)
  const accountDataPromise: Promise<AccountDataTypes> = await getAccountData(token)
  const [actualActivity, accountData] = await Promise.all([actualActivityPromise, accountDataPromise])

  return (
    <>
      <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
        <h2>Ya cargamos el dinero en tu cuenta</h2>
      </div>
      <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
        <p>fecha: {actualActivity.dated}</p>
        <p>monto: ${actualActivity.amount}</p>
        <p>Para</p>
        <p>Cuenta propia</p>
        <p>CVU {accountData.cvu}</p>
      </div>
    </>
  )
}
