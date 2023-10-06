"use server"
import { NextResponse } from 'next/server';

export async function getCars() {
    const url = 'https://car-api2.p.rapidapi.com/api/models?sort=id&direction=asc&year=2020&verbose=yes';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const responseJSON = await response.json();

        const carData = responseJSON.data;
        console.log(carData)

        NextResponse.json({ success: 200 })
        return carData;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ failure: error })
    }
}