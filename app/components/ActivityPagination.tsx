"use client"

import React from 'react'
import { ACTIVITIES_PER_PAGE } from '../utils/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ActivityPagination({activityLength}: {activityLength : number}) {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams);
  const router = useRouter()
  const pathname = usePathname();
  const actualPage = params.get("page") ?? 0

  const paginationContext = Array
  .from({ length: activityLength/ACTIVITIES_PER_PAGE + 1 }, (_, index) => index + 1);

  const handleClick = (val: number) => {
    console.log({actualPage, val}, actualPage != val)
    if(actualPage != val) {
      params.set("page", val.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <div className='w-full flex gap-6 justify-center'>
        {paginationContext.map((pageArray, index)=> <button onClick={() => handleClick(index+1)} className={`btn bg-transparent ${actualPage == index+1 && "bg-gray-500"}`} key={index}>{pageArray}</button>)}
    </div>
  )
}
