import AccountDepositForm from '@/app/components/Account/AccountDepositForm'
import { getAccountData } from '@/app/services/account.services'
import { getCookies } from '@/app/services/getCookies.services'
import { AccountDataTypes } from '@/app/types/account.types'
import { DepositTypes } from '@/app/types/deposit.types'
import Link from 'next/link'

export default async function DepositCheckout({ searchParams }: { searchParams: { amount: string } }) {

  const { token, accountId } = getCookies()
  const amount = searchParams.amount
  const accountData: AccountDataTypes = await getAccountData(token)
  const deposit: DepositTypes = { amount: Number(amount), destination: accountData.cvu, origin: accountData.cvu }

  return (
    <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
      <h2>Revisá que esté todo bien</h2>
      <p>Vas a transferir</p>
      <div className='flex gap-4'>
        <span>$ {amount} </span>
        <Link href={`/dashboard/accounts/${accountId}/deposit/amount?amount=${amount}`}>cambiar</Link>
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
