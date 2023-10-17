"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { getCars } from "../handleCars";

import logo from "@/public/car-logo.png"
import suvImage from "@/public/img/car-models/sketch_suv.jpg";
import sedanImage from "@/public/img/car-models/sketch_sedan.jpg";

function CarList() {
    const [data, setData] = useState(null) as any;
    const [bool, setBool] = useState(null) as any;

    async function displayImage() {
        // Fetch data from 'carapi'
        var array = await getCars() as any;
        var checkCars = [] as any; // define empty array


        console.log('Should be the data as an array', array); // log prior to 'data' mutations

        for (let i = 0; i < array.length; i++) {
            // define str, strList from Car's description
            let str = array[i].description;
            let strList = str.split(' ');

            if (checkCars.includes(array[i].name)) { // if already exists
                console.log(`${array[i].name} already exists`) 
            } else if (strList.includes("Sedan")) {
                array[i]["img"] = sedanImage;
                console.log("was img atr", array[i].img)
                console.log("has sedan", str); 
                // Check if car in array
                array[i]
            } else if (strList.includes("SUV")) {
                array[i]["img"] = suvImage;
                console.log("was img atr", array[i].img)
                console.log("has suv", str);
            } else { 
                array[i]["img"] = logo; 
                console.log("type undefined or base")
            }
        }

        setData(array);
        console.log("new array", array);
        console.log("data after change", data);

        setBool(true);

        return;
    }

    // display cars onload
    useEffect(() => {
        displayImage();
    }, []);
  
    return (
            <section id="sell-cars" className='pt-2 pb-4 bg-orange-500'>
            {/* Cars-List/Grid */}
                <div id="car-list" className="min-h-screen w-full max-w-screen  bg-orange-500 | grid grid-flow-row n-xs:grid-cols-1 n-md:grid-cols-2 n-lg:grid-cols-4 px-12">  
                    {bool && data.map(car =>
                        
                        <ul key={car.id} className='bg-slate-100 | font-semibold text-center text-lg space-y-1 | shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg | m-4 px-2 pt-6 pb-4 hover:cursor-default'>  
                                                    
                            <li key="img" className="w-fit mx-auto">
                                <Image src={car.img} alt={car.name}
                                className="bg-inherit"
                                style={{objectFit:"contain", maxHeight:"238px"}} />
                            </li>

                            <li key="name" className='text-black font-bold'>
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
                                <button     className="bg-orange-500 rounded-lg p-3 hover:text-white">  
                                        Learn More
                                </button>
                            </li>
                        </ul>
                        
                    )}
                </div>
            </section>
    )
   
}

export default CarList;