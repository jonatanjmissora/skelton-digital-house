import CardSelect from '@/app/components/Card/CardSelect'
import { getAccountData } from '@/app/services/account.services'
import { getCardsData } from '@/app/services/card.services'
import { getCookies } from '@/app/services/getCookies.services'
import { getService, getServicesData } from '@/app/services/services.services'
import { AccountDataTypes } from '@/app/types/account.types'
import { CardsDataTypes } from '@/app/types/card.types'
import { ServiceTypes } from '@/app/types/service.types'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ServiceCheckout({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

  const { token, accountId } = getCookies()

  const serviceid = searchParams?.serviceid ?? ""
  const serviceDataPromise: Promise<ServiceTypes> = await getService(serviceid)
  const cardsDataPromise: Promise<CardsDataTypes[]> = await getCardsData(accountId, token)
  const accountDataPromise: Promise<AccountDataTypes> = await getAccountData(token)
  const [serviceData, cardsData, accountData] = await Promise.all([serviceDataPromise, cardsDataPromise, accountDataPromise])

  if (serviceData.invoice_value === 0) serviceData.invoice_value = 1

  const onSubmit = async (formData: FormData) => {
    "use server"
    if (accountData.available_amount >= serviceData.invoice_value * 100) {
      redirect("/dashboard/services/success")
    }
    else {
      redirect("/dashboard/services/payerror")
    }
  }

  return (
    <>
      <span>Monto disponible : {accountData.available_amount}</span>
      <div className='card'>
        <div className='flex justify-between'>
          <span>
            {serviceData.name}
          </span>
          <Link href={`/dashboard/services/${serviceid}`}>ver detalles</Link>
        </div>
        <div className='flex justify-between'>
          <span>
            Total a pagar
          </span>
          <span>
            ${serviceData.invoice_value * 100}
          </span>
        </div>
      </div>
      <div className='card'>
        <h3>Tus tarjetas</h3>
        <CardSelect cardsData={cardsData} />
      </div>
      <form
        action={onSubmit}
        className='w-full flex justify-end'>
        <button className='btn' type="submit">Pagar</button>
      </form>
    </>
  )
}
