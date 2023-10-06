import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { PrismaClient } from '@prisma/client';
import { Dictionary } from '@prisma/client/runtime/library';

// MAKE THIS FUNCTION UPDATE DATABASE WITH ENTERED INFORMATION
const secret = process.env.NEXTAUTH_SECRET;
const prisma = new PrismaClient();

export async function GET() {
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
        const data = await responseJSON.data;
        NextResponse.json({ success: 200 });
        return NextResponse.json(data)
    } catch (error) {
        console.error(error);
        return NextResponse.json({ failure: error})
    }
}