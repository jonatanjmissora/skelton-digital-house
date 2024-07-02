"use client"

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { editUser } from '@/app/services/user.services'
import { UserDataTypes } from '@/app/types/user.types'
import { toast } from 'sonner'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'

export default function UserEditForm({ userData, userId, token }: { userData: UserDataTypes, userId: string, token: string }) {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setIsLoading(true)
    try {
      const newUser = {
        email: form.email.value,
        firstname: form.username.value.split(", ")[0],
        lastname: form.username.value.split(", ")[1],
        dni: userData.dni,
        phone: form.phone.value,
      }

      const userEditResp = await editUser(userId, newUser, token)
      console.log("Usuario editado", { userEditResp })
      toast.success("Usuario editado")
      router.push(`/dashboard/profile`)
      router.refresh();
    } catch (error: any) {
      toast.error("Usuario editado")
    }
    finally {
      setIsLoading(false)
    }

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

      <div className='flex gap-2 items-center'>
        <input
          type="text"
          name="dni"
          readOnly
          defaultValue={userData.dni}
          className='border border-gray-500 p-2 text-center w-max'
        />
        <span>(swagger no me deja cambiar dni)</span>
      </div>

      <input
        type="text"
        name="phone"
        required
        defaultValue={userData.phone}
        className='border border-gray-500 p-2 text-center w-max'
      />
      <div className='flex gap-4 mt-4'>
        <SubmitButton isLoading={isLoading} text={'Guardar'} />
        <Link href={`/dashboard/profile`} className='btn'>Cancelar</Link>
      </div>
    </form>
  )
}
