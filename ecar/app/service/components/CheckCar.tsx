"use client"
import { Car } from "./service";
import { getCarBySpecId } from "../handleCars";
import { useState, useEffect } from "react";
import { UserCar } from "@/app/dashboard/saved-vehicles/saved-vehicles";


function CheckCar({ carId }: any) {
    const [bool, setBool] = useState(false);

    async function handleCar(car: Car) {
        if (bool == true) {
            const res = await fetch('/api/removeVehicle', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(String(car))
              });
        
            if (res.ok) {
                console.log("Removed Vehicle") 
            } else { console.log("Failed to Remove Vehicle")}

        } else { 
            const res = await fetch('/api/saveVehicleById', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(String(car))
              });
        
              if (res.ok) { 
                setBool(true);
                console.log("Added Vehicle to User") 
            } else { console.log("Failed to Add Vehicle")}
        }
        
        return;
    }

    async function checkCar() {
        let array: any[] = [];
        // copies logic from formCars() in service page
        const res = await fetch('/api/getVehicles', {
            method: 'GET',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        }) as any;
    
        const data = await res.json();
        if (!data.res) { console.log("data.res failed", data); return ["false"] }
        const userCars = data.res as UserCar[];
        console.log("res", userCars);
    
        for (let i = 0; i < userCars.length - 1; i++) {
            const res = await getCarBySpecId(userCars[i].carId!);
            console.log("getCarBySpecId returned ", res)
            array.unshift(res);     
        } // setCars once finished fetching
        return array as UserCar[];
    }
    
    useEffect(() => {
        checkCar().then((carArray) => {
            if (carArray[0] != "false") {
                for (let i = 0; i < carArray.length; i++) {
                    let gotCar = carArray[i] as UserCar;
                    var userCar = document.getElementById(String(gotCar.carId));
                    if (userCar) {
                        setBool(true);
                        i = carArray.length;
                        console.log("carId exists on user", carId)
                    }
                }
            }
        })
    }, [])

    return ( 
    <>
        <button onClick={() => console.log(bool)}>
            log bool
        </button>
        {bool && (
        <> 
            <li key="learn-more" className="relative">
                <button id={carId} onClick={() => {
                    handleCar(carId);
                    }} className="w-fit bg-slate-700 rounded-md -m-2 p-1 absolute right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(20, 200, 240)" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(240, 110, 20)" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </li> 
        </>
        )}
    
        {!bool && (
        <> 
            <li key="learn-more" className="relative">
                <button id={carId} onClick={() => {
                    handleCar(carId);
                    }} className="w-fit bg-sky-400 rounded-md -m-2 p-1 absolute right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(240, 110, 20)" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </li> 
        </>
        )}

    </>
    );
}

export default CheckCar;
