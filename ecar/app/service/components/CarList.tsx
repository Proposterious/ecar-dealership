"use client"
// built-in/dependencies shenanigans
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams, useParams } from "next/navigation";
import { Car } from "./service"; // ts safety
import { UserCar } from "@/app/dashboard/saved-vehicles/saved-vehicles"; // ts safety
import { getCarByAxiosFetch, getCarBySpecId } from "../handleCars"; // functions

// static image imports
import logo from "@/public/car-logo.png"
import suvImage from "@/public/img/car-models/sketch_suv.jpg";
import sedanImage from "@/public/img/car-models/sketch_sedan.jpg";
import Loader from "@/app/loading";

import SaveCaution from "./SaveCaution"; // returns when saveVehicle fails or succeeds
import { NextResponse } from "next/server";



function CarList() { 
    // initiating nextjs vars
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    // initiating dynamic vars
    const [ formedCars, setFormedCars ] = useState<Car[]>([]);
    const [ usersCars, setUsersCars ] = useState<Car[]>([]);
    const [ fetched, setFetched ] = useState(false);

    const [ format, setFormat ] = useState("compact");
    const [ amount, setAmount] = useState(1);

    const [ caution, displayCaution ] = useState(false);
    const [ bool, setBool ]  = useState<{[key: string]: boolean }>({});
    
    // SearchCar params
    const [data, setData] = useState<any>({
      id: "",
      name: "",
      make: "",
      model: "",
      trim: "",
      direction: ""
    });
    
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        return params.toString()
      },
      [searchParams]
    )
    
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
      // define params
      let sortDirection = searchParams.get("sort") ? searchParams.get("sort") : "asc";
      let sortType = searchParams.get("sort-cars") ? searchParams.get("sort-cars") : "id";
      let pageNumber = searchParams.get("page") ? searchParams.get("page") : "";
      let trimType = searchParams.get("trim") ? searchParams.get("trim") : "";
      let makeName = searchParams.get("make") ? searchParams.get("make") : "";
      let modelName = searchParams.get("model") ? searchParams.get("model") : "";
      let makeModelId = searchParams.get("make-model-id") ? searchParams.get("make-model-id") : "";
      let pricing = searchParams.get("price") ? searchParams.get("price") : "";
      // Fetch cars from 'carapi'
      let array: any = await getCarByAxiosFetch(sortDirection, sortType, pageNumber, trimType, makeName, modelName, makeModelId, pricing);

      // create empty dictionary
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
          let result: Car[] = checkedCars.filter((usersCar) => String(usersCar.id) === carId);
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
  
    // handles useStates in form element
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevProps: any) => ({
          ...prevProps,
          [name]: value
        }))
        router.replace(pathname + '?' + createQueryString(name, value));
        router.refresh();
    };

    // handleSearch handles form submit action
    async function handleSearch(e: any) {
        e.preventDefault();
        if (data.id) { // searchById if provided
          setFormat("compact");
          const res = await getCarBySpecId(data.id);
          console.log("completed search")
          let newCar = [res];
          console.log(newCar);
          setFormedCars(newCar);
        } else {
          // grab params from searchbar
          let sortDirection = searchParams.get("sort") ? searchParams.get("sort") : "asc";
          let sortType = searchParams.get("sort-cars") ? searchParams.get("sort-cars") : "id";
          let pageNumber = searchParams.get("page") ? searchParams.get("page") : "";
          let trimType = searchParams.get("trim") ? searchParams.get("trim") : "";
          let makeName = searchParams.get("make") ? searchParams.get("make") : "";
          let modelName = searchParams.get("model") ? searchParams.get("model") : "";
          let makeModelId = searchParams.get("make-model-id") ? searchParams.get("make-model-id") : "";
          let pricing = searchParams.get("price") ? searchParams.get("price") : "";

          const res: any = await getCarByAxiosFetch(sortDirection, sortType, pageNumber, trimType, makeName, modelName, makeModelId, pricing);
    
          if (res?.error) {
            router.push(pathname + '?' + createQueryString("error", res?.error));
          } else { 
            setFetched(false);

            var carData = {} as any;

            for (let i = 0; i < res.length; i++) {
                  // filter car by its name(s)
                  let carName = `${res[i].make_model.make.name} ${res[i].make_model.name}`;
                  console.log(carName)
        
              // define str, strList from Car's description
                  let str = res[i].description;
                  let strList = str.split(' ');
        
              // handles images
                if (strList.includes("Sedan")) {
                    res[i]["img"] = sedanImage;
                    console.log("was img atr", res[i].img)
                    console.log("has sedan", str); 
      
                } else if (strList.includes("SUV")) {
                    res[i]["img"] = suvImage;
                    console.log("was img atr", res[i].img)
                    console.log("has suv", str);
      
                } else { 
                    res[i]["img"] = logo; 
                    console.log("type undefined or base")
                }
      
                // Add car cars to the carData object
                if (!carData[carName]) {
                    carData[carName] = [];
                }
                carData[carName].push(res[i]);
            }
        
            console.log("carData", carData)
      
            var carDicts = Object.values(carData) as any[];
            console.log("carDicts", carDicts)
      
            
            carDicts.forEach((carArray) => {
              carArray.forEach((car: Car) => {
                let carId = String(car.id) as string; 
                let result: Car[] = usersCars.filter((usersCar) => String(usersCar.id) === carId);
                console.log("checkedCars", usersCars)
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
      
            setFormedCars(carDicts);
            setFetched(true);
        }
      }
      router.refresh();
    }

    async function toggleFormat() {
      // toggle carList
        if (format === "expand") { // a) compact carList
          // handle search params
          setFormat("compact");
          router.push(pathname + '?' + createQueryString('format', 'compact')); 
        } else { // b) expand carList
          // handle search params
          setFormat("expand");
          setAmount(1); 
          router.push(pathname + '?' + createQueryString('format', 'expand'));
        }
    }

    useEffect(() => { 
        Promise.resolve(checkCar()).then((checkedCars: any) => {
          console.log("bool", bool)
          return checkedCars;
        }).then((checkedCars) => Promise.resolve(formCars(checkedCars)).then((car: any) => {
          console.log("formedCars", car);
          setUsersCars(checkedCars);
          setFormedCars(car);
          setFetched(true);
        }))}, [searchParams]);

    return (
    <>
    {caution === true && ( <SaveCaution /> )}
  {/* SEARCH CAR WITH PARAMS */}
     <section id="search-car" className="py-3 bg-sky-100">
            
            <div className="w-fit flex flex-row mx-auto py-2 | rounded-sm border-2 border-white bg-orange-600 | font-semibold text-slate-100">
                <nav className="w-fit flex flex-row flex-shrink | child:my-auto child:px-2 border-x-orange-600 | border-white">

                    <form id="search-id" action="#" onSubmit={handleSearch} className="flex flex-row space-x-3 child:my-auto | font-normal text-slate-100 divide-x-2 child:px-2">
                        <div id="search-id" className="flex flex-row space-x-2 my-auto child:z-50">
                            <label className="font-semibold my-auto" htmlFor="id">
                                Car #
                            </label>
                            <input id="id" name="id"
                            type="text" value={data.id}
                            onChange={handleInputChange}
                            placeholder="Search by #"
                            size={12}
                            maxLength={4}
                            className="w-fit ml-2| n-xs:text-sm n-md:text-md text-center | rounded-sm border-0 | shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-orange-300  bg-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        

                        <div id="search-name" className="border-r-2 child:z-50"> 
                            <div className="peer hover:cursor-pointer flex flex-row space-x-1.5">
                                <label className="font-semibold" htmlFor="name">Name:</label>
                                <input id="name" name="name"
                                type="text" value={data.name}
                                onChange={handleInputChange}
                                size={12}
                                className="w-fit ml-2| n-xs:text-sm n-md:text-md text-center | rounded-sm border-0 | shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-orange-300  bg-orange-500 focus:tracking-wider focus:ring-orange-500"
                                aria-placeholder="Find by name" 
                                placeholder="Search" />
                            </div>
                        </div>

                        <div id="search-trim" className="border-r-2 child:z-50"> 
                            <div className="peer hover:cursor-pointer flex flex-row space-x-1.5">
                                <label className="font-semibold" htmlFor="trim">Trim:</label>
                                <input id="trim" name="trim" 
                                type="text" value={data.trim}
                                size={12}
                                onChange={handleInputChange}
                                className="w-fit ml-2| n-xs:text-sm n-md:text-md text-center | rounded-sm border-0 | shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-orange-300  focus:tracking-wider bg-orange-500 focus:ring-orange-500"
                                aria-placeholder="Find by trim" 
                                placeholder="Search" />
                            </div>
                        </div>
                        <div id="search-make" className="mr-1 child:z-50"> 

                            <div className="peer hover:cursor-pointer flex flex-row space-x-1.5">
                                <label className="font-semibold" htmlFor="make">Make:</label>
                                <input id="make" name="make"
                                type="text" value={data.make}
                                size={12}
                                onChange={handleInputChange}
                                className="w-fit ml-2| n-xs:text-sm n-md:text-md text-center | rounded-sm border-0 | shadow-sm ring-1 ring-inset ring-slate-100 placeholder:text-orange-300  focus:tracking-wider bg-orange-500 focus:ring-orange-500"
                                aria-placeholder="Find by make" 
                                placeholder="Search" />
                            </div>
                        </div>

                        <button type="submit">
                            Search
                        </button>
                    </form>
                    
                </nav>
               
                
            </div>
      </section>

  {/* TOOLTIP */}
      <section id="about-format" className="flex flex-row | first:invisible hover:first:visible | fixed right-8 n-xs:top-12 n-md:top-32 n-lg:top-48 z-50">
        <div id="carList-tooltip" className="bg-zinc-900/80 p-1 -mr-10 -mt-8 h-fit | font-semibold text-sm text-slate-200 | hidden">
            <a href="#search-car" id="explanation" className="border-b-2 border-orange-600">
                Click "?" to toggle between "Compact" and "Expand" formats
            </a>

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
  
  {/* MAIN CONTENT */}
      {/* Display Loader while Fetching Data */}
      {fetched !== true && <Loader />}
      <section id="format-cars" className="bg-inherit | grid grid-flow-row n-xs:child:w-3/4 n-xs:child:mx-auto n-xs:grid-cols-1 n-sm:child:mx-0 n-sm:child:w-auto n-sm:grid-cols-2 n-md:grid-cols-3 n-lg:grid-cols-4">
      {/* Display Cars after Fetching Data */}
      {formedCars && formedCars.slice(0, 8 * amount).map((dict: any) => (
        <>
        {/* display expanded form of carList */}
          {format == "expand" && dict.map((car: any) => (
            <div key={car.make_model.make.name + car.make_model.name + ' ' + car.id} className="space-y-4">
              <ul key={car.id} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg hover:cursor-default m-4 p-3 | min-w-[90%] max-w-min min-h-[95%] max-h-min">
              {bool[String(car.id)] && (<> 
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
                  Trim: {car.name}
                </li>

                <li key="description" className="text-sm">
                  Description: {car.description}
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

              <ul key={dict[0].id} className="bg-slate-100 font-semibold text-center text-lg space-y-1 shadow-xs transition duration-300 ease-out hover:shadow-lg shadow-orange-700/70 rounded-lg m-4 p-4 pb-4 hover:cursor-default | min-w-[90%] max-w-min min-h-[95%] max-h-min">

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
                Trim: {dict[0].name}
                </li>

                <li key="desc" className="text-sm">
                Description: {dict[0].description}
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
      {formedCars.length >= amount*8 && (
        <section id="bottom-buttons-container" className ="flex flex-row w-fit mx-auto my-4 space-x-4 n-md:space-16 n-lg:space-x-32 n-xl:space-x-48 align-center">
          <a href="#search-car" id="back-to-top"
          className="w-56 px-2 h-fit py-4 rounded-md | bg-zinc-900/90 text-center text-lg text-slate-200 font-semibold">
              Go Back to Top of Page
            </a>
          <button type="button" id="load-more" onClick={() => setAmount(amount + 1)} 
          className="w-56 px-2 h-fit py-4 rounded-md | bg-zinc-900/90 text-center text-lg text-orange-400 font-semibold">
              Load More Vehicles
            </button>
        </section>
        )}
    </>
    );
}

export default CarList;