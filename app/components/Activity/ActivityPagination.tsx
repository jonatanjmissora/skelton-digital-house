"use client"

import React from 'react'
import { ACTIVITIES_PER_PAGE } from '../../utils/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ActivityPagination({ totalActivityLength }: { totalActivityLength: number }) {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams);
  const router = useRouter()
  const pathname = usePathname();
  const actualPage = params.get("page") ?? 0

  const paginationContent = Array
    .from({ length: totalActivityLength / ACTIVITIES_PER_PAGE }, (_, index) => index + 1);

  const handleClick = (val: number) => {
    if (actualPage != val) {
      params.set("page", val.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <div className='w-full flex gap-6 justify-center'>
      {paginationContent.map((pageArray, index) =>
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`btn ${actualPage == (index + 1) ? "bg-gray-500" : "bg-transparent"}`}
        >
          {pageArray}
        </button>)}
    </div>
  )
}
