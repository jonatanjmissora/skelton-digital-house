import NewActivityForm from '@/app/components/NewActivityForm';
import { cookies } from 'next/headers';
import React from 'react'

export default function ActivityNew() {

  const token = cookies().get("token")?.value ?? "";
  const accountId = cookies().get("accountid")?.value ?? "";

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        Nueva Transaccion
      </div>

      <div className="w-full flex flex-col p-8 border border-gray-500">
        <NewActivityForm accountId={accountId} token={token} />
      </div>
    </>
  )
}
