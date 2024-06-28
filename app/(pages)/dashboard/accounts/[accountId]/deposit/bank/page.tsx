import AccountData from '@/app/components/Account/AccountData'
import { getAccountData } from '@/app/services/account.services'
import { getCookies } from '@/app/services/getCookies.services'
import { AccountDataTypes } from '@/app/types/account.types'
import Link from 'next/link'

export default async function DepositBank({ params }: { params: { accountId: string } }) {

  const { token, accountId } = getCookies()
  const accountData: AccountDataTypes = await getAccountData(token)

  return (
    <div className="w-full flex justify-between p-8 border border-gray-500">
      <div className='flex gap-2'>
        <span>CVU : {accountData.cvu}</span>
        <Link href={`/dashboard/accounts/${accountData.id}/deposit/amount?cvu=${accountData.cvu}&amount=0`}>copiar</Link>
      </div>
      <div className='flex gap-2'>
        <span>Alias : {accountData.alias}</span>
        <Link href={`/dashboard/accounts/${accountData.id}/deposit/amount?cvu=${accountData.cvu}&amount=0`}>copiar</Link>
      </div>
    </div>
  )
}

{/*
  <Link href={`/dashboard/accounts/${accountData.id}/deposit/amount?amount=0`} >
  <AccountData accountData={accountData} />
  </Link>
  */}