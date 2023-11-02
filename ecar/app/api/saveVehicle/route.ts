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
    const saveId = String(car.make_model.id) as unknown as any;
    const checkId = session?.id as string; // assigns id from token.id ('sub' object)
    const checkEmail = session?.email as string; // assigns email from token.email

    // Search for user in database
    const user = await prisma.user.findUnique({
        where: {
            id: checkId,
            email: checkEmail
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

    const newUser = await prisma.user.update({ // update user with car model in Cars[]
        where: {
            id: checkId,
            email: checkEmail
        },
        data: {
            cars: {
                connect: { 
                    id: checkId
                },
            },
        },
        include: {
            cars: true,
        }
    })

    const updatedUser = prisma.user.findUnique({
        where: { id: checkId, email: checkEmail }
    })

    console.log("newUser", newUser)
    console.log("updatedUser", updatedUser)
    
    console.log('Completed User Update')
    await prisma.$disconnect()
    return NextResponse.json('Completed action');
}