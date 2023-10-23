'use client'

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";


function SortByPage() {
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

//  Algorithm to sort #s as HTMLElement
    var numList: any = [];
    var nums: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    nums.forEach((num: number, index: number) => {
        numList.push(<button key={index} className="text-orange-600 duration-200 hover:text-slate-100"
        onClick={() => {
            router.push(pathname + '?' + createQueryString('page', `${num}`));
            router.refresh();
        }}>
                {num}
            </button>);
      });

    return ( 
        <nav id="search-nav" className='w-fit mx-auto | border-r-orange-300 border-r-2'>

            <div className="flex flex-row | text-lg child:px-3 child:py-1 child:border-l-2 child:border-orange-300">
                <span className='font-semibold text-slate-100'>
                    By Page #:
                </span>
                {numList}
            </div>

        </nav>
     );
}

export default SortByPage;