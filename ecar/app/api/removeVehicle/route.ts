import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware';

// MAKE THIS FUNCTION UPDATE DATABASE WITH VEHICLE ID
const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: NextRequestWithAuth) {
    // Initialize instances
    const session = await getToken({ req, secret, 
        cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'}); // get token from userCookie
    const prisma = new PrismaClient();
    const car = await req.json();
    const saveId = car as unknown as any;
    const checkId = session?.sub as string; // assigns id from token.id ('sub' object)
    
    // Search for user in database
    const user = await prisma.user.findUnique({
        where: {
            id: checkId,
        }
    });

    // Quit the function if user not found
    if (!user) { 
        console.log('Session Failed');
        await prisma.$disconnect(); return NextResponse.json({ success: false, error: "No User Found"}, { status: 404 });
    }

    // Return car if exists on 'user'
    const oldCar = await prisma.car.findFirst({
        where: {
            userId: checkId,
            carId: saveId,
        }
    })

    if (!oldCar) { // quit function if car exists
        await prisma.$disconnect(); 
        return NextResponse.json({ success: false, error: "Car Does Not Exist on User"}, { status: 202 });
    }

    await prisma.user.update({
        where: {
            id: checkId,
        },
        data: {
            cars: {
                deleteMany: [{
                    carId: saveId
                }]
            }
        }
    }).then(async () => {
        console.log('Completed User Update')
        await prisma.$disconnect();
    })

    return NextResponse.json({ success: true, message: "Removed Vehicle from User"}, { status: 200 });
}