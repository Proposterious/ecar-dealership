"use client"
// function imports
import { useState, useEffect, useCallback } from "react"; // react
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { readCarAttr, writeCarAttr } from "../function/handleJSON";

function SearchCar() {
    const [id, setId] = useState("");
    const [currentList, setAttr] = useState<any>(undefined);

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    function getRand() {
        var rand = Math.floor(Math.random() * 6000)
        return rand
    }

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

    useEffect(() => {{
        readCarAttr().then((currentList) => {
        setAttr(currentList);
    })}}, []);

    return ( 
        
        <section id="search-car" className="py-3 bg-sky-100">
            <div className="w-fit flex flex-row mx-auto py-2 | rounded-sm border-2 border-white bg-orange-600 | font-semibold text-slate-100">
            {/* ENTER AN EMAIL */}
            
                <span className="my-auto px-3 py-1 | underline underline-offset-4 decoration-2">
                    Filter by Search
                </span>

                <nav className="w-fit flex flex-row flex-shrink | child:my-auto child:px-2 border-x-orange-600 | border-white">

                    <form id="search-id" action="#" onSubmit={() => router.push(pathname + '?' + createQueryString('id', `${id}`))} className="flex flex-row child:my-auto | font-normal text-slate-100 | border-l-2 border-r-2">
                        <label htmlFor="id" className="font-semibold">
                            Car #
                        </label>
                        <div className="w-fit max-w-fit">
                            <input id="id" name="id"
                            type="text" value={id}
                            onChange={() => setId(id)}
                            placeholder="Search by #"
                            size={8}
                            maxLength={4}
                            className="w-fit ml-2 | n-xs:text-sm n-md:text-md text-center | px-2 py-1 rounded-sm border-0 | shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-orange-300 placeholder:leading-4 bg-orange-500 focus:ring-2 focus:ring-inset focus:ring-orange-500"
                            />
                        </div>
                    </form>

                    <div id="search-name" className="border-r-2 child:z-50"> 
                        <div className="peer hover:cursor-pointer flex flex-row">
                            Name
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        
                        <ul id='car-names' className="w-fit h-52 ml-4 p-4 bg-slate-800 | font-normal text-slate-100 text-center space-y-0.5 child:py-1.5 | list-none absolute flex flex-col invisible hover:visible peer-hover:visible overflow-y-scroll overscroll-contain snap-y child:snap-start">
                            {currentList && currentList.carNames.map((name:string) => 
                            <li className="duration-300 hover:font-semibold hover:text-orange-600 hover:bg-slate-500" key={name + String(getRand())}>
                                <button type="button" onClick={() => {
                                router.push(pathname + '?' + createQueryString('name', `${name}`))
                                router.refresh()
                                console.log("clicked")}}>
                                    {name}
                                </button>
                            </li>
                            )}
                        </ul>
                    </div>

                    <div id="search-type" className="border-r-2 child:z-50"> 
                        <div className="peer hover:cursor-pointer flex flex-row">
                            Type
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        
                        <ul id='car-types' className="w-fit h-32 ml-4 p-4 bg-slate-800 | font-normal text-slate-100 text-center space-y-0.5 child:py-1.5 | list-none absolute flex flex-col invisible hover:visible peer-hover:visible overflow-y-scroll overscroll-contain snap-y child:snap-start">
                            {currentList && currentList.carTypes.map((type:string) => 
                            <li className="duration-300 hover:font-semibold hover:text-orange-600 hover:bg-slate-500" key={type}>
                                <button type="button" onClick={() => {
                                router.push(pathname + '?' + createQueryString('type', `${type}`));
                                router.refresh();}}>
                                    {type}
                                </button>
                            </li>
                            )}
                        </ul>

                    </div>
                    <div id="search-make" className="mr-1 border-r-2 child:z-50"> 

                        <div className="peer hover:cursor-pointer flex flex-row">
                            Make
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        
                        <ul id='car-makes' className="w-fit h-32 ml-4 p-4 bg-slate-800 | font-normal text-slate-100 text-center space-y-0.5 child:py-1.5 | list-none absolute flex flex-col invisible hover:visible peer-hover:visible overflow-y-scroll overscroll-contain snap-y child:snap-start">
                            {currentList && currentList.carMakes.map((make:string) => 
                            <li className="duration-300 hover:font-semibold hover:text-orange-600 hover:bg-slate-500 px-4" key={make}>
                                <button type="button" onClick={() => {
                                router.push(pathname + '?' + createQueryString('make', `${make}`));
                                router.refresh();}}>
                                    {make}
                                </button>
                            </li>
                            )}
                        </ul>

                    </div>
                    
                </nav>
               
                
            </div>
        </section>
     );
}

export default SearchCar;