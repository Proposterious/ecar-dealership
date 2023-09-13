import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: Request) {
    const data = await req.json()
    const name = data.name; const email = data.email; const password = data.password;
    console.log(data)

    if (!name || !email || !password) {
        return new NextResponse('Missing name, email, or password...', { status: 400 })
    }

    const isValue: any = await prisma.user.findUnique({
        where: { email: email },
    });
    console.log({ isValue })
    if (isValue != null) {
        return new NextResponse("User already exists", { status: 405 })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });
    prisma.$disconnect
    return NextResponse.json(user);
}