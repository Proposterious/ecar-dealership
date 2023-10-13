"use client"
import { useState } from 'react';
import { getCars, getImages } from "./fetchCars";

function CarList() {
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
            
            <section>
                <div className="max-w-screen mt-12 grid grid-flow-row grid-cols-4">
                    {data && data.map(car =>
                        <ul key={car.id} className='w-fit font-semibold text-lg space-y-1 mb-12'>

                            <li key="name" className='text-black font-bold'>
                                Name: {car.make_model.make.name + ' ' + car.make_model.name}
                            </li>
                            
                            <li key="id">
                                Car #{car.id}
                            </li>

                            <li key="type">
                                Type: {car.name}
                            </li>

                            <li key="make">
                                Make: {car.description}
                            </li>
                            
                            


                        </ul>
                        )
                    }
                </div>

                <button onClick={displayPage}>
                    Click Here
                </button>
            </section>
        </main>
    )
   
}

export default CarList;