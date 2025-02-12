import FormLogin from "@/components/form";
import {verifySession} from "@/app/lib/session.js";

export default async function Page() {
    const session = await verifySession();
    console.log(session);
    return (
        <FormLogin></FormLogin>
    )
}