import { AccountDataTypes } from "@/app/api/accounts/route";
import { UserDataTypes } from "@/app/api/user/route";
import { getAccountData } from "@/app/services/account.services";
import { getUserData } from "@/app/services/user.services"
import { cookies, headers } from "next/headers"
import Link from "next/link";

export default async function Dashboard() {

  const token = cookies().get('token')?.value ?? '';

  const accountData: AccountDataTypes = await getAccountData(token)
  const accountId = accountData.id

  return (
    <>
      <div className="w-full flex justify-between p-8 border border-gray-500">
        <span>$ {accountData.available_amount}</span>
        <Link href={`/dashboard/accounts/${accountId}/cards`}>tarjetas</Link>
        <Link href="/dashboard/profile">CVU</Link>
      </div>

      <div className="w-full flex justify-between p-8 border border-gray-500">
        <Link href="/dashboard/transaction">Transferir dinero</Link>
        <Link href="/dashboard/services">Pagar servicios</Link>
      </div>

      <div className="w-full flex justify-between p-8 border border-gray-500">Buscar actividad</div>

      <div className="w-full flex justify-between p-8 border border-gray-500">Actividad</div>
    </>

  )
}
