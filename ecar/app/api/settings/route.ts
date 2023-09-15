import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// MAKE THIS FUNCTION UPDATE DATABASE WITH ENTERED INFORMATION
export async function POST(req: Request) {
    const data = await req.json()
    const dataId = data.id as string;
    const user: any = await prisma.user.findUnique({
        where: { id: dataId },
    });
    const 
    // fullName: "",
    //     phoneNumber: "",
    //     name: "",
    //     email: "",
    //     bio: "",
    prisma.$disconnect
    return NextResponse.json('NONE YET');
}