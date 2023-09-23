import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware';

// MAKE THIS FUNCTION UPDATE DATABASE WITH ENTERED INFORMATION
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequestWithAuth) {
    // Initialize instances
    const prisma = new PrismaClient();
    const image = await req.json();
    const session = await getToken({ req, secret }); // returns dictionary
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
        prisma.$disconnect(); return null;
    }

    // Update user with 'req' data if user found
    await prisma.user.update({
        where: { id: checkId, },
        data: {image: image},
    })
    
    console.log('Completed Image Update')
    prisma.$disconnect()
    return NextResponse.json('Completed action');
}