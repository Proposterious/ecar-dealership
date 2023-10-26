import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware';

// MAKE THIS FUNCTION UPDATE DATABASE WITH VEHICLE ID
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequestWithAuth) {
    // Initialize instances
    const session = await getToken({ req, secret }); // returns dictionary
    const prisma = new PrismaClient();
    const car = await req.json();
    const saveId = String(car.id) as string;
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
        await prisma.$disconnect(); return null;
    }

    if (user.cars.includes(car.id)) {
        console.log('Car Already Exists on User');
        await prisma.$disconnect(); return null;
    }

    // Update user with 'req' data if user found
    const newCar = await prisma.car.create({
        data: {
            id: checkId,
            carId: saveId,
            user: {
                connect: {
                    id: checkId,
                }
            }
        }
    })

    console.log("newCar", newCar)
    
    console.log('Completed User Update')
    await prisma.$disconnect()
    return NextResponse.json('Completed action');
}