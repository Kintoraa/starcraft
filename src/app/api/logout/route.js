import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ isAuth: false});

    response.cookies.set("session", "", { expires: new Date(0), path: "/" });

    return response;
}
