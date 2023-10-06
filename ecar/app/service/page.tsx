"use client"
import { useState } from 'react';
import { getCars } from "./getCars";

function Service() {
    const [data, setData] = useState(null) as any;

    async function displayPage() {
        // Fetch data from 'carapi'
        var response = await getCars() as any;
        const cars = response;
        
        // Update data 'useState'
        setData(cars);

    }

    

    return (
        <main className="flex flex-flow-row gap-10">
            {data && 
            data.map(car =>
                <ul key={car.id} className='space-y-1 inline-block'>
                            <li key="name" className='text-black font-semibold text-2xl'>Name: {car.make.name + ' ' + car.name}</li>
                            <li key="position" className='text-orange-600 font-bold text-2xl'>
                                Type: {car.type}
                            </li>
                            <li key="description" className='text-slate-800'>
                                {car.make_model_trim}
                            </li>
                        </ul>
                )
            }
            <button onClick={displayPage}>
                Click Here
            </button>
        </main>
    )
   
}

export default Service;