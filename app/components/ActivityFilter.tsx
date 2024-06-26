"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useRef } from 'react'

export default function ActivityFilter() {

  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const detailRef = useRef<HTMLDetailsElement>(null)

  const handleClick = (filter: string) => {
    if (detailRef.current !== null) detailRef.current.removeAttribute("open")
    
    const params = new URLSearchParams(searchParams);
    
    if (filter !== "") {
      params.set('filter', filter);
    } else {
      params.delete('filter');
    }
    router.replace(`${pathname}?${params.toString()}`);

  }

  return (
    <details ref={detailRef} className='relative'>
      <summary className='list-none'>Filtrar</summary>
      <ul className='absolute -bottom-[350%] right-0  bg-white p-2 w-max'>
        <li onClick={() => handleClick("")} className='p-1 hover:bg-gray-200'>ninguno</li>
        <li onClick={() => handleClick("hoy")} className='p-1 hover:bg-gray-200'>hoy</li>
        <li onClick={() => handleClick("mes")} className='p-1 hover:bg-gray-200'>último mes</li>
        <li onClick={() => handleClick("anio")} className='p-1 hover:bg-gray-200'>último año</li>
      </ul>
    </details>
  )
}
