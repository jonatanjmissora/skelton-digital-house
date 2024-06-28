import { getCookies } from '@/app/services/getCookies.services';
import Link from 'next/link';

export default function DepositPage() {

  const { token, accountId } = getCookies()

  return (
    <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
      <Link href={`/dashboard/accounts/${accountId}/deposit/bank`}>Transferencia bancaria</Link>
      <Link href={`/dashboard/accounts/${accountId}/deposit/card`}>Seleccionar tarjeta</Link>
    </div>
  )
}
