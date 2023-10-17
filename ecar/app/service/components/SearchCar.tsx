import { useState } from "react";
import 

function SearchCarId() {
    const [str, setStr] = useState('') as unknown as string;

    const handleInputChange = (e: any) {
        setStr(e.target);
    }


    return ( 
        <section className="">
            <form className="w-fit flex flex-row mx-auto | rounded-sm border-2 border-white bg-orange-600 | font-semibold text-white" action="#" onSubmit={loginUser}>
            {/* ENTER AN EMAIL */}
            
                <span className="px-3 py-1">
                    Filter by Search:
                </span>

                <nav className="flex flex-row | child:px-3 child:py-1 child:border-x-2 border-x-orange-600">

                    <div>
                        Name
                    </div>

                    <div>
                        Type
                    </div>

                    <div>
                        Make
                    </div>
                    <div>
                        <form id="search-car-id">
                            Car #
                        </form>
                    </div>
                </nav>
                <div className="flex flex-row">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Car #
                    </label>
                    <div className="mt-2">
                        <input
                        id="id"
                        name="id"
                        type="text"
                        value={str}
                        onChange={handleInputChange}
                        placeholder="24"
                        className="n-xs:text-sm n-md:text-md | block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </form>
        </section>
     );
}

export default SearchCarId;