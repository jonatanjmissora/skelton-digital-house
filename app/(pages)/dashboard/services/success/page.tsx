import { getTransactionData } from '@/app/services/account.services'
import { getCookies } from '@/app/services/getCookies.services'
import Link from 'next/link'
import React from 'react'

export default async function ServiceSuccess({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

  const transactionId = searchParams.transactionid ?? ""
  const {accountId, token} = getCookies()
  const transactionData = await getTransactionData(transactionId, accountId, token)
  console.log(transactionData)

  return (
    <>
      <div className='card'>
        <h2 className='text-center'>Ya realizaste tu pago</h2>
      </div>
      <div className='card'>
        <span>{transactionData.dated}</span>
        <span>${transactionData.amount}</span>
        <span>Para</span>
        <span>{transactionData.description}</span>
        <span>Tarjeta</span>
        <span>No tengo data</span>
      </div>
      <Link href={`/dashboard/`}>Ir al inicio</Link>
    </>
  )
}
