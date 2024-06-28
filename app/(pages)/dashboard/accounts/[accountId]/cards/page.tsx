import { getCardsData } from '@/app/services/card.services';
import { getCookies } from '@/app/services/getCookies.services';
import { CardsDataTypes } from '@/app/types/card.types';
import Link from 'next/link'

export default async function CardsPage() {

  const { token, accountId } = getCookies()
  const cardsData: CardsDataTypes[] = await getCardsData(accountId, token)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <Link href={`/dashboard/accounts/${accountId}/cards/new`}>Nueva tarjeta +</Link>
      </div>

      <div className="w-full flex flex-col p-8 border border-gray-500">
        <span className='mb-4'>Tus tarjetas</span>
        {cardsData && cardsData.map(card => <CardRow key={card.id} card={card} />)}
        {!cardsData && <>No hay targetas cargadas</>}
      </div>

    </>
  )

}

const getLast4 = (num: number) => {
  const numberStr = num.toString()
  return numberStr.substr(-4);
}

const CardRow = async ({ card }: { card: CardsDataTypes }) => {

  return (
    <div className='flex justify-between items-center hover:bg-white'>
      <span>terminada en {getLast4(card.number_id)}</span>
      <span>id: {card.id}</span>
      <Link href={`/dashboard/accounts/${card.account_id}/cards/${card.id}`} className='btn'>eliminar</Link>
    </div>
  )
}