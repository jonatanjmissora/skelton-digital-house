import UserEditForm from '@/app/components/UserEditForm'
import { getUserData } from '@/app/services/user.services'
import { cookies } from 'next/headers';
import React from 'react'

export default async function ProfileEdit() {

  const token = cookies().get('token')?.value ?? '';
  const userId = cookies().get('userid')?.value ?? '';
  const userData = await getUserData(token)

  return (
    <>
      <div  className="w-full flex flex-col p-8 border border-gray-500">
        <h2>Edit profile</h2>
        <UserEditForm userData={userData} userId={userId} token={token}/>
      </div>
      
    </>
  )
}
