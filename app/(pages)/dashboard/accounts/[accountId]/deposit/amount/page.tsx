import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default function DepositAmount({ searchParams }: { searchParams: { amount: string } }) {

  const accountId = cookies().get("accountid")?.value ?? ""
  const amount = Number(searchParams.amount)

  const onSubmit = async (formData: FormData) => {
    "use server"
    const amount = (formData.get("amount"))
    if (amount === "0") return
    redirect(`/dashboard/accounts/${accountId}/deposit/checkout?amount=${amount}`)
  }

  return (
    <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
      <h2>¿Cuanto queres ingresar a la cuenta?</h2>
      <form action={onSubmit}>
        <input className='p-2 w-1/4' type="number" name="amount" required placeholder='$' defaultValue={amount} />
        <div className='w-full flex justify-end'>
          <button className='btn' type="submit">Continuar</button>
        </div>
      </form>
    </div>
  )
}
