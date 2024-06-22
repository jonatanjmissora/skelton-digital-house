"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { postNewCard } from '../services/card.services';

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

        await postNewCard(accountId, newCard, token)
        console.log("Nueva tarjeta creada")
        router.push(`/dashboard/accounts/${accountId}/cards`)
        router.refresh();

    }

    return (

        <form className='flex gap-4 items-center' onSubmit={handleSubmit}>
            <label htmlFor="cardNumber">Numero de tarjeta</label>
            <input className='border border-gray-500 p-2 text-center' type="text" value={randomNumber()} readOnly name="randomCard" />
            <button type='submit' className='btn'>Agregar tarjeta</button>
            <Link href={`/dashboard/accounts/${accountId}/cards`} className='btn'>Cancelar</Link>
        </form>

    )
}
