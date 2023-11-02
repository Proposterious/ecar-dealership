import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware';

// MAKE THIS FUNCTION UPDATE DATABASE WITH VEHICLE ID
const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: NextRequestWithAuth) {
    // Initialize instances
    const session = await getToken({ req, secret }); // returns dictionary
    const prisma = new PrismaClient();
    const car = await req.json();
    const saveId = car as unknown as any;
    const checkId = session?.sub as string; // assigns id from token.id ('sub' object)
    const checkEmail = session?.email as string; // assigns email from token.email
    
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
        console.log('Car Does Not Exist on User', saveId);
        await prisma.$disconnect(); return NextResponse.json("Car Exists: Error 202");
    }

    const deleteCar = await prisma.user.update({
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
    })

    const updatedUser = await prisma.user.findUnique({
        where: { id: checkId, email: checkEmail },
        include: { cars: true }
    })

    console.log("deleteCar", deleteCar)
    console.log("updatedUser", updatedUser)
    
    console.log('Completed User Update')
    await prisma.$disconnect();
    return NextResponse.json({ success: true, message: "Completed Action."}, { status: 200 });
}