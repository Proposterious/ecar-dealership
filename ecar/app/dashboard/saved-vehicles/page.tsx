"use client"
// functions

import { useState, useEffect } from "react";
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
    // Car[] for recording data and user actions
    const [ cars, setCars ] = useState<Car[] | [] | any[]>([]);
    const [ prevCars, setPrevCars ] = useState<string[]>([]);
    const [ disableButton, setDisableButton ] = useState<boolean>(true);

    // attributes for vehicle statistics
    const [ makesDict, setMakesDict ] = useState<any>({});
    const [ typesDict, setTypesDict ] = useState<any>({});
    const [ numCars, setNumCars ] = useState(0);

    
    async function removeVehicle(choseCarId: string) {
        document.getElementById(choseCarId)?.classList.add('hidden')

        const res = await fetch('/api/removeVehicle', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(choseCarId)
        }) as any; // does not accept 'NextResponse' as type

        if (res.ok) {
            console.log("Car successfully removed\n", res.status)
            setDisableButton(false)
            setPrevCars((prevCars) =>  [choseCarId, ...prevCars])
        } else if (res.error) {
            console.log(`Failed to remove vehicle... \n${res.error}`)
            document.getElementById(choseCarId)?.classList.remove('hidden')
        } return;
    }

    async function undoRemoval(removedCars: string[]) {
        console.log("prevCars", removedCars)
        if (removedCars.length = 0) { 
            setDisableButton(true)
            console.log("found no previous cars")    
            return; 
        }
        let removedCar: string = removedCars[0]
        console.log("fetching car of id", removedCar)
        const res = await getCarBySpecId(removedCar)

        if (res) { // if car retrieved
            console.log("retrieved car: ", res) 
            setCars((cars) => [res, ...cars])
        } else { console.log("Failed to retrieve car ", removedCar)}
    }

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

        if (res.error) { 
            console.log(res.error, res.status)
            return ["false"];
        }
        const data = await res.json()
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
        let newMakesDict: any = {}; let newTypesDict: any = {};
        Promise.resolve(handleCars()).then((array: Car[] | any[]) => {  
            array.forEach((car) => {
                const prevCar = newCars.findIndex((carRef) => {
                    return car.id === carRef.id
                })
                if (prevCar < 0) { newCars.push(car) };
            });
            setCars((cars) => { 
                console.log("prevCars", cars)
                // Add user's cars to array
                newCars.every((car) => {
                    if (car === "false") { return ["false"] 
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
                }); newCars.every((car) => {
                    if (car === "false") { return ["false"] 
                    } else if (car.name != undefined) { // if user has cars
                        if (!newTypesDict[car.name]) {
                            console.log("car name not in dictionary")
                            newTypesDict[car.name] = 1
                        } else { 
                            console.log("car name in dictionary", newTypesDict)
                            newTypesDict[car.name] = newTypesDict[car.name] + 1;
                        }
                    } else { console.log("No car type specified")}
                    // todo: MAKE A DICT FOR EACH ATTRIBUTE FOR VEHICLE STATISTICS SPACE
                }) 
                setMakesDict(newMakesDict);
                setTypesDict(newTypesDict);
                if (newCars[0] != "false") { setNumCars(newCars.length) };
                console.log(newMakesDict)
                return newCars;
            });
        });
    }, [])

    return (
        <section id="saved-vehicles" className="flex n-xs:flex-col n-xs:justify-evenly n-xs:child:mx-auto n-md:flex-row n-md:justify-evenly">
            <article id="user-stats" className="n-xs:w-full n-md:w-2/5 n-xs:h-3/5 n-md:h-fit bg-slate-200 rounded-lg p-3">
                <div id="stats-header" className="select-none">
                    <h2 className="text-center bg-slate-700 p-3 rounded-md text-xl text-orange-500 font-semibold tracking-wider">
                        Vehicles Statistics
                    </h2>
                </div>

                <div id="stats-body" className="bg-slate-100 p-4 border-t-orange-600 border-t-2 mt-2 | n-xs:h-[36rem] max-h-[36rem] n-xs:grid n-xs:grid-flow-row n-xs:grid-cols-1 n-xs:child:border-2 n-xs:child:border-b-0 n-xs:child:border-sky-300 n-xs:child:p-2 n-xs:overflow-y-scroll n-xs:overscroll-contain | n-md:h-fit n-md:child:p-0 n-md:child:border-0 n-md:flex md:flex-col n-md:space-y-3 child:w-full n-md:justify-evenly">
                    <div>
                        <h3 className="text-lg font-bold underline tracking-wider">
                            Cars of Specific Make
                        </h3>
                        {Object.values(makesDict) && (
                            Object.entries(makesDict).map(([carName, carInstances]: any) => (
                            <li key={carName} className="list-none flex n-xs:flex-row | n-md:flex-col n-md:w-1/2">
                                <span className="tracking-wide font-semibold">{carName} - {carInstances}</span>
                            </li>
                            ))
                        )}
                    </div>

                    <div className="px-12">
                        <h3 className="text-lg font-bold underline tracking-wider">
                            Car by Type <span className="font-semibold">&#40;Sedan, SUV, Base, etc.&#41;</span>
                        </h3>
                        {Object.values(typesDict) && (
                            Object.entries(typesDict).map(([carName, carInstances]: any) => (
                            <li key={carName} className="list-none flex n-xs:flex-row | n-md:flex-col n-md:w-1/2">
                                <span className="tracking-wide font-semibold">{carName} Type - {carInstances}</span>
                            </li>
                            ))
                        )}
                    </div>

                    <sub className="w-fit select-none text-right text-sm text-orange-600 font-light underline tracking-wide">
                        You Currently Have {numCars} Vehicles Saved
                    </sub>

                </div>
            </article>

            <article id="user-vehicles" className="n-xs:w-full n-md:w-2/5 h-fit bg-orange-300 rounded-lg p-3 relative">
                <h2 className="text-center text-xl font-semibold tracking-wider text-slate-200 bg-orange-600 py-3 px-2 rounded-lg">
                    Your Vehicles List
                </h2>
                
                <section>
                    <div className="flex flex-col items-center w-full n-xs:h-[32rem] n-md:h-[36rem] max-h-[36rem] child:w-2/3 overflow-scroll overscroll-y-contain snap-y n-xs:snap-proximity n-md:snap-mandatory child:snap-always child:snap-center">
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
                        
                        <ul key={car.id} id={String(car.id)} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs | transition duration-200 hover:bg-orange-500 hover:shadow-2xl hover:-translate-y-2 hover:text-slate-100 ease-in shadow-orange-700/70 rounded-lg hover:cursor-default m-4 py-4 px-3">
                        <li key="save" className="relative">
                            <button onClick={() => {
                                removeVehicle(String(car.id));
                            }} className="w-fit bg-slate-700 rounded-md -m-2 p-1 absolute right-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill='rgb(20, 200, 240)' viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
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
                </section>

                <button disabled={disableButton} onClick = {() => undoRemoval(prevCars)} className="bg-slate-400 py-2 px-3 text-slate-100 font-semibold rounded-lg transition ease-in-out duration-300 hover:bg-slate-300 hover:text-slate-500 hover:ring-2 hover:ring-slate-500">
                    Restore Last Vehicle
                </button>
            </article>
        </section>
     );
}

export default SavedVehicles;