import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = `https://car-api2.p.rapidapi.com/api/trims/${req}`;

    const cache: RequestCache = "no-store";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '907f0a7383msh38d61721f0ac188p1b95e2jsn2a029f962ac0',
            'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
        cache,
    };

    try {
        // await fetch, assign variable
        const response = await fetch(url, options);
        const responseJSON = await response.json();
        console.log("Fetched car by id (api call)")


        
        return NextResponse.json({ responseJSON }, { status: 200}); // return function

    } catch (error) {
        console.error(error)
        return NextResponse.json({ failure: error }); // quit function
    }
}