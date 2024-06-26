import Link from 'next/link'
import React from 'react'
import { AccountDataTypes } from '../../api/accounts/RRRroute'
import { getAccountData } from '../../services/account.services'

export default async function AccountCard({ token }: { token: string }) {

  const accountData: AccountDataTypes = await getAccountData(token)

  return (
    <div className="w-full flex justify-between p-8 border border-gray-500">
      <span>$ {accountData.available_amount}</span>
      <Link href={`/dashboard/accounts/${accountData.id}/cards`}>tarjetas</Link>
      <Link href="/dashboard/profile">CVU</Link>
    </div>
  )
}
