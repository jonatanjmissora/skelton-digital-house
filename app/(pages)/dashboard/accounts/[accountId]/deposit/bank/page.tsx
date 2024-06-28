import AccountData from '@/app/components/Account/AccountData'
import { getAccountData } from '@/app/services/account.services'
import { getCookies } from '@/app/services/getCookies.services'
import { AccountDataTypes } from '@/app/types/account.types'
import Link from 'next/link'

export default async function DepositBank({ params }: { params: { accountId: string } }) {

  const { token, accountId } = getCookies()
  const accountData: AccountDataTypes = await getAccountData(token)

  return (
    <Link href={`/dashboard/accounts/${accountData.id}/deposit/amount?amount=0`} >
      <AccountData accountData={accountData} />
    </Link>
  )
}
