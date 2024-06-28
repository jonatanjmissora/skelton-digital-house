import CardNewForm from '@/app/components/Card/CardNewForm';
import { getCookies } from '@/app/services/getCookies.services';

export default function NewCardPage() {

  const { token, accountId } = getCookies()

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        Nueva Tarjeta
        <CardNewForm accountId={accountId} token={token} />
      </div>
    </>
  )
}
