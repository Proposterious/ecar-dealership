"use client"
// built-in/dependencies shenanigans
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// custom shenanigans
import { getCarsByPage } from "../handleCars";
import logo from "@/public/car-logo.png"
import suvImage from "@/public/img/car-models/sketch_suv.jpg";
import sedanImage from "@/public/img/car-models/sketch_sedan.jpg";
import Loader from "@/app/loading";


function CarList() { 
    // initiating nextjs vars
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    // initiating dynamic vars
    const [ data, setData ] = useState([]);
    const [ format, setFormat ] = useState("compact")

    // fetch car data
    async function formCars() {
        // Fetch cars from 'carapi'
        const page = searchParams.get('page');
        if (page == null) { // if no page is selected
          var array = await getCarsByPage('1') as any; 
          console.log("no page")
        } else { // if user interacted with SortByPage
          var array = await getCarsByPage(String(page)) as any;
          console.log("page", page)
        };
        
        // define new dictionary
        var carData = {} as any;

        for (let i = 0; i < array.length; i++) {
            // filter car by its name(s)
            let carName = `${array[i].make_model.make.name} ${array[i].make_model.name}`;
            console.log(carName)

        // define str, strList from Car's description
            let str = array[i].description;
            let strList = str.split(' ');

        // handles images
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


            // Add car cars to the carData object
            if (!carData[carName]) {
                carData[carName] = [];
            }
            carData[carName].push(array[i]);
        }
        console.log("carData", carData)

        var carDicts = Object.values(carData)
        console.log("carDicts", carDicts)
        
        return carDicts
    }

    // create new url params
    const createQueryString = useCallback(
        (name: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
    
        return params.toString()
    },
    [searchParams]
    )

    async function toggleFormat() {
      // toggle carList
        if (format === "expand") { // a) compact carList
          // handle search params
          setFormat("compact");
          router.push(pathname + '?' + createQueryString('format', 'compact')); 
        } else { // b) expand carList
          // handle search params
          setFormat("expand"); 
          router.push(pathname + '?' + createQueryString('format', 'expand'));
        }
    }

    useEffect(() => {
        formCars().then((car: any) => setData(car));
        console.log(data);
    }, []);

    return (
    <>
      <section className="flex flex-row | first:invisible hover:first:visible | fixed right-8 top-48">
        <div id="carList-tooltip" className="bg-slate-200/90 p-1 -mr-10 -mt-8 h-fit | font-semibold text-sm text-slate-600 | hidden">
            <span id="explanation" className="border-b-2 border-orange-600">
                Click "?" to toggle between "Compact" and "Expand" formats
            </span>

            <br/>

            <p id="format-desc" className="text-normal inline-block">
                <span className="underline decoration-orange-600 decoration-wavy | font-semibold">Compact</span>: view no duplicates 
                
                <br/>

                <span className="underline decoration-orange-600 decoration-wavy | font-semibold">Expand</span>: view duplicates of different types
            </p>
            
        </div>
        <span className="max-w-fit">
          <button id="toggle-carFormat" className="bg-black/40 border-white border-2 ring-1 ring-orange-600 rounded-full px-4 py-1.5 | font-extrabold text-lg text-orange-600" onClick={toggleFormat}

          onMouseEnter={() => {
              document.getElementById('carList-tooltip')!.classList.remove('hidden');
          }}
          onMouseLeave={() => {
          document.getElementById('carList-tooltip')!.classList.add('hidden');
          }}>
                  ?
          </button>
        </span>
      </section>
      
      {/* Display Loader while Fetching Data */}
      {data.length < 2 && <Loader />}
      <section id="format-cars" className="bg-inherit | grid grid-cols-4 grid-flow-row">
      {/* Display Cars after Fetching Data */}
      {data && data.map((dict: any) => (
        <>
        {/* display expanded form of carList */}
          {format == "expand" && dict.map((car: any) => (
            <div key={dict[0].id} className="space-y-4">
              <ul key={car.id} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg hover:cursor-default m-4 p-3">
                <li key="img" className="w-fit mx-auto">
                  <Image src={car.img} alt={car.name} className="bg-inherit" style={{ objectFit: "contain", maxHeight: "238px" }} />
                </li>

                <li key="name" className="text-black font-bold">
                  Name: {car.make_model.make.name + ' ' + car.make_model.name}
                </li>

                <li key="id">
                  Car #{car.make_model.id}
                </li>

                <li key="type" className="text-sm">
                  Type: {car.name}
                </li>

                <li key="make" className="text-sm">
                  Make: {car.description}
                </li>
                <li key="learn-more" className="pt-3">
                  <button className="bg-orange-500 rounded-lg p-3 hover:text-white">
                    Learn More
                  </button>
                </li>
              </ul>
            </div>
          ))}

          {/* display compacted form of carList */}
            {format == "compact" && (
              <div key={dict[0].id} className="space-y-4">

                

                <ul key={dict[0].id} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg m-4 p-4 pb-4 hover:cursor-default">

                <li className="relative">
                    <button className="w-fit bg-sky-400 rounded-md -m-2 p-1 absolute right-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill='rgb(255, 0, 0)' viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(240, 110, 20)" className="w-8 h-8">
                      <path strokeLinecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                  </li>

                  <li key="img" className="w-fit mx-auto">
                  <Image src={dict[0].img} alt={dict[0].name} className="bg-inherit" style={{ objectFit: "contain", maxHeight: "238px" }} />
                  </li>

                  <li key="name" className="text-black font-bold">
                  Name: {dict[0].make_model.make.name + ' ' + dict[0].make_model.name}
                  </li>

                  <li key="id">
                  Car #{dict[0].make_model.id}
                  </li>

                  <li key="type" className="text-sm">
                  Type: {dict[0].name}
                  </li>

                  <li key="make" className="text-sm">
                  Make: {dict[0].description}
                  </li>

                  <li key="learn-more" className="pt-3">
                    <button className="bg-orange-500 rounded-lg p-3 hover:text-white">
                        Learn More
                    </button>
                  </li>

                </ul>
              </div>
            )}
            </>
        ))}
      </section>  
    </>
    );
}

export default CarList;