import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation.js";


export default async function Page({ params }) {
    const session = await verifySession();
    if(!session.isAuth) return redirect("/login");

    const id = (await params).id
    return <div>My Post: {id}</div>
}


