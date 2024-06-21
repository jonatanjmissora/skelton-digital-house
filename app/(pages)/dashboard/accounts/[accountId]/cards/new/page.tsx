import NewCardForm from '@/app/components/NewCardForm';
import { cookies } from 'next/headers';
import React from 'react'

export default function NewCardPage() {

    const token = cookies().get("token")?.value ?? "";
    const accountId = cookies().get("accountid")?.value ?? "";

  return (
    <>
        <div className="w-full flex flex-col p-8 border border-gray-500">
            Nueva Tarjeta
        </div>

        <div className="w-full flex flex-col p-8 border border-gray-500"> 
            <NewCardForm accountId={accountId} token={token}/>
        </div>
    </>
  )
}
