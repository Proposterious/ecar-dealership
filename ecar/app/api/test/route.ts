import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { PrismaClient } from '@prisma/client';

// MAKE THIS FUNCTION UPDATE DATABASE WITH ENTERED INFORMATION
const secret = process.env.NEXTAUTH_SECRET;
const prisma = new PrismaClient();

export async function POST(req: NextRequestWithAuth) {
    // Grab request 'data' type dict and log
    const data = await req.json()
    console.log('This is the data from request', data)
    // Grab token 'data' type dict and log
    const session = await getToken({ req, secret })
    console.log('This is the token info ', session)
    // Find user in DB by 'token.id'
    const checkId = session?.id as string;
    const user = await prisma.user.findUnique({
        where: {
            id: checkId,
        }
    })

    if (user != null) { console.log("User was found by id: ", user) }
    else{ console.log('Not found') }
        

    prisma.$disconnect()
    return NextResponse.json('User found');
}