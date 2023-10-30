import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/employment')) { // send to employment if employment
        return NextResponse.rewrite(new URL('/employment', request.url))
    } else if (request.nextUrl.pathname.startsWith('/dashboard')) { // send to dashboard if dashboard
        return NextResponse.rewrite(new URL('/dashboard', request.url))
    } else if (request.nextUrl.pathname.startsWith('/service')) { // send to home if /service
        return NextResponse.rewrite(new URL('/', request.url)) 
    } else { return NextResponse.rewrite(new URL('/dashboard', request.url))}
}

export const config = { matcher: ["/dashboard","/dashboard/:path*"] }