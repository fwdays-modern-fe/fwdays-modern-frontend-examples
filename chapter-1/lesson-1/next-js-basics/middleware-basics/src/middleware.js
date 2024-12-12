import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (request?.nextUrl?.pathname === "/") {
    return;
  }

  if (request?.nextUrl?.pathname !== "/sign-in" && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request?.nextUrl?.pathname !== "/home" && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - next.svg - starter image
     * - vercel.svg - starter image
     */
    "/((?!api|_next/static|_next/image|favicon.ico|next.svg|vercel.svg).*)",
  ],
};
