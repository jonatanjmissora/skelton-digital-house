import { AccountCardsDataTypes, deleteCard, getAccountCardsData } from '@/app/services/account.services';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

export default async function AccountCard({ params }: { params: { cardId: string } }) {

  const { cardId } = params
  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';
  const accountCardsData: AccountCardsDataTypes[] = await getAccountCardsData(accountId, token)
  const actualCard = accountCardsData.filter(card => card.id === parseInt(cardId, 10))[0]

  const handleClick = async () => {
    try {
      await deleteCard(actualCard.id.toString(), accountId, token)

    } catch (error) {
      if (error instanceof Error)
        console.log(error.message)
    }
  }

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Tarjeta:</h2>
        <div className='flex flex-col gap-1 mt-2'>
          <span>Numero : {actualCard.number_id}</span>
          <span>Nombre : {actualCard.first_last_name}</span>
          <span>Exp : {actualCard.expiration_date}</span>
        </div>
      </div>

      <div className="w-full flex flex-col p-8 border border-gray-500">
        <p>¿Quiere eliminar la siguiente tarjeta?</p>
        <div className='flex gap-4 mt-4'>
          <button onClick={handleClick} className='btn'>Eliminar</button>
          <Link className='btn' href={`/dashboard/accounts/${accountId}/cards`}>Cancelar</Link>
        </div>
      </div>
    </>
  )
}
