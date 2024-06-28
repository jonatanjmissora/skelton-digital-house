import AccountDepositForm from '@/app/components/Account/AccountDepositForm'
import { getAccountData } from '@/app/services/account.services'
import { getCookies } from '@/app/services/getCookies.services'
import { AccountDataTypes } from '@/app/types/account.types'
import { DepositTypes } from '@/app/types/deposit.types'
import Link from 'next/link'

export default async function DepositCheckout({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }}) {

  const { token, accountId } = getCookies()
  const amount = searchParams.amount
  const cardnum = searchParams.cardnum
  const cvu = searchParams.cvu
  const accountData: AccountDataTypes = await getAccountData(token)
  const deposit: DepositTypes = { amount: Number(amount), destination: accountData.cvu, origin: accountData.cvu }

  return (
    <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
      <h2>Revisá que esté todo bien</h2>
      <div>
        <span>Vas a transferir de </span>
        { cvu 
          ? <span>CVU: {cvu}</span>
          : <span>tarjeta: {cardnum}</span>
        }
      </div>
      <div className='flex gap-4'>
        <span>$ {amount} </span>
        <Link href={cvu 
        ? `/dashboard/accounts/${accountId}/deposit/amount?cvu=${cvu}&amount=${amount}`
        : `/dashboard/accounts/${accountId}/deposit/amount?cardnum=${cardnum}&amount=${amount}`
      }>cambiar</Link>
      </div>

      <p>Para</p>
      <p>Cuenta propia</p>
      <p>CVU {accountData.cvu}</p>
      <div className='w-full flex justify-end'>
        <AccountDepositForm deposit={deposit} accountId={accountId} token={token} />
      </div>
    </div>
  )
}
