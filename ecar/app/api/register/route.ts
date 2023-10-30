import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export async function POST(req: Request) {
    const prisma = new PrismaClient();
    const data = await req.json()
    const name = data.name; const email = data.email; const password = data.password;

    if (!name || !email || !password) {
        await prisma.$disconnect()
        return NextResponse.json({ success: false, error: "Missing email, name, or password"}, { status: 205 });
    }

    const isValue = await prisma.user.findUnique({
        where: { email: email },
    });

    if (isValue) {
        await prisma.$disconnect()
        return NextResponse.json({ success: false, error: "User already exists"}, { status: 202 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    await prisma.$disconnect()
    return NextResponse.json({ success: true, message: "User signed up" }, { status: 200 });
}