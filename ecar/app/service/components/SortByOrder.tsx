'use client'

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortByOrder() {
  // Defines import variables
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
  
      return params.toString()
    },
    [searchParams]
  )
  
  return (
    <nav className='w-full border-b-2 border-b-slate-500'>
      
      <div className="w-fit flex flex-row mx-auto | font-semibold text-lg border-orange-300 border-r-2 child:border-inherit child:border-l-2 child:px-3 child:py-1.5">
        {/* Determined useRouter() is better */}
          <span className='font-semibold text-slate-100'>
              By Order: {' '}
          </span>
          {/* Ascend */}
          <button className="text-orange-600 duration-300 hover:text-slate-100"
          onClick={() => {
              // <pathname>?sort=asc
              router.push(pathname + '?' + createQueryString('sort', 'asc'));
              router.refresh();
          }}
          >
            Ascend
          </button>
  
          {/* Descend */}
          <button className="text-orange-600 duration-300 hover:text-slate-100"
          onClick={() => {
              // <pathname>?sort=asc
              router.push(pathname + '?' + createQueryString('sort', 'desc'))
              router.refresh();
          }}
          >
            Descend
          </button>
      </div>
  </nav>
  
  )
}