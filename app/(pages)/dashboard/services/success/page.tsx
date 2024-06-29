import { getService } from '@/app/services/services.services'
import React from 'react'

export default async function ServiceSuccess({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

  const serviceid = searchParams.serviceid ?? ""
  const serviceData = await getService(serviceid)

  return (
    <>
      <div className='card'>
        <h2>Ya realizaste tu pago</h2>
      </div>
      <div className='card'>
        <h2>Ya realizaste tu pago</h2>
      </div>
    </>
  )
}
