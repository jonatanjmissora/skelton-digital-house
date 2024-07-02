import { getTransactionData } from '@/app/services/account.services'
import { getCookies } from '@/app/services/getCookies.services'
import Link from 'next/link'
import React from 'react'

export default async function ServiceSuccess({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

  const serviceId = searchParams.serviceid ?? ""
  const { accountId, token } = getCookies()
  const transactionData = await getTransactionData(serviceId, accountId, token)
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
        <span>(swagger no arroja dato de tarjeta)</span>
      </div>
      <Link href={`/dashboard/`}>Ir al inicio</Link>
    </>
  )
}
