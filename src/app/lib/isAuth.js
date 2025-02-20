import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation";

export async function isAuthorized() {
    const session = await verifySession();
    if (!session.isAuth) return redirect("/login");
}