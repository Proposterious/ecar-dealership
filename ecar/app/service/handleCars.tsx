"use server"
import { NextResponse } from 'next/server';

export async function getCarsByPage(page: String) {
    const url = `https://car-api2.p.rapidapi.com/api/trims?direction=asc&sort=id&year=2020&page=${page}&verbose=yes`;
    const cache: RequestCache = "no-store";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
        cache
    }

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();
        console.log("Fetched data", responseJSON.data[0].make_model.name + responseJSON.data[0].name)

        const carData = [...responseJSON.data];

        NextResponse.json({ success: 200 })
        return carData; // return function

    } catch (error) {
        console.error(error)
        NextResponse.json({ success: false, error: error})
        return; // quit function
    }
}

export async function getCarById(id: string) {
    const url = `https://car-api2.p.rapidapi.com/api/trims?direction=asc&sort=id&year=2020&make_model_id=${id}&verbose=yes`;
    const cache: RequestCache = "no-store";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
        cache
    }

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();

        const carData = responseJSON.data;

        if (carData === undefined) { 
            console.log(carData, carData);
            NextResponse.json({ failure: 404, message: 'no id provided' }); // quit function
            return;
        }
        console.log("getCarById succeeded")
        NextResponse.json({ success: 200 })
        return carData; // return function

    } catch (error) {
        console.error(error)
        NextResponse.json({ success: false, error: error})
        return; // quit function
    }
    
}

export async function getCarByMake(make: string) {
    const url = `https://car-api2.p.rapidapi.com/api/trims?direction=asc&sort=id&year=2020&page=1&verbose=yes&make=${make}`;
    const cache: RequestCache = "no-store";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
        cache
    }

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();

        const carData = responseJSON.data;
        console.log(`Fetched ${carData[0].make_model.make.name} ${carData[0].make_model.name}`)

        if (carData === undefined) { 
            console.log(carData);
            NextResponse.json({ failure: 404, message: 'no id provided' }); // quit function
            return;
        }

        console.log("car exists")

        NextResponse.json({ success: 200 })
        return carData; // return function

    } catch (error) {
        console.error(error)
        NextResponse.json({ success: false, error: error})
        return; // quit function
    }
    
}

export async function getCarByType(type: string) {
    const url = `https://car-api2.p.rapidapi.com/api/bodies?sort=id&verbose=yes&direction=asc&year=2020&type=${type}`;
    const cache: RequestCache = "no-store";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
        cache
    }

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();
        console.log("Fetched data", responseJSON.data[0].make_model.name + responseJSON.data[0].name)

        const carData = responseJSON.data;

        if (carData === undefined) { 
            console.log(carData);
            NextResponse.json({ failure: 404, message: 'no id provided' }); // quit function
            return;
        }

        console.log("car exists")

        NextResponse.json({ success: 200 })
        return carData; // return function

    } catch (error) {
        console.error(error)
        NextResponse.json({ success: false, error: error})
        return; // quit function
    }
    
}

export async function getCarByName(name: string) {
    const nameArray = name.split(' ')

    if (nameArray.length < 2) { console.log("array supposedly not length2\n", nameArray) }

    const url = `https://car-api2.p.rapidapi.com/api/trims?direction=asc&sort=id&year=2020&model=${nameArray[1]}&verbose=yes&make=${nameArray[0]}`;
    const cache: RequestCache = "no-store";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
        cache
    }

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();

        const carData = responseJSON.data;
        console.log(`Fetched ${carData[0].make_model.make.name} ${carData[0].make_model.name}`)

        if (carData === undefined) { 
            console.log(carData);
            NextResponse.json({ failure: 404, message: 'no id provided' }); // quit function
            return;
        }

        console.log("car exists")
        
        NextResponse.json({ success: 200 })
        return carData; // return function

    } catch (error) {
        console.error(error)
        NextResponse.json({ success: false, error: error})
        return; // quit function
    }
}

export async function getCarBySpecId(id: string) {
    const url = `https://car-api2.p.rapidapi.com/api/trims/${id}`;
    const cache: RequestCache = "no-store";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
        cache
    }

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();

        NextResponse.json({ success: true, message: "Retrieved Car Successfully", status: 200})
        
        return responseJSON;

    } catch (error) {
        console.error(error)
        NextResponse.json({ failure: error }, { status: 408 }); // quit function
        return null;
    }
    
}