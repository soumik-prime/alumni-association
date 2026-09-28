import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute && !session) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url),
    );
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};