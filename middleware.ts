import { NextResponse } from "next/server";
import { auth } from "./auth";

// this approach worked fine, flexible to add custom logic
export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/issues/new",
    "/issues/edit/:id+",
    /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
     */
  ],
};

// other approaches didn't work dispite the documentation
/* 
1) Using a new instance of NextAuth(authConfig)
    // import authConfig from "./auth.config";
    // import NextAuth from "next-auth";
    // export const { auth: middleware } = NextAuth(authConfig);
    // export const config = { matcher: ["/users/:path*"] }
*/

/* 
2) Using the instance created as export
    // export { auth as middleware } from "@/auth";
    // export const config = { matcher: ["/users/:path*"] }
*/
