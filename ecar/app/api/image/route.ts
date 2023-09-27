import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware';

// MAKE THIS FUNCTION UPDATE DATABASE WITH ENTERED INFORMATION
const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequestWithAuth) {
    // Initialize instances
    const prisma = new PrismaClient();
    const session = await getToken({ req, secret }); // returns dictionary
    const checkId = session?.sub as string; // assigns id from token.id ('sub' object)

    const user = await prisma.user.findUnique({
        where: { id: checkId }
    })
    const image = user?.image;
    if (!image) {
        return NextResponse.json('Failed to Fetch Image')
    }
    prisma.$disconnect()
    console.log(image)
    return NextResponse.json(image);
}