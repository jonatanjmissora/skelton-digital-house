import DeleteCardForm from '@/app/components/DeleteCardForm';
import { AccountCardsDataTypes, getAccountCardData, getAccountCardsData } from '@/app/services/account.services';
import { cookies } from 'next/headers';

export default async function AccountCard({ params }: { params: { cardId: string } }) {

  const { cardId } = params
  const token = cookies().get('token')?.value ?? '';
  const accountId = cookies().get('accountid')?.value ?? '';
  const actualCard: AccountCardsDataTypes = await getAccountCardData(cardId, accountId, token)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Tarjeta: {cardId}</h2>
        <div className='flex flex-col gap-1 mt-2'>
          <span>Numero : {actualCard.number_id}</span>
          <span>Nombre : {actualCard.first_last_name}</span>
          <span>Exp : {actualCard.expiration_date}</span>
        </div>
      </div>

      <DeleteCardForm actualCardId={actualCard.id.toString()} accountId={accountId} token={token} />
    </>
  )
}
