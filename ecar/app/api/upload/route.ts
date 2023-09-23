// Specify as experimental feature
'use server'
export const config = { runtime: 'experimental-edge' }
import { PrismaClient } from '@prisma/client' // connect to database

import { join } from 'path'
import { writeFile } from 'fs/promises' // write new file with builtin function
import { NextResponse, NextRequest } from 'next/server' // JSON response with builtin function

export async function POST(request: NextRequest) {
    console.log('running post')
    // Get file from request
    const data = await request.formData()
    const file = data.get('file') as Blob | File;

    if (!file) {
        console.log('failed')
        console.log(file)
        return NextResponse.json({ success: false })
    }
    // Initialize instances
    const prisma = new PrismaClient();
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = join('/', 'tmp', file.name)
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)
    console.log(file)

    return NextResponse.json({ success: true })
}