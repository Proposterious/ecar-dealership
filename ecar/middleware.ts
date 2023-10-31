import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = { matcher: ["/dashboard","/dashboard/:path*"] }