"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
function SavedVehicles() {
    const { data: session } = useSession();
    const [ cars, setCars ] = useState([]);

    async function handleCars(userId: string) {
        const userCars = await fetch('')
    }

    return (
        <section id="saved-vehicles" className="flex n-xs:flex-col n-md:flex-row justify-evenly">
            <div className="w-2/5 bg-slate-200 rounded-lg p-3 mt-6 ">
                <h2 className="text-orange-600 font-semibold ">
                    Saved Vehicles
                </h2>
            </div>
            <div className="w-2/5 bg-slate-200 rounded-lg p-3 mt-6 ">
                <h2>
                    List?
                </h2>
            </div>
        </section>
     );
}

export default SavedVehicles;