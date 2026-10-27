import { NextResponse } from "next/server";

// Cheap check only: does a session cookie exist? This is NOT security.
export function proxy(request) {
  const session = request.cookies.get("session");

  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Keep it narrow: only the private routes.
export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"],
};