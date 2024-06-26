"use client"

import { postNewActivity } from '@/app/services/account.services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ActivityNewForm({ accountId, token }: { accountId: string, token: string }) {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newActivity = {
      amount: -123,
      dated: new Date(),
      description: "actividad_random",
    }

    await postNewActivity(accountId, newActivity, token)
    console.log("Nueva actividad creada")
    router.push(`/dashboard/accounts/${accountId}/activity`)
    router.refresh();

  }

  return (

    <form className='flex gap-4 items-center' onSubmit={handleSubmit}>
      <input className='border border-gray-500 p-2 text-center' type="text" required name="amount" placeholder='cantidad' />
      <input className='border border-gray-500 p-2 text-center' type="text" required name="description" placeholder='descripcion' />
      <button type='submit' className='btn'>Confirmar</button>
      <Link href={`/dashboard/accounts/${accountId}/activity`} className='btn'>Cancelar</Link>
    </form>

  )
}
