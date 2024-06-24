import NewDepositForm from '@/app/components/NewDepositForm';
import { cookies } from 'next/headers';
import React from 'react'

export default function DepositPage() {

  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';

  return (
    <div className="w-full flex flex-col p-8 border border-gray-500">
        <div>Nuevo depósito</div>
        <NewDepositForm accountId={accountId} token={token}/>
    </div>
  )
}
