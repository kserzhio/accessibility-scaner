// middleware.ts

import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isClientRoute = req.nextUrl.pathname.startsWith('/client')

    if (isAdminRoute && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/client', req.url))
    }

    if (isClientRoute && token?.role !== 'USER' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
}
