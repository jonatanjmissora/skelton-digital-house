"use client"

import React from 'react'
import { UserDataTypes } from '../api/user/route'
import { editUser } from '../services/user.services'

export default function UserEditForm({ userData, userId, token }: { userData: UserDataTypes, userId: string, token: string }) {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newUser = {
      ...userData,
      email: event.currentTarget.email.value,
      firstname: event.currentTarget.username.value.split(", ")[0],
      lastname: event.currentTarget.username.value.split(", ")[1],
      dni: event.currentTarget.dni.value,
      phone: event.currentTarget.phone.value,
    }

    const userEditResp = await editUser(userId, newUser, token)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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

      <button type="submit" className='btn w-max'>Guardar</button>

    </form>
  )
}
