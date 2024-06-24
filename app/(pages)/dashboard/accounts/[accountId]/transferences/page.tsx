import { AccountDataTypes } from '@/app/api/accounts/RRRroute';
import NewTransferenceForm from '@/app/components/NewTransferenceForm';
import { getAccountData } from '@/app/services/account.services';
import { cookies } from 'next/headers';
import React from 'react'

export default async function TransferencesPage() {

const token = cookies().get('token')?.value ?? '';
const accountId = cookies().get('accountid')?.value ?? '';
const accountData: AccountDataTypes = await getAccountData(token)

  return (
    <div className="w-full flex flex-col p-8 border border-gray-500">
      <div>Nueva transferencia</div>
      <NewTransferenceForm accountId={accountId} accountCVU={accountData.cvu} token={token}/>
    </div>
  )
}
