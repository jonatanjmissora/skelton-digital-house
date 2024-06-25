"use client"

import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

export default function ActivityFilter({ accountId }: { accountId: string }) {

  const router = useRouter()
  const detailRef = useRef<HTMLDetailsElement>(null)

  const handleClick = (query: string) => {
    if (detailRef.current !== null) detailRef.current.removeAttribute("open")
    if (!query) router.push(`/dashboard/accounts/${accountId}/activity`)
    else
      router.push(`/dashboard/accounts/${accountId}/activity?qry=${query}`)
  }

  return (
    <details ref={detailRef} className='relative'>
      <summary className='list-none'>Filtrar</summary>
      <ul className='absolute -bottom-[350%] right-0  bg-white p-2 w-max'>
        <li onClick={() => handleClick("")} className='p-1 hover:bg-gray-200'>ninguno</li>
        <li onClick={() => handleClick("hoy")} className='p-1 hover:bg-gray-200'>hoy</li>
        <li onClick={() => handleClick("mes")} className='p-1 hover:bg-gray-200'>ultimo mes</li>
        <li onClick={() => handleClick("anio")} className='p-1 hover:bg-gray-200'>ultimo año</li>
      </ul>
    </details>
  )
}
