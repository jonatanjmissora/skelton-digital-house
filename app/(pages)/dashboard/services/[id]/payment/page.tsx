import { getService } from '@/app/services/services.services';
import { ServiceTypes } from '@/app/types/service.types';
import { cookies } from 'next/headers';
import Link from 'next/link'
import React from 'react'

export default async function ServicePaymentPage({ params }: { params: { id: string } }) {

  const { id } = params;
  const userId = cookies().get('userid')?.value ?? '';
  const actualService: ServiceTypes = await getService(id, userId)

  return (
    <div className="w-full flex flex-col p-8 border border-gray-500">
      <div>
        <div className='w-full flex justify-between mt-4'>
          <span>{actualService.name}</span>
          <Link href={`/dashboard/services/${id}`}>detalles</Link>
        </div>
        <div className='w-full flex justify-between mt-4'>
          <span>Total a pagar</span>
          {actualService.invoice_value && <span>{actualService.invoice_value * 100}</span>}
        </div>
      </div>



      <div className='w-full flex justify-end'>
        <Link className='btn mt-4' href={`/dashboard/services/${id}/payment/result`}>Pagar</Link>
      </div>
    </div>
  )
}
