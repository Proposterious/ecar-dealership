'use client'

import Link from "next/link";
import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ExampleParams() {
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
      <section className='w-full border-b-2 border-b-slate-500'>
        
        <div className="w-fit flex flex-row mx-auto | text-sm text-slate-600 border-orange-300 border-r-2 child:border-inherit child:border-l-2 child:px-1 child:py-1.5">
            {/* using useRouter */}
            <span className='border-l-2 '>
                Sort By: {' '}
            </span>
            <button
            onClick={() => {
                // <pathname>?sort=asc
                router.push(pathname + '?' + createQueryString('sort', 'asc'))
            }}
            >
            Ascend
            </button>
    
            {/* using <Link> */}
            <Link
            href={
                // <pathname>?sort=desc
                pathname + '?' + createQueryString('sort', 'desc')
            }
            >
            Descend
            </Link>
        </div>
    </section>
    
    )
  }