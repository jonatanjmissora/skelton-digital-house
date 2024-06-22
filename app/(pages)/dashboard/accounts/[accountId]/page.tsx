import AccountEditForm from '@/app/components/AccountEditForm';
import { getAccountData } from '@/app/services/account.services';
import { cookies } from 'next/headers';
import React from 'react'

export default async function AccountPage() {

  const token = cookies().get('token')?.value ?? '';
  const accountData = await getAccountData(token)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Edit account</h2>
        <AccountEditForm accountData={accountData} token={token} />
      </div>

    </>
  )
}


