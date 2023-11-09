"use client"
// built-in/dependencies shenanigans
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Car } from "./service"; // ts safety
import { UserCar } from "@/app/dashboard/saved-vehicles/saved-vehicles"; // ts safety
import { getCarByName, getCarBySpecId, getCarsByPage } from "../handleCars"; // functions

// static image imports
import logo from "@/public/car-logo.png"
import suvImage from "@/public/img/car-models/sketch_suv.jpg";
import sedanImage from "@/public/img/car-models/sketch_sedan.jpg";
import Loader from "@/app/loading";

import SaveCaution from "./SaveCaution"; // returns when saveVehicle fails or succeeds



function CarList() { 
    // initiating nextjs vars
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    // initiating dynamic vars
    const [ formedCars, setFormedCars ] = useState([]);
    const [ fetched, setFetched ] = useState(false)
    const [ format, setFormat ] = useState("expand");
    const [ caution, displayCaution ] = useState(false);
    const [ bool, setBool ]  = useState<{[key: string]: boolean }>({});
    
    async function handleCar(car: string) {
      displayCaution(true);
      document.getElementById("check-cars-alert")?.classList.remove("hidden");
      if (bool[car] === true) {
        setBool({
          ...bool,
          [car]: false
        });

        const res = await fetch('/api/removeVehicle', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(String(car))
        });
        if (res.ok) {
          console.log("Removed Vehicle")
          return ( // return prototype HTMLElement ('UnsavedCaution') replica of SavedCaution
            <div id="check-cars-alert" className="fixed z-50 w-1/3 h-fit bottom-0 text-center text-sm text-slate-100 bg-slate-600 rounded-sm p-3">
                Removed Vehicle.<br/>
                <button onClick={() => router.push('/dashboard/saved-vehicles')} className='font-semibold transition duration-200 text-indigo-500 underline hover:decoration-double'>
                    No longer visible in Dashboard. Didn't mean to do that?
                </button>
                <button onClick={() => {
                  handleCar(car); 
                  let alert = document.getElementById("check-cars-alert") as unknown as HTMLElement;
                  alert.classList.add('hidden')
                }} className="w-fit my-auto px-6 closebtn">&times;</button>
            </div>
          )
        } else { 
          setBool({
            ...bool,
            [car]: true
          });
          console.log("Failed to Remove Vehicle")
        }

      } else if (bool[car] === false) {
        setBool({
          ...bool,
          [car]: true
        });
        const res = await fetch('/api/saveVehicleById', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(String(car))
        });
  
        if (res.status === 200) {
          console.log("Added Vehicle to User")
        } else { 
          console.log("Failed to Add Vehicle")
          setBool({
            ...bool,
            [car]: false
          });
        }
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
    
    // fetch car data
    async function formCars(checkedCars: any[]) {
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

      var carDicts = Object.values(carData) as any[];
      console.log("carDicts", carDicts)

     
      carDicts.forEach((carArray) => {
        carArray.forEach((car: Car) => {
          let carId = String(car.id) as string; 
          let result = checkedCars.filter((usersCar) => String(usersCar.id) === carId);
          console.log("checkedCars", checkedCars)
          if (result.length > 0) { // if car does exist on user
              let updateVal: any = {};
              updateVal[`${carId}`] = true;
              console.log(`${updateVal}`)
              setBool(bool => ({...bool, ...updateVal}))
          } else if (result.length === 0) { // if car does not exist on user
            let updateVal: any = {};
            updateVal[`${carId}`] = false;
            console.log(`${updateVal}`)
              setBool(bool => ({...bool, ...updateVal}))
          } else (console.log('result failed', result))
          /* finished */ 
          result = [];
          console.log(`attempted to add carId (${carId}) to boolDict\ncurrent bool: ${JSON.stringify(bool)}`)
        })
      })

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
        Promise.resolve(checkCar()).then((checkedCars: any) => {
          console.log("bool", bool)
          return checkedCars;
        }).then((checkedCars) => Promise.resolve(formCars(checkedCars)).then((car: any) => {
          console.log("formedCars", car);
          setFormedCars(car);
          setFetched(true);
        }));
    }, []);

    return (
    <>
    {caution === true && ( <SaveCaution /> )}
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
      {fetched !== true && <Loader />}
      <button onClick={() => console.log(bool)}>bool check</button>
      <section id="format-cars" className="bg-inherit | grid grid-cols-4 grid-flow-row">
      {/* Display Cars after Fetching Data */}
      {formedCars && formedCars.map((dict: any) => (
        <>
        {/* display expanded form of carList */}
          {format == "expand" && dict.map((car: any) => (
            <div key={car.make_model.make.name + car.make_model.name + ' ' + car.id} className="space-y-4">
              <ul key={car.id} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg hover:cursor-default m-4 p-3">
              {bool[String(car.id)] == true && (<> 
                  <li key="save" className="relative">
                      <button id={`button${car.id}`} onClick={() => {
                          handleCar(car.id);
                          }} className="w-fit bg-slate-700 rounded-md -m-2 p-1 absolute right-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(20, 200, 240)" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(240, 110, 20)" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>
                      </button>
                  </li> 
              </>
              )}
              {bool[String(car.id)] == false && (
                  <li key="save" className="relative">
                    <button id={String(car.id)} onClick={() => {
                        handleCar(String(car.id));
                        }} className="w-fit bg-sky-400 rounded-md -m-2 p-1 absolute right-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(240, 110, 20)" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                </li> 
              )}

                <li key="img" className="w-fit mx-auto">
                  <Image src={car.img} alt={car.name} className="bg-inherit" style={{ objectFit: "contain", maxHeight: "238px" }} />
                </li>

                <li key="name" className="text-black font-bold">
                  Name: {car.make_model.make.name + ' ' + car.make_model.name}
                </li>

                <li key="id">
                  Car #{`${parseInt(car.id)}`}
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

              {bool[String(dict[0].id)] === true && (<> 
                  <li key="save" className="relative">
                      <button id={`button${dict[0].id}`} onClick={() => {
                          handleCar(dict[0].id);
                          }} className="w-fit bg-slate-700 rounded-md -m-2 p-1 absolute right-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(20, 200, 240)" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(240, 110, 20)" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>
                      </button>
                  </li> 
              </>
              )}
              {bool[String(dict[0].id)] === false && (
                  <li key="save" className="relative">
                    <button id={String(dict[0].id)} onClick={() => {
                        handleCar(String(dict[0].id));
                        }} className="w-fit bg-sky-400 rounded-md -m-2 p-1 absolute right-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(240, 110, 20)" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                </li> 
              )}

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