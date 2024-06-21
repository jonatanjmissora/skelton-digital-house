import { AccountDataTypes } from '@/app/api/accounts/route';
import { AccountCardsDataTypes, getAccountCardsData, getAccountData } from '@/app/services/account.services';
import { cookies } from 'next/headers';
import Link from 'next/link'
import React from 'react'

export default async function CardsPage() {

const token = cookies().get('token')?.value ?? '';
const accountId = cookies().get('accountid')?.value ?? '';
const accountCardsData: AccountCardsDataTypes[] = await getAccountCardsData(accountId, token)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <Link href={`/dashboard/accounts/${accountId}/cards/new`}>Nueva tarjeta +</Link>
      </div>

      <div className="w-full flex flex-col p-8 border border-gray-500">
        <span>Tus tarjetas</span>
      </div>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        {accountCardsData.map(card => <CardRow key={card.id} card={card} />)}
      </div>

    </>
  )
}

const getLast4 = (num: number) => {
  const numberStr = num.toString()
  return parseInt(numberStr.substr(-4), 10);
}

const CardRow = ({card}: {card: AccountCardsDataTypes}) => {
  return (
    <div className='flex justify-between'>
      <span>terminada en {getLast4(card.number_id)}</span>
      <button className='btn'>eliminar</button>
    </div>
  )
}