"use server"
import { NextResponse } from 'next/server';

import axios from 'axios'; // replace fetch-by-url with fetch-by-axios
export async function getCarByAxiosFetch(
{
    sortType = 'id',
    sortDirection = 'asc', 
    carYear = '2020',
    pageNumber = '1',
    // specific params
    trimType = '',
    modelName = '',
    makeModelId = '',
    verboseConfirm = 'yes'
}:{
    sortType: string | null;
    sortDirection: string | null;
    carYear: string | null;
    pageNumber: string | null;
   // specific params
    pricing: string | null;
    trimType: string | null;
    makeName: string | null;
    modelName: string | null;
    makeModelId: string | null;
    verboseConfirm: string | null;
})
    
 {
    // define axios options
    let options: any = {
        method: 'GET',
        url: 'https://car-api2.p.rapidapi.com/api/trims',
        params: {
          direction: sortDirection,
          sort: sortType,
          year: carYear,
          model: modelName,
          page: pageNumber,
          trim: trimType,
          make_model_id: makeModelId,
          verbose: verboseConfirm
        },
        
        headers: {
          'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
          'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        }
    };

    console.log("options", options)
    
    // remove unused/empty params
    for (let key in options) {
        if (!options[key]) {
            delete options[key]
        }
    }
    // fetch api by options
    try {
        const response = await axios.request(options);
        NextResponse.json({ success: 200 });
        
        if (response.data.length) { 
            let carData = response;
            return carData; // return Cars
        } else {
            let carData = response.data.data;
            return carData; // return Cars
        }
        

        } catch (error) {
            console.error(error)
            NextResponse.json({ success: false, error: error})
            return; // quit function
        }        
}

export async function getCarBySpecId(id: string | null) {
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
        console.log("getCarBySpecId response", response)
        const cars = await response.json();
        NextResponse.json({ success: true, message: "Retrieved Car Successfully", status: 200})

        return cars;

    } catch (error) {
        console.error(error)
        NextResponse.json({ failure: error }, { status: 408 }); // quit function
        return null;
    }
}