import { AccountDataTypes } from '@/app/api/accounts/RRRroute'
import AccountData from '@/app/components/Account/AccountData'
import { getAccountData } from '@/app/services/account.services'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export default async function DepositBank({ params }: { params: { accountId: string } }) {

  const token = cookies().get("token")?.value ?? ""
  const accountData: AccountDataTypes = await getAccountData(token)

  return (
    <Link href={`/dashboard/accounts/${accountData.id}/deposit/amount?amount=0`} >
      <AccountData accountData={accountData} />
    </Link>
  )
}
