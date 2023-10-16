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

    function removeAlert() {
        const alert = document.getElementById("service-alert") as unknown as HTMLElement;
        console.log("Removing alert...", alert);
        alert.className = 'hidden';
    }

    async function displayPage() {
        // Fetch data from 'carapi'
        var carArray = await getCars() as any;
        console.log(carArray)
        
        // Update data 'useState'
        setData(carArray);
        return;
    }

    async function displayImage(array: any) {
        console.log('Should be the data as an array', array);

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
        <main className="min-h-screen w-full border-4 border-orange-700 bg-orange-500 pb-4">
            <section id="service-alert" className="w-full min-w-screen h-fit py-8 fixed bottom-0 bg-orange-600">
                <div className="flex flex-row justify-evenly text-lg">
                    <div className='text-white text-center'>
                        This is an alert that pops up every time you enter this page. The content on this page will not appear unless you are signed in. We recommend you view this on a desktop or a larger screen.
                    </div>
                    <button onClick={removeAlert} className="my-auto px-6 closebtn">&times;</button>
                </div>
            </section>
            <section className='px-12'>
                <div className="max-w-screen grid grid-flow-row n-xs:grid-cols-1 n-md:grid-cols-2 n-lg:grid-cols-4">
                    {bool && data.map(car =>
                        <button className="bg-slate-100 | font-semibold text-center text-lg space-y-1 | shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg | m-4 px-2 pt-6 pb-4 hover:cursor-default">  
                            <ul key={car.id} className='list-none'>  
                                                        
                                <li key="img" className="w-fit">
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
                        )
                    }
                </div>
                
                <div className="max-w-screen mt-12 grid grid-flow-row grid-cols-4">
                    {/* {bool && } */}
                </div>

                <button onClick={displayPage}>
                    Click Here
                </button>
                <button className="block" onClick={() => displayImage(data)}>
                    Display Images
                </button>
            </section>
        </main>
    )
   
}

export default CarList;