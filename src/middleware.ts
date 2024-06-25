import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const withAuth = ["/profile", "/create"];
const authPage = ["/login", "/register", "/verify"];
const securePages = ["/login", "/register", "/verify", "/profile", "/create"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const profileMatch = pathname.match(/^\/profile\/[^/]+$/);

  if (securePages.includes(pathname) || profileMatch) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token && !authPage.includes(pathname) && !profileMatch) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(url);
    }

    if (!token && (withAuth.includes(pathname) || profileMatch)) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(url);
    }

    if (token) {
      if (authPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
