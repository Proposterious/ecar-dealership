// function imports
import { useState } from "react"; // react
import { getCarById } from "../handleCars"; // custom

import smallArrowDownBlack from "./smallArrowDownBlack";
import smallArrowDownWhite from "./smallArrowDownWhite";

function SearchCarId() {
    const [str, setStr] = useState('') as any;
    const [names, displayNames] = useState(null) as any;
    
    // replace these with dynamic arrays later
    const makes = ['SUV', 'Sedan', 'Base']

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setStr(value);
    }

    return ( 
        
        <section id="search-car" className="pt-4 bg-orange-500">
            <form className="w-fit flex flex-row mx-auto py-2 | rounded-sm border-2 border-white bg-orange-600 | font-semibold text-slate-100" action="#" onSubmit={() => getCarById(str)}>
            {/* ENTER AN EMAIL */}
            
                <span className="my-auto px-3 py-1 | underline underline-offset-4 decoration-2">
                    Filter by Search
                </span>

                <nav className="w-fit flex flex-row flex-shrink | child:my-auto child:px-2 border-x-orange-600  | border-white">

                    <div id="search-id" className="flex flex-row child:my-auto | font-normal text-slate-100 | border-l-2 border-r-2">
                        <label htmlFor="id" className="font-semibold">
                            Car #
                        </label>
                        <div className="w-fit max-w-fit">
                            <input id="id" name="id"
                            type="text" value={str}
                            onChange={handleInputChange}
                            placeholder="Search by #"
                            size={8}
                            maxLength={4}
                            className="w-fit ml-2 | n-xs:text-sm n-md:text-md text-center | px-2 py-1 rounded-sm border-0 | shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-orange-300 placeholder:leading-4 bg-orange-500 focus:ring-2 focus:ring-inset focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div id="search-name" className="-ml-4 border-r-2">
                        <button type="button" className="flex flex-row h-fit"/*onClick(() => displayNames(makes))*/><span className={`px-3 py-2`}/>
                            Name 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                    <div id="search-type" className="-ml-4 border-r-2">
                    <button type="button" className="flex flex-row h-fit"/*onClick(() => displayNames(makes))*/><span className={`px-3 py-2`}/>
                            Type 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                    <div id="search-make" className="-mr-1">
                    <button type="button" className="-ml-4 flex flex-row h-fit"/*onClick(() => displayNames(makes))*/><span className={`px-3 py-2`}/>
                            Make 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    
                </nav>
               
                
            </form>
        </section>
     );
}

export default SearchCarId;