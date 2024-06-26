"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function ActivitySearch() {

    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [search, setSearch] = useState<string>("")
    const [debounced] = useDebounce(search, 300)

    useEffect(() => {
      const params = new URLSearchParams(searchParams);
    
      if (search !== "") {
        params.set('search', search);
      } else {
        params.delete('search');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, [search])

  return (
    <input 
    onChange={(e) => setSearch(e.target.value)} 
    className='p-2' 
    type="text" 
    placeholder={"Busca en tu actividad"} 
    defaultValue={searchParams.get('search')?.toString()}
    />
  )
}
