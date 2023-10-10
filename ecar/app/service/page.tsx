"use client"
import { useState } from 'react';
import { getCars } from "./getCars";

function Service() {
    const [data, setData] = useState(null) as any;

    async function displayPage() {
        // Fetch data from 'carapi'
        var carArray = await getCars() as any;
        console.log(carArray)
        
        // Update data 'useState'
        setData(carArray);

    }

    return (
        <main className="min-h-screen w-full bg-slate-100 py-4 px-12">
            <section className="max-w-screen mt-12 grid grid-flow-row grid-cols-4">
                {data && data.map(car =>
                    <ul key={car.id} className='w-fit font-semibold text-lg space-y-1 mb-12'>

                        <li key="name" className='text-black font-bold'>
                            Name: {car.make_model.make.name + ' ' + car.make_model.name}
                        </li>
                        
                        <li key="id">
                            Car #{car.id}
                        </li>

                        <li key="type">
                            <span className="type peer">Type: {car.name}</span>
                            <span className="type tooltip peer-[.type]:hover:invisible |rounded shadow-lg p-1 bg-orange-600 text-slate-100">
                                Make: {car.description}
                            </span>
                        </li>
                        
                        


                    </ul>
                    )
                }
            </section>
 
            <button onClick={displayPage}>
                Click Here
            </button>
        </main>
    )
   
}

export default Service;