import { AccountDataTypes } from '@/app/api/accounts/route'
import { UserDataTypes } from '@/app/api/user/route';
import { getAccountData } from '@/app/services/account.services'
import { getUserData } from '@/app/services/user.services';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

export default async function ProfilePage() {
  
  const token = cookies().get('token')?.value ?? '';
  const accountData: AccountDataTypes = await getAccountData(token)
  const userData: UserDataTypes = await getUserData()

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <span>Email : {userData.email}</span>
        <span>Nombre : {userData.lastname}, ${userData.firstname}</span>
        <span>DNI : {userData.dni}</span>
        <span>telefono : {userData.phone}</span>
      </div>
      <div className="w-full flex justify-between p-8 border border-gray-500"><Link href={`/dashboard/accounts/${accountData.id}/cards`}>Medios de pago</Link></div>
      <div className="w-full flex justify-between p-8 border border-gray-500">
        <span>CVU : {accountData.cvu}</span>
        <span>Alias : {accountData.alias}</span>
      </div>
    </>
  )
}
