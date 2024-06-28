import { getCookies } from '@/app/services/getCookies.services'

export default function DepositCard() {

  const { token, accountId } = getCookies()
  console.log({ token, accountId })

  return (
    <div className="w-full flex flex-col gap-4 p-8 border border-gray-500">
      DepositCard
    </div>
  )
}
