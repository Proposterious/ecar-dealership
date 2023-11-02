import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();  // initiate prisma
    const token = await getToken({ req, secret }); // get token for token.sub (userId)
    if (!token) { return NextResponse.json({ success: false, error: "User not found" }, { status: 404 }) }
    const checkEmail = token?.email as string; // assigns email from token.email

    const user = await prisma.user.findUnique({ // find user and include cars 
        where: { email: checkEmail },
        include: {
            cars: true,
        }
    })

    if (!user) { // quit function if no user
        await prisma.$disconnect();
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    if (user.cars.length < 1) { // quit function if no cars
        await prisma.$disconnect()
        return NextResponse.json({ success: true, message: "No cars found" }, { status: 201 });
    } else { // return cars if they exist on user
        const res = user.cars;
        await prisma.$disconnect();
        return NextResponse.json({ res });
    }
}