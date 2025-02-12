import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "../../lib/session.js";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session")?.value;
        const session = token ? await decrypt(token) : null;

        if (!session) {
            return NextResponse.json({ isAuth: false, userId: null }, { status: 401 });
        }

        return NextResponse.json({ isAuth: true, userId: session?.userId });
    } catch (error) {
        console.error("Erreur serveur:", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}


