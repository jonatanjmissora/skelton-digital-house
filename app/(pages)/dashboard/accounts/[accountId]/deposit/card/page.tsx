import CardSelect from '@/app/components/Card/CardSelect'
import { getCardsData } from '@/app/services/card.services'
import { getCookies } from '@/app/services/getCookies.services'
import { CardsDataTypes } from '@/app/types/card.types'
import Link from 'next/link'

export default async function DepositCard({searchParams}: {searchParams:{cardnum: string}}) {

  const { token, accountId } = getCookies()
  const cardsData: CardsDataTypes[] = await getCardsData(accountId, token)
  const cardnum = searchParams.cardnum

  return (
    <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
      <h2>Seleccionar tarjeta</h2>
      <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
        <h3>Tus tarjetas</h3>
        <CardSelect cardsData={cardsData} />
      </div>
      <div className='w-full flex justify-between'>
        <Link href={`/dashboard/accounts/${accountId}/cards/new`}>Nueva tarjeta +</Link>
        <Link className='btn' href={`/dashboard/accounts/${accountId}/deposit/amount?cardnum=${cardnum}&amount=0`}>Continuar</Link>
      </div>
    </div>
  )
}