"use client"

import { AccountDataTypes } from "@/app/types/account.types";
import Link from "next/link"

export default function AccountData({ accountData }: { accountData: AccountDataTypes }) {

  const handleClick = (value: string) => {
    const toCopy = value === "cvu" ? accountData.cvu : accountData.alias
    navigator.clipboard.writeText(toCopy);
    alert(`${value} copiado!`)
  }

  return (
    <div className="w-full flex justify-between p-8 border border-gray-500">
      <div className='flex gap-2'>
        <span>CVU : {accountData.cvu}</span>
        <button onClick={() => handleClick("cvu")} className='border-b border-black'>copiar</button>
      </div>
      <div className='flex gap-2'>
        <span>Alias : {accountData.alias}</span>
        <button onClick={() => handleClick("alias")} className='border-b border-black'>copiar</button>
        <Link href={`/dashboard/accounts/${accountData.id}`}>editar</Link>
      </div>
    </div>
  )
}
