"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { postCard } from '../services/card.services';

function randomNumber() {
    return Math.random() * (9999999999999999 - 1000000000000000) + 1000000000000000;
}

export default function NewCardForm({ accountId, token }: { accountId: string, token: string }) {
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const cardNumber = event.currentTarget.randomCard.value;
        const newCard = {
            cod: 123,
            expiration_date: "06/2025",
            first_last_name: "Juan Perez",
            number_id: parseInt(cardNumber, 10),
        }

        const newCardResp = await postCard(accountId, newCard, token)
        console.log("Nueva tarjeta creada", newCardResp)
        router.push(`/dashboard/accounts/${accountId}/cards`)
        router.refresh();

    }

    return (

        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='flex gap-2 items-center my-4'>
                <label htmlFor="cardNumber">Numero de tarjeta</label>
                <input className='border border-gray-500 p-2 text-center' type="text" value={randomNumber()} readOnly name="randomCard" />
            </div>
            <div className='flex gap-4'>
                <button type='submit' className='btn'>Agregar tarjeta</button>
                <Link href={`/dashboard/accounts/${accountId}/cards`} className='btn'>Cancelar</Link>
            </div>
        </form>

    )
}
