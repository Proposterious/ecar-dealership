"use server"
import { NextResponse } from 'next/server';

export async function getCars() {

    const url = 'https://car-api2.p.rapidapi.com/api/trims?limit=36&direction=asc&sort=id&year=2020&verbose=yes';

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
        console.log("Fetched data")

        const carData = [...responseJSON.data];
        console.log(carData)
        console.log("\n\nCar make_model_make\n", carData[0].make_model.make)
        
        NextResponse.json({ success: 200 })
        return carData; // return function

    } catch (error) {
        console.error(error)
        return NextResponse.json({ failure: error }); // quit function
    }
}

export async function getCarById(id: string) {
    const url = `https://car-api2.p.rapidapi.com/api/trims?direction=asc&sort=id&year=2020&make_model_id=${id}&verbose=yes`;

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
        console.log("Fetched data")

        const carData = responseJSON.data;

        if (carData === undefined) { 
            console.log(carData);
            NextResponse.json({ failure: 404, message: 'no id provided' }); ; // quit function
            return;
        }

        console.log("car exists")
        
        NextResponse.json({ success: 200 })
        return carData; // return function

    } catch (error) {
        console.error(error)
        return NextResponse.json({ failure: error }); // quit function
    }
    
}