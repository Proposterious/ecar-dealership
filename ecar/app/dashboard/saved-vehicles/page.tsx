"use client"
// functions
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getCarBySpecId } from "@/app/service/handleCars";

import { Car, UserCar } from "./saved-vehicles"; // ts interface
import Link from "next/link"; // built-in component
import Image from "next/image"; // built-in component
import Loader from "@/app/loading"; // suspense
//  static image imports
import logo from "@/public/car-logo.png"
import suvImage from "@/public/img/car-models/sketch_suv.jpg";
import sedanImage from "@/public/img/car-models/sketch_sedan.jpg";


function SavedVehicles() {
    const [ cars, setCars ] = useState<Car[] | [] | any[]>([]);
    const [ numCars, setNumCars ] = useState(0);
    const [ makesDict, setMakesDict ] = useState<any>({});

    async function handleCars() {
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
        if (!data) { console.log("got no cars"); return ["false"] }
        
        const userCars = data.res as UserCar[];
        console.log("userCars", userCars)

        for (let i = 0; i < userCars.length; i++) {
            const carById = await getCarBySpecId(userCars[i].carId as string);
            array.push(carById);
            console.log("carById array", array)
        } // setCars once finished fetching
        
        for (let i = 0; i < array.length; i++) {
            var currentCar = array[i];
            // filter car by its name(s)
            let carName = `${currentCar.make_model.make.name} ${currentCar.make_model.name}`;
            console.log(carName)

        // define str, strList from Car's description
            let str = currentCar.description as string;
            let strList = str.split(' ');
        // handles images
            if (strList.includes("Sedan")) {
                currentCar["img"] = sedanImage;
                console.log("was img atr", currentCar.img)
                console.log("has sedan", str); 

            } else if (strList.includes("SUV")) {
                currentCar["img"] = suvImage;
                console.log("was img atr", currentCar.img)
                console.log("has suv", str);

            } else { 
                currentCar["img"] = logo; 
                console.log("type undefined or base")
            }
        }
        return array;
    }

    useEffect(() => {
        console.log("Running useEffect()...")
        let newCars: Car[] | any[] = [];
        let newMakesDict: any = {};
        Promise.resolve(handleCars()).then((array: Car[] | any[]) => {  
            array.forEach((car) => {
                const prevCar = newCars.findIndex((carRef) => {
                    return car.id === carRef.id
                })
                if (prevCar < 0) { newCars.push(car) };
            });
            console.log("newCars", newCars)
            console.log("data", array)
            setCars((cars) => { 
                console.log("prevCars", cars)
                // Add user's cars to array
                newCars.forEach((car) => {
                    if (car = "false") { return ["false"] 
                    } else if (car.make_model.make.name != undefined) { // if user has cars
                        if (!newMakesDict[car.make_model.make.name]) {
                            console.log("car name not in dictionary")
                            newMakesDict[car.make_model.make.name] = 1
                            
                        } else { 
                            console.log("car name in dictionary", newMakesDict)
                            newMakesDict[car.make_model.make.name] = newMakesDict[car.make_model.make.name] + 1;
                        }
                    } else { console.log("No make_model.name")}
                    // todo: MAKE A DICT FOR EACH ATTRIBUTE FOR VEHICLE STATISTICS SPACE
                })
                setMakesDict(newMakesDict);
                if (newCars[0] != "false") { setNumCars(newCars.length) };
                return newCars;
            });
        });
    }, [])

    return (
        <section id="saved-vehicles" className="flex n-xs:flex-col n-md:flex-row justify-evenly">
            <article className="w-2/5 h-fit bg-slate-200 rounded-lg p-3">
                <h2 className="text-center bg-slate-700 p-3 rounded-md text-lg text-orange-600 font-semibold">
                    Vehicles Statistics
                </h2>

                <div className="bg-slate-100 p-3 border-t-orange-600 border-t-2 mt-2 | flex n-xs:flex-row n-xs:child:border-2 n-xs:child:border-black n-md:child:border-0 md:flex-col child:w-full justify-evenly">

                    <div className="">
                        <h3 className="font-normal tracking-wide underline">
                            Currently <span className="font-extrabold">{numCars}</span> Vehicles Saved
                        </h3>
                    </div>

                    <div>
                        <h3 className="font-normal tracking-wide underline">
                            Cars of Specific Make
                        </h3>
                        {Object.values(makesDict) && (
                            Object.entries(makesDict).map(([carName, carInstances]: any) => (
                            <li key={carName} className="list-inside">
                                <span className="font-semibold">{carName} - </span> {carInstances}
                            </li>
                            ))
                        )}
                    </div>

                    <div>
                        <h3 className="font-normal underline tracking-wide">
                            Favorite Car Type &#40;Sedan, SUV, Base, etc.&#41;
                        </h3>
                    </div>

                    <div>

                    </div>
                </div>
            </article>

            <article className="w-2/5 h-fit bg-orange-300 rounded-lg p-3">

                <h2 className="text-center text-lg font-semibold text-slate-200 bg-orange-600 py-3 px-2 rounded-lg">
                    Your Vehicles List
                </h2>

                <div className="flex flex-col items-center w-full h-[36rem] max-h-[36rem] child:w-2/3 overflow-scroll overscroll-y-contain snap-y snap-mandatory child:snap-always child:snap-center">
                {!cars[0] && <Loader />}
            {cars[0] == "false" && (
                <div className="my-auto items-center child:w-fit flex flex-col">
                    <p className=" font-bold text-center text-xl text-red-500">
                        You Have Saved 0 Vehicles
                    </p>
                    <Link href='/service' className="font-semibold bg-orange-500 text-slate-100 p-3 rounded-md">
                        View Vehicles
                    </Link>
                </div>
            )}
            {cars[0] != "false" && (
                <>
                {cars.map((car: Car) => (
                
                <ul key={car.id} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs | transition duration-200 hover:bg-orange-500 hover:shadow-2xl hover:-translate-y-2 hover:text-slate-100 ease-in shadow-orange-700/70 rounded-lg hover:cursor-default m-4 py-4 px-3">
                <li key="save" className="relative">
                    <button onClick={() => {
                        
                      }} className="w-fit bg-slate-700 rounded-md -m-2 p-1 absolute right-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill='rgb(20, 200, 240)' viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-8 h-8">
                      <path strokeLinecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                </li>
                <li key="img" className="w-fit mx-auto">
                  <Image src={car.img} alt={car.name!} className="bg-inherit" style={{ objectFit: "contain", maxHeight: "238px" }} />
                </li>

                <li key="name" className="font-bold underline">
                  Name: {car.make_model.make.name + ' ' + car.make_model.name}
                </li>

                <li key="id">
                  Car #{car.id}
                </li>

                <li key="type" className="text-sm">
                  Type: {car.name}
                </li>

                <li key="make" className="text-sm">
                  Make: {car.description}
                </li>
                <li key="learn-more" className="pt-3">
                  <Link href={`/service/car/${car.make_model.id}`} className="text-slate-100 duration-300 bg-sky-400 rounded-lg p-3 hover:text-black">
                    Learn More
                  </Link>
                </li>
              </ul>
                    )) as unknown as React.ReactNode }
                    
                </>
            )}
                </div> 
            </article>
        </section>
     );
}

export default SavedVehicles;