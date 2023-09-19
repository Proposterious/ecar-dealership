import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware';

// MAKE THIS FUNCTION UPDATE DATABASE WITH ENTERED INFORMATION
const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: NextRequestWithAuth) {
    // Initialize instances
    const prisma = new PrismaClient();
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
        prisma.$disconnect(); return NextResponse.json('Failed to complete action');;
    }

    // Update user with 'req' data if user found
    await prisma.user.update({
        where: { id: checkId, },
        data: { image: '' }
    })
    
    console.log('Completed User Delete Image')
    prisma.$disconnect()
    return NextResponse.json('Completed action');
}