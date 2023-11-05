"use client"
// built-in/dependencies shenanigans
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// custom shenanigans
import { getCarByName, getCarsByPage } from "../handleCars";
import logo from "@/public/car-logo.png"
import suvImage from "@/public/img/car-models/sketch_suv.jpg";
import sedanImage from "@/public/img/car-models/sketch_sedan.jpg";
import Loader from "@/app/loading";
import { Car } from "./service";
import Link from "next/link";
import SaveCaution from "./SaveCaution";
import CheckCar from "./CheckCar";


function CarList() { 
    // initiating nextjs vars
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    // initiating dynamic vars
    const [ data, setData ] = useState([]);
    const [ format, setFormat ] = useState("expand");

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
        const name = searchParams.get('name');
        if (name != null) {
          var array = await getCarByName(name) as any;
          console.log("got name")
        }
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
        
        return carDicts;
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
        Promise.resolve(formCars()).then((car: any) => {
          console.log("New carArray", car);
          setData(car);
      })}, []);

    return (
    <>
      <section id="about-format" className="flex flex-row | first:invisible hover:first:visible | fixed right-8 n-xs:top-12 n-md:top-32 n-lg:top-48 z-50">
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
            <div key={car.make_model.make.name + car.make_model.name} className="space-y-4">
              <ul key={car.id} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg hover:cursor-default m-4 p-3">
                <CheckCar carId={car.id} />
                <li key="img" className="w-fit mx-auto">
                  <Image src={car.img} alt={car.name} className="bg-inherit" style={{ objectFit: "contain", maxHeight: "238px" }} />
                </li>

                <li key="name" className="text-black font-bold">
                  Name: {car.make_model.make.name + ' ' + car.make_model.name}
                </li>

                <li key="id">
                  Car #{`${parseInt(car.id) - 6000}`}
                </li>

                <li key="type" className="text-sm">
                  Type: {car.name}
                </li>

                <li key="make" className="text-sm">
                  Make: {car.description}
                </li>
                <li key="learn-more" className="pt-3">
                  <Link href={`/service/car/${car.make_model.id}`} className="bg-orange-500 rounded-lg p-3 hover:text-white">
                    Learn More
                  </Link>
                </li>
              </ul>
            </div>
          ))}

        {/* display compacted form of carList */}
          {format == "compact" && (
            <div key={dict[0].make_model.make.name + dict[0].make_model.name} className="space-y-4">

              <ul key={dict[0].id} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg m-4 p-4 pb-4 hover:cursor-default">

                <CheckCar carId={dict[0].id} />

                <li key="img" className="w-fit mx-auto">
                <Image src={dict[0].img} alt={dict[0].name} className="bg-inherit" style={{ objectFit: "contain", maxHeight: "238px" }} />
                </li>

                <li key="name" className="text-black font-bold">
                Name: {dict[0].make_model.make.name + ' ' + dict[0].make_model.name}
                </li>

                <li key="id">
                Car #{dict[0].id}
                </li>

                <li key="type" className="text-sm">
                Type: {dict[0].name}
                </li>

                <li key="make" className="text-sm">
                Make: {dict[0].description}
                </li>

                <li key="learn-more" className="pt-3">

                  <Link href={`/service/car/${dict[0].make_model.id}`} className="bg-orange-500 rounded-lg p-3 hover:text-white">
                    Learn More
                  </Link>
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