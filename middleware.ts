import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value ?? ''
    if (!token) throw new Error("No hay user id");
  } catch (e) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}
