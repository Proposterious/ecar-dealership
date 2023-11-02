import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware';

// MAKE THIS FUNCTION UPDATE DATABASE WITH ENTERED INFORMATION
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequestWithAuth) {
    // Initialize instances
    const prisma = new PrismaClient();
    const data = await req.json();
    const session = await getToken({ req, secret, 
        cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'}); // get token from userCookie
    const checkId = session?.sub as string; // assigns id from token.id ('sub' object)
    const checkEmail = session?.email as string; // assigns email from token.email

    // Assign mutable variables for 'prisma' to process
    let info = {} as any;
    const newKeys = [] as any;
    const newValues = [] as any;
    // Populate the newKeys, newValues array objects with data pairs (from POST req)
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            newKeys.push( key );
            newValues.push(data[key])
        }
    }
    console.log(newKeys, newValues)
    // Populate the 'info' object with key-value pairs from newKeys and newValues
    for (let i = 0; i < newKeys.length; i++) {
        const key = newKeys[i];
        const value = newValues[i];
        info[key] = value;
    }

    // Search for user in database
    const user = await prisma.user.findUnique({
        where: {
            email: checkEmail
        }
    });
    // Quit the function if user not found
    if (!user) { 
        console.log('Session Failed');
        await prisma.$disconnect(); 
        return NextResponse.json({ success: false, status: 405, message: "Session Not Found" });
    }

    // Update user with 'req' data if user found
    await prisma.user.update({
        where: { id: checkId, },
        data: info,
    })
    
    console.log('Completed User Update')
    await prisma.$disconnect();
    return NextResponse.json({ success: false, status: 200, message: "User Updated" });
}