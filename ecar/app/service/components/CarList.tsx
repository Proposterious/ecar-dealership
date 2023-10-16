"use client"
import Image from 'next/image';
import { useState } from 'react';

import { getCars, getImages } from "../handleCars";

import logo from "@/public/car-logo.png"
import suvImage from "@/public/img/car-models/sketch_suv.jpg";
import sedanImage from "@/public/img/car-models/sketch_sedan.jpg";

function CarList() {
    const [data, setData] = useState(null) as any;
    const [bool, setBool] = useState(null) as any;

    async function displayPage() {
        // Fetch data from 'carapi'
        var carArray = await getCars() as any;
        console.log(carArray)
        
        // Update data 'useState'
        setData(carArray);
        return true;
    }

    async function displayImage() {
        // Fetch data from 'carapi'
        var array = await getCars() as any;
       

        console.log('Should be the data as an array', array); // log prior to 'data' mutations

        for (let i = 0; i < array.length-1; i++) {
            let str = array[i].description;
            let strList = str.split(' ');
            if (strList.includes("Sedan")) {
                array[i]["img"] = sedanImage;
                console.log("was img atr", array[i].img)
                console.log("has sedan", str); 
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

    return (
            <section id="sell-cars" className='pt-6 pb-4 bg-orange-500'>
            {/* Display Cars */}
                <button className="mx-auto text-white text-lg font-semibold | rounded-sm border-2 border-black  bg-orange-600 p-3 block" onClick={displayImage}>
                    Display Images
                </button>

            {/* Cars-List/Grid */}
                <div id="car-list" className="min-h-screen w-full max-w-screen  bg-orange-500 | grid grid-flow-row n-xs:grid-cols-1 n-md:grid-cols-2 n-lg:grid-cols-4 px-12">  
                    {bool && data.map(car =>
                        <button className="bg-slate-100 | font-semibold text-center text-lg space-y-1 | shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg | m-4 px-2 pt-6 pb-4 hover:cursor-default">  
                            <ul key={car.id} className='list-none'>  
                                                        
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

                                <li key="type">
                                    Type: {car.name}
                                </li>

                                <li key="make" className="text-sm">
                                    Make: {car.description}
                                </li>
                            
                            </ul>
                        </button>
                    )}
                </div>
            </section>
    )
   
}

export default CarList;