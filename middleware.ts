import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This is a client-side only app, so we don't need server-side auth middleware
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
}
