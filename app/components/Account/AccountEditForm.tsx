"use client"

import { useRouter } from 'next/navigation'
import { editAlias } from '../../services/account.services'
import Link from 'next/link'
import { AccountDataTypes } from '@/app/types/account.types'

export default function AccountEditForm({ accountData, token }: { accountData: AccountDataTypes, token: string }) {

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const accountAlias = {
      alias: event.currentTarget.alias.value
    }

    const aliasEditResp = await editAlias(accountData.id.toString(), accountAlias, token)
    console.log("Alias editado", { aliasEditResp })
    router.push(`/dashboard/profile`)
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4'>
      <span>
        CVU: {accountData.cvu}
      </span>

      <div className='flex gap-2 items-center'>
        <label htmlFor="alias">Alias: </label>
        <input
          id="alias"
          type="text"
          name="alias"
          required
          defaultValue={accountData.alias}
          className='border border-gray-500 p-2 text-center w-max'
        />
      </div>
      <div className='flex gap-4 mt-4'>
        <button type="submit" className='btn w-max'>Editar</button>
        <Link href={`/dashboard/profile`} className='btn'>Cancelar</Link>
      </div>

    </form>
  )
}
