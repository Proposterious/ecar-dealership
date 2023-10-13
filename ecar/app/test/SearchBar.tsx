'use client'

import Link from "next/link";
import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";


function SearchBar() {
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

    var numList:[] = [];
    var nums:any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

    

    nums.forEach((num: number, index: number) => {
        numList.push(<button key={index} className="text-slate-600"
        onClick={() =>
            router.push(pathname + '?' + createQueryString('page', `${num}`))}>
                {num}
            </button>);
      });
    return ( 
        <nav id="search-nav" className='w-fit mx-auto | border-orange-300 border-r-2'>

            <section className="flex flex-row | text-sm child:px-1.5 child:py-1 child:border-l-2 child:border-orange-300">
                <span className='text-slate-600'>
                    Pages:
                </span>
                {numList}
            </section>

        </nav>
     );
}

export default SearchBar;