import AccountDepositForm from '@/app/components/Account/AccountDepositForm';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

export default function DepositPage() {

  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';

  return (
    <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
      <Link href={`/dashboard/accounts/${accountId}/deposit/bank`}>Transferencia bancaria</Link>
      <Link href={`/dashboard/accounts/${accountId}/deposit/card`}>Seleccionar tarjeta</Link>
    </div>
  )
}
