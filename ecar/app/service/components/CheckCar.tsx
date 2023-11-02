"use client"
import { Car } from "./service";
import SaveCaution from "./SaveCaution";
import { getCarById, getCarBySpecId } from "../handleCars";
import { useState, useEffect } from "react";
import { UserCar } from "@/app/dashboard/saved-vehicles/saved-vehicles";
import { usePathname } from "next/navigation";

function CheckCar({ carId }: any) {
    const [bool, setBool] = useState(false);
    const [color, setColor] = useState("red");
    const pathname = usePathname()
    
    async function handleCar(car: Car) {
        const elem = document.getElementById(String(car));
        if (color == 'red') {
            elem?.classList.remove("bg-sky-400");
            elem?.classList.add("bg-black");
            setColor('rgb(20, 200, 240)')
        } else { 
            elem?.classList.add("bg-sky-400");
            elem?.classList.remove("bg-black");
            setColor('red');
            await fetch('/api/saveVehicleById', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(car)
              });
        
              console.log("Made request to add Vehicle");
        }
        
  
    }

    async function checkCar() {
        // copies logic from formCars() in service page
        var array: any[] = [];
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
            console.log("getCarbySpecId returned ", res)
            array.unshift(res);     
        } // setCars once finished fetching
        return array;
    }
    
    useEffect(() => {
        checkCar().then((carArray) => {
            const elem = document.getElementById(carId);
            if (carArray[0] != "false") {
                for (let i = 0; i < carArray.length - 1; i++) {
                    var userCar = document.getElementById(carArray[i].id)
                    if (userCar) {
                        elem?.classList.remove("bg-sky-400");
                        elem?.classList.add("bg-black");
                        setColor("rgb(20, 200, 240)")
                        console.log("carId exists on user", carId)
                        i = carArray.length;
                    }
                }
            }
        })
    }, [pathname])

    return ( 
        <>
            {bool && <SaveCaution />}
            <li key="learn-more" className="relative">
                <button id={carId} onClick={() => {
                    handleCar(carId);
                    if (bool != true) { setBool(true) };
                    }} className="w-fit bg-sky-400 rounded-md -m-2 p-1 absolute right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(240, 110, 20)" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </li> 
            </>
    );
}

export default CheckCar;