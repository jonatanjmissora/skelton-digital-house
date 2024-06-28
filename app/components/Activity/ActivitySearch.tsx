"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function ActivitySearch() {

  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const handleChange = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search !== "") {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300)

  return (
    <input
      onChange={(e) => handleChange(e.target.value)}
      className='p-2'
      type="text"
      placeholder={"Busca en tu actividad"}
      defaultValue={searchParams.get('search')?.toString()}
    />
  )
}
