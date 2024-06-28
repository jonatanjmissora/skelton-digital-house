import CardDeleteForm from '@/app/components/Card/CardDeleteForm';
import { getCardData } from '@/app/services/card.services';
import { getCookies } from '@/app/services/getCookies.services';
import { CardsDataTypes } from '@/app/types/card.types';

export default async function AccountCard({ params }: { params: { cardId: string } }) {

  const { cardId } = params
  const { token, accountId } = getCookies()
  const actualCard: CardsDataTypes = await getCardData(cardId, accountId, token)

  return (
    <>
      <div className="card">
        <h2>Tarjeta: {cardId}</h2>
        <div className='flex flex-col gap-1 mt-2'>
          <span>Numero : {actualCard.number_id}</span>
          <span>Nombre : {actualCard.first_last_name}</span>
          <span>Exp : {actualCard.expiration_date}</span>
        </div>
      </div>

      <CardDeleteForm actualCardId={actualCard.id.toString()} accountId={accountId} token={token} />
    </>
  )
}
