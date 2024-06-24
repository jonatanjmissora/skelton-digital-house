"use client"

import React from 'react'
import { UserDataTypes } from '../api/user/RRRroute'
import { editUser } from '../services/user.services'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserEditForm({ userData, userId, token }: { userData: UserDataTypes, userId: string, token: string }) {

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newUser = {
      email: event.currentTarget.email.value,
      firstname: event.currentTarget.username.value.split(", ")[0],
      lastname: event.currentTarget.username.value.split(", ")[1],
      dni: parseInt(event.currentTarget.dni.value, 10),
      phone: event.currentTarget.phone.value,
    }

    const userEditResp = await editUser(userId, newUser, token)
    console.log("Usuario editado", {userEditResp})
    router.push(`/dashboard/profile`)
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4'>
      <input
        type="text"
        name="email"
        required
        defaultValue={userData.email}
        className='border border-gray-500 p-2 text-center w-max'
      />

      <input
        type="text"
        name="username"
        required
        defaultValue={`${userData.firstname}, ${userData.lastname}`}
        className='border border-gray-500 p-2 text-center w-max'
      />

      <input
        type="text"
        name="dni"
        required
        defaultValue={userData.dni}
        className='border border-gray-500 p-2 text-center w-max'
      />

      <input
        type="text"
        name="phone"
        required
        defaultValue={userData.phone}
        className='border border-gray-500 p-2 text-center w-max'
      />
      <div className='flex gap-4 mt-4'>
        <button type="submit" className='btn w-max'>Guardar</button>
        <Link href={`/dashboard/profile`} className='btn'>Cancelar</Link>
      </div>
    </form>
  )
}
