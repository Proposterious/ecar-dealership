"use client"
import { useEffect, useState } from "react";
import { getCarById } from "../handleCars";
import { Car } from "../components/service";

import Image, { StaticImageData } from "next/image";
import Loader from "@/app/loading";
import Logo from '@/public/shrunk-car-logo.png';
import car1 from '@/public/img/car-models/2017-porsche-911-turbo-s.jpg';
import car2 from '@/public/img/stock-photos/happy-man-in-car-thumbs-up.jpg';
import car3 from '@/public/img/car-models/2024-rolls-royce-phantom.jpg';
import car4 from '@/public/img/car-models/sketch_sedan.jpg';


export default function CarPage({ params }: { params: { car: string[] } }) {
    console.log(params);
    const [displayImage, setDisplayImage] = useState(Logo);
    const [car, setCar] = useState(null) as unknown as any;
    const [index, setIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);

    function changeImage(e: any) {
        const currentVal = e.currentTarget.getAttribute('value');
        const currentInt = parseInt(currentVal);
        console.log("currentInt", currentInt)
        console.log(currentVal);

        if (currentVal == "1") {
            setDisplayImage(Logo);
            setImageIndex(currentInt);
        } else if (currentVal == "2") {
            setDisplayImage(car1);
            setImageIndex(currentInt);
        } else if (currentVal == "3") {
            setDisplayImage(car2);
            setImageIndex(currentInt);
        } else if (currentVal == "4") {
            setDisplayImage(car3);
            setImageIndex(currentInt);
        } else if (currentVal == "5") {
            setDisplayImage(car4) 
            setImageIndex(currentInt);
        } else if (currentInt > 5 ) {
            setDisplayImage(Logo);
            setImageIndex(1);
        } else { 
            setDisplayImage(car4);
            setImageIndex(5) 
        };

        console.log("currentVal", currentVal)
    }

    function nextCar() {
        if (index === car.length-1) { setIndex(0) }
        else { setIndex(index+1) }
    }
    
    function prevCar() {
        if (index === 0) { setIndex(car.length-1) }
        else { setIndex(index-1) }
    }

    useEffect(() => {
        getCarById(params.car[1]).then((obj: Car) => setCar(obj));
    }, [])

    return (
    <main className="w-full min-h-screen n-xs:py-20 n-xs:px-4 n-md:p-3 bg-orange-400">
    {car === null && <Loader />}
    {car &&
        <div className="p-6  bg-slate-100 rounded-md">
            <h1 className="w-full text-center my-4 pb-2 | font-extrabold text-slate-800 n-xs:text-2xl n-md:text-3xl n-lg:text-6xl">
                Learn More About the
                <span className='ml-3 underline underline-offset-2 decoration-double text-orange-600'> 
                    {car[index].make_model.make.name} {car[index].make_model.name} 
                </span> {'  '}
                <span className="n-xs:block n-xs:mt-1 n-md:inline-block n-md:mt-0 indent-1 font-light">
                &#40;
                    Thanks to
                    <Image className="inline-block ml-2"
                src={Logo}
                width={100}
                alt='' />
                &#41;
                </span>
            </h1>

        <div id="car-content" className="n-xs:flex n-xs:flex-col n-xs:child:mx-auto n-md:mx-0 n-md:flex n-md:flex-row | mt-2 pt-2 border-t-2 | n-xs:space-y-6 n-md:space-y-0  ">
                <section className="n-xs:w-full n-md:w-3/5 flex flex-row h-full rounded-md bg-slate-100">
                    <div className="grid grid-flow-col grid-rows-5 w-1/5 child:m-auto bg-black p-4">
                        <button value={"1"} onClick={changeImage}>
                            <Image src={Logo}
                            alt="hidden"
                            width={160}
                            objectFit="fill"/>
                        </button>
                        <button value={"2"} onClick={changeImage}>
                            <Image src={car1}
                            width={160}
                            alt="hidden"
                            
                            objectFit="fill"/>
                        </button>
                        <button value={"3"} onClick={changeImage}>
                            <Image src={car2}
                            alt="hidden"
                            width={160}
                            objectFit="fill"/>
                        </button>
                        <button value={"4"} onClick={changeImage}>
                            <Image src={car3}
                            alt="hidden"
                            width={160}
                            objectFit="fill"/>
                        </button>
                        <button value={"5"} onClick={changeImage}>
                            <Image src={car4}
                            alt="hidden"
                            width={160}
                            objectFit="fill"/>
                        </button>

                    </div>
                    <div className="w-4/5 rounded-sm flex flex-col">
                        <div className="h-4/5 flex w-full bg-black/80">
                            <Image src={displayImage} alt={`${car[index].make_model.make.name} ${car[index].make_model.name}`} className="mx-auto max-w-full align-middle p-6" style={{ objectFit: "contain", maxWidth: "full" }} />
                        </div>
                        
                        <div className="flex flex-row m-auto child:mx-4">
                            <button value={`${imageIndex-1}`} className="border-2 border-slate-400 bg-slate-200 px-8 py-4 font-semibold leading-3 tracking-widest text-lg | transition duration-300 hover:ease-in-out" onClick={changeImage}>
                                PREV
                            </button>
                            <button value={`${imageIndex+1}`} className="border-2 border-slate-400 bg-slate-200 px-8 py-4 font-semibold leading-3 tracking-widest text-lg | transition duration-300 hover:ease-in-out" onClick={changeImage}>
                                NEXT
                            </button>
                        </div>
                    </div>
                </section>

                <section className="n-xs:w-full n-md:w-2/5 p-4 bg-orange-300 rounded-md">
                    <button className="flex justify-center items-center w-5/6 h-full mx-auto my-auto border-2 border-orange-600 shadow-inner shadow-amber-600 hover:shadow-2xl transition duration-1000 delay-400 hover:-translate-y-1 hover:-translate-x-1 bg-orange-400 px-7 rounded-lg hover:cursor-default">
                        <ul id="car-listed-info" key={car[index].id} className="list-none h-fit my-auto rounded-sm  text-white font-normal | child:w-fit child:my-16 child:mx-auto">
                            <li key="name" className="text-3xl font-bold text-slate-800 px-24 py-2 bg-zinc-100/90 rounded-md">
                            {car[index].make_model.make.name + ' ' + car[index].make_model.name}
                            </li>

                            <li key="id" className="text-2xl">
                            Car ID #{car[index].make_model.id}
                            </li>

                            <li key="type" className="text-2xl">
                            {car[index].name} Type
                            </li>

                            <li key="make" className="text-2xl">
                            Specific Type - {car[index].description}
                            </li>

                            <li key="created-at" className="text-2xl">
                                Created at {car[index].created}
                            </li>

                            <li className="font-semibold text-xl mt-5">
                                <button className="group animate-bounce duration-400 shadow-lg shadow-current text-orange-600 bg-slate-100 px-5 py-2.5 border-2 border-slate-200 ring-1 ring-sky-400 rounded-xl duration-200 hover:text-slate-100 hover:border-orange-600 hover:bg-indigo-500 hover:ring-black hover:ring-2">
                                    On Sale for 
                                    {/* Fake Price */}
                                    <span className='ml-1 text-black line-through'>${car[index].msrp+1500}
                                    </span> &gt;
                                    {/* Real Price */}
                                    <span className='underline group-hover:text-slate-100 text-indigo-500'>{' '}${car[index].msrp}</span>
                                </button>
                            </li>
                        </ul>
                    </button>
                </section>
            </div>

            <section id="car-footer" className='w-full py-4 bg-slate-200 rounded-md | mt-4'>
                <div id="replace-car" className="w-fit flex flex-row mx-auto space-x-4">

                {/* Display Prev Vehicle in carArray */}
                    <button onClick={prevCar}
                    className="px-3 py-2 bg-white text-orange font-semibold">
                        Check Prev Vehicle 
                    </button>
                {/* Display Next Vehicle in carArray */}
                    <button onClick={nextCar}
                    className="px-3 py-2 bg-white text-orange font-semibold">
                        Check Next Vehicle
                    </button>
                </div>
                <div className='w-fit mx-auto mt-2 | text-orange-600 text-center font-light'>
                    Currently at {index+1} / {car.length} 
                    <br/> of Cars with this Name
                </div>
            </section>
        </div> }
    </main>
)}