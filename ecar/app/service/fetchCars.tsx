"use server"
import { NextResponse } from 'next/server';

export async function getCars() {

    const url = 'https://car-api2.p.rapidapi.com/api/trims?limit=50&direction=asc&sort=id&year=2020&verbose=yes';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        }
    };

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();

        const carData = [...responseJSON.data];
        console.log(carData)
        NextResponse.json({ success: 200 })

        console.log("\n\nCar make_model_make\n", carData[0].make_model.make)

        var carDict = {} as any;
        carData.forEach(car => {
            carDict[car.id] = car;
            }
        )

        return carData; // return function

    } catch (error) {
        console.error(error)
        return NextResponse.json({ failure: error }); // quit function
    }
}

export async function getImages(array: []) {
    

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();

        const carData = [...responseJSON.data];
        console.log(carData)
        NextResponse.json({ success: 200 })

        console.log("\n\nCar make_model_make\n", carData[0].make_model.make)

        var carDict = {} as any;
        carData.forEach(car => {
            carDict[car.id] = car;
            }
        )

        return carData; // return function

    } catch (error) {
        console.error(error)
        return NextResponse.json({ failure: error }); // quit function
    }
}