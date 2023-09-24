// Specify as experimental feature
export const config = { runtime: 'experimental-edge' }
import { PrismaClient } from '@prisma/client' // connect to database

import fs from 'fs'; // file conversion tool
import { getToken } from 'next-auth/jwt' // get user's session/token
import { NextResponse } from 'next/server' // JSON response with builtin function
import { NextRequestWithAuth } from 'next-auth/middleware'

// MAKE THIS FUNCTION UPDATE DATABASE WITH ENTERED INFORMATION
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequestWithAuth) { 
    console.log('running post')
    // Get file from request
    const file = await req.json() as unknown as string;
    // Initialize instances
    const prisma = new PrismaClient();
    const session = await getToken({ req, secret }); // returns dictionary
    console.log(session)
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
    // Update user once verified
    console.log('THIS ACCORDINGLY IS THE FILE SENT BY POST\n',file)
    await prisma.user.update({
        where: { id: checkId },
        data: {
            image: file,
        },
    })
    
    prisma.$disconnect(); // close prisma's connection
    return NextResponse.json({ success: true }) // return 'res.ok(200)'
}
