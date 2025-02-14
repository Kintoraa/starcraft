import FormLogin from "@/components/form";
import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation";

export default async function Page() {
    const session = await verifySession();
    // if(session) return redirect("/")
    return (
        <FormLogin></FormLogin>
    )
}