import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from './auth/[...nextauth]/options'

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    return NextResponse.json ({ authenticated: !!session})
}