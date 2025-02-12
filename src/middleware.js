import { createI18nMiddleware } from "next-international/middleware";


const I18nMiddleware = createI18nMiddleware({
    locales: ["fr", "en"],
    defaultLocale: "fr",
});

export function middleware(request) {
    return I18nMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};


//
// const I18nMiddleware = createI18nMiddleware({
//     locales: ["fr", "en"],
//     defaultLocale: "fr",
// });
//
// export function middleware(request) {
//     return I18nMiddleware(request);
// }
//
// export const config = {
//     matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
// };
//
// import { NextResponse } from "next/server";
//
// export function middleware(request) {
//     const session = request.cookies.get("session")?.value;
//
//     if (!session) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }
//
//     return NextResponse.next();
// }
//
// export const config = {
//     matcher: ["/dashboard/:path*"], // Protège toutes les pages dans `/dashboard`
// };
