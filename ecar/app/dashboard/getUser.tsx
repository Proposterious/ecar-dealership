'use client'
// Imports
import { NextResponse } from 'next/server'
import { useSession } from "next-auth/react"

export default function Get() {
    const { data: session } = useSession() as any; // as any in this instance as passing userId to Object (session)
    if (!session) { return null }  // If not logged in
    else { NextResponse.json(session) }
    
    const userId = session.id;
    return userId;
}
