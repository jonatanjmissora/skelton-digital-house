"use client"

import { postDeposit } from '@/app/services/account.services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'


export default function AccountDepositForm({ accountId, token }: { accountId: string, token: string }) {
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newDeposit = {
            "amount": parseInt(event.currentTarget.amount.value, 10),
            "dated": new Date(),
            "destination": event.currentTarget.destination.value,
            "origin": event.currentTarget.origin.value,
        }

        const newDepositResp = await postDeposit(accountId, newDeposit, token)
        console.log("Nuevo depósito creado", newDepositResp)
        router.push(`/dashboard/accounts/${accountId}/activity`)
        router.refresh();
    }

    return (
        <form className='flex flex-col gap-4 w-max py-8' onSubmit={handleSubmit}>
            <div className='flex gap-4 items-center'>
                <label htmlFor="monto">monto: </label>
                <input className='border border-gray-500 p-2 text-center' type="text" id='monto' required name="amount" defaultValue={1000} />
            </div>
            <div className='flex gap-4 items-center'>
                <label htmlFor="origen">origen: </label>
                <input className='border border-gray-500 p-2 text-center' type="text" id='origen' required name="origin" defaultValue={"Pedro"} />
            </div>
            <div className='flex gap-4 items-center'>
                <label htmlFor="destino">destino: </label>
                <input className='border border-gray-500 p-2 text-center' type="text" id='destino' required name="destination" defaultValue={"Cuenta propia"} />
            </div>
            <div className='flex gap-4 mt-4'>
                <button type='submit' className='btn'>Agregar depósito</button>
                <Link href={`/dashboard/`} className='btn'>Cancelar</Link>
            </div>
        </form>
    )
}