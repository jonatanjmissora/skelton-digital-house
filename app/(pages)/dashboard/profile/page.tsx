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
  const userData: UserDataTypes = await getUserData(token)

  return (
    <>
      <div className="w-full flex flex-col p-8 border border-gray-500">
        <ProfileRow rowKey="Email:" rowValue={userData.email} />
        <ProfileRow rowKey="Nombre:" rowValue={`${userData.firstname}, ${userData.lastname}`} />
        <ProfileRow rowKey="DNI:" rowValue={userData.dni.toString()} />
        <ProfileRow rowKey="Telefono:" rowValue={userData.phone} />

      </div>
      <div className="w-full flex justify-between p-8 border border-gray-500"><Link href={`/dashboard/accounts/${accountData.id}/cards`}>Medios de pago</Link></div>
      <div className="w-full flex justify-between p-8 border border-gray-500">
        <span>CVU : {accountData.cvu}</span>
        <span>Alias : {accountData.alias}</span>
      </div>
    </>
  )
}

const ProfileRow = ({ rowKey, rowValue }: { rowKey: string, rowValue: string }) => {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-2'>
        <span>{rowKey}</span>
        <span>{rowValue}</span>
      </div>
      <Link href="/dashboard/profile/edit">editar</Link>
    </div>
  )
}
