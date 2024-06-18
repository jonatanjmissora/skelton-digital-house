import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("SIIIII");

  try {
    const username = request.cookies.get('username')?.value ?? ''
    if (!username) throw new Error("No hay username");
  } catch (e) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard']
}
