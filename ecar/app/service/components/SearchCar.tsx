"use client"
// function imports
import { useState, useCallback } from "react"; // react
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { getCarById, getCarByName, getCarByMake, getCarByType } from "../handleCars"; // custom

// typescript declaration
type StringDictionary = {
    id: string;
    name: string;
    make: string;
    type: string;
};

function SearchCar() {
    const [data, setData] = useState({
        id: "",
        name: "",
        make: "",
        type: "",
    });


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

    // replace these with dynamic arrays later
    const types = ['SUV', 'Sedan', 'Base'];
    const names = ['Acura', 'Alfa', 'Audi'];
    const makes = ['Acura', 'Alfa', 'Audi'];

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevProps) => ({
        ...prevProps,
        [name]: value
        }))
    }
    
    function hideList(key:string) {
        console.log(String(key))

        if (document.getElementById(key)?.classList.contains("invisible")) {
            document.getElementById(key)!.classList.remove('invisible')
            document.getElementById(key)!.classList.remove('child:invisible')
        } else { 
            document.getElementById(key)!.classList.add('invisible') 
            document.getElementById(key)!.classList.add('child:invisible')
        }

    }

    async function updateCars(params: StringDictionary) {
        // if no params -> quit function
        if (!params) { return }
        
        // iterate through params then search
        if (params.id !== "") { // search by id
            getCarById(params.id);
            console.log("id", params.id);
        } else if (params.name !== "") { // search by name
            getCarByName(params.name);
            console.log("name", params.name)
        } else if (params.make !== "") { // search by make
            getCarByMake(params.make);
            console.log("make", params.make)
        } else if (params.type !== "") { // search by type
            getCarByType(params.type);
            console.log("type", params.type);
        } else { console.log("search failed"); /* search failed */ }
    }

    return ( 
        
        <section id="search-car" className="py-3 bg-sky-100">
            <form className="w-fit flex flex-row mx-auto py-2 | rounded-sm border-2 border-white bg-orange-600 | font-semibold text-slate-100" action="#" onSubmit={() => updateCars(data)}>
            {/* ENTER AN EMAIL */}
            
                <span className="my-auto px-3 py-1 | underline underline-offset-4 decoration-2">
                    Filter by Search
                </span>

                <nav className="w-fit flex flex-row flex-shrink | child:my-auto child:px-2 border-x-orange-600 | border-white">

                    <div id="search-id" className="flex flex-row child:my-auto | font-normal text-slate-100 | border-l-2 border-r-2">
                        <label htmlFor="id" className="font-semibold">
                            Car #
                        </label>
                        <div className="w-fit max-w-fit">
                            <input id="id" name="id"
                            type="text" value={data.id}
                            onChange={handleInputChange}
                            placeholder="Search by #"
                            size={8}
                            maxLength={4}
                            className="w-fit ml-2 | n-xs:text-sm n-md:text-md text-center | px-2 py-1 rounded-sm border-0 | shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-orange-300 placeholder:leading-4 bg-orange-500 focus:ring-2 focus:ring-inset focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div id="search-name" className="-ml-4 border-r-2">
                        <button type="button" onClick={() => hideList("car-names")}className="flex flex-row h-fit">
                            <span className={`px-3 py-2`}/>
                            Name 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        
                        <ul id='car-names' className="w-fit ml-4 p-4 bg-slate-800 | font-normal text-slate-100 text-center space-y-2 | list-none absolute flex flex-col flex-wrap | invisible">
                            {names.map((name:string) => 
                            <li className="duration-500 hover:font-semibold hover:text-orange-600" key={name}>
                                <button onClick={() => {
                                router.push(pathname + '?' + createQueryString('name', `${name}`));
                                router.refresh();}}>
                                    {name}
                                </button>
                            </li>
                            )}
                        </ul>
                    </div>

                    <div id="search-type" className="-ml-4 border-r-2">
                        <button type="button" className="flex flex-row h-fit" onClick={() => hideList("car-types")}>
                            <span className={`px-3 py-2`}/>
                            Type 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        
                        <ul id='car-types' className="w-fit ml-4 p-4 bg-slate-800 | font-normal text-slate-100 text-center space-y-2 | list-none absolute flex flex-col flex-wrap | invisible">
                            {types.map((type:string) => 
                            <li className="duration-500 hover:font-semibold hover:text-orange-600" key={type}>
                                <button onClick={() => {
                                router.push(pathname + '?' + createQueryString('type', `${type}`));
                                router.refresh();}}>
                                    {type}
                                </button>
                            </li>
                            )}
                        </ul>

                    </div>

                    <div id="search-make" className="-mr-1">
                        <button type="button" className="flex flex-row h-fit | ml-2 pr-1" onClick={() => hideList("car-makes")}>
                            Make 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        <ul id='car-makes' className="w-fit p-4 bg-slate-800 | font-normal text-slate-100 text-center space-y-2 | list-none absolute flex flex-col flex-wrap | invisible">
                            {makes.map((make:string) => 
                            <li className="duration-500 hover:font-semibold hover:text-orange-600" key={make}>
                                <button>{make}</button>
                            </li>
                            )}
                        </ul>

                    </div>
                    
                </nav>
               
                
            </form>
        </section>
     );
}

export default SearchCar;