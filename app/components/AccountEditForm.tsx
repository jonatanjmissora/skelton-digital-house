"use client"

import React from 'react'
import { editUser } from '../services/user.services'
import { AccountDataTypes } from '../api/accounts/route'
import { editAccountAlias } from '../services/account.services'

export default function AccountEditForm({ accountData, token }: { accountData: AccountDataTypes, token: string }) {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const accountAlias = {
      alias: event.currentTarget.alias.value
    }

    const accountEditResp = await editAccountAlias(accountData.id.toString(), accountAlias, token)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4'>
      <span>
        CVU: {accountData.cvu}
      </span>

      <div className='flex gap-4'>
        <input
          type="text"
          name="alias"
          required
          defaultValue={accountData.alias}
          className='border border-gray-500 p-2 text-center w-max'
        />
        <button type="submit" className='btn w-max'>Editar</button>
      </div>

    </form>
  )
}
