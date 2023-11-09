import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware';

// MAKE THIS FUNCTION UPDATE DATABASE WITH VEHICLE ID
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequestWithAuth) {
    // Initialize instances
    const session = await getToken({ req, secret, 
        cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'}); // get token from userCookie
    const prisma = new PrismaClient();
    const car = await req.json();
    const saveId = car as unknown as any;
    const checkId = session?.sub as string; // assigns id from token.id ('sub' object)
    
    if (session === null) {
        await prisma.$disconnect()
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 }) ;
    }
    // Search for user in database
    const user = await prisma.user.findUnique({
        where: {
            id: checkId,
        }
    });

    // Quit the function if user not found
    if (!user) { 
        console.log('Session Failed');
        await prisma.$disconnect(); return NextResponse.json("User Not Found: Error 404");
    }

    // Return car if exists on 'user'
    const oldCar = await prisma.car.findFirst({
        where: {
            userId: checkId,
            carId: saveId,
        }
    })

    if (oldCar) { // quit function if car exists
        console.log('Car Already Exists on User', saveId);
        await prisma.$disconnect(); return NextResponse.json("Car Exists: Error 202");
    }
    
    const newCar: any = await prisma.car.create({
        data: {
            userId: checkId,
            carId: car
        }
    }).catch((error) => {
        console.log("error creating car", error)
        prisma.$disconnect()
        return NextResponse.json({ success: false, error: error}, { status: 503 })
    });

    const newUser = await prisma.user.update({ // update user with car model in Cars[]
        where: {
            id: checkId,
        },
        data: {
            cars: {
                connect: { 
                    id: checkId,
                },
            },
        },
        include: {
            cars: true,
        }
    }).catch((error) => {
        console.log("error connecting user to car", error)
        prisma.$disconnect()
        return NextResponse.json({ success: false, error: error}, { status: 503 })
    })

    console.log("created Car", newCar)
    console.log("connected User", newUser)

    await prisma.$disconnect();
    return NextResponse.json({ success: true, message: "Completed Action from saveVehicleById"});
}