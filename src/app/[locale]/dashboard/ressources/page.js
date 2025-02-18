import Ressources from "@/components/Ressources.jsx";
import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation";
import {Suspense} from "react";
import Loading from "@/app/[locale]/dashboard/loading.js";
import {RessourcesForm} from "@/components/RessourcesForm.jsx";

export default async function Page() {
    const session = await verifySession();
    if (!session.isAuth) return redirect("/login");
    return (
        <main className={"min-h-screen pt-40 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <Suspense fallback={<Loading/>}>
                <Ressources isAuth={session.isAuth}></Ressources>
                <RessourcesForm></RessourcesForm>
            </Suspense>
        </main>
    )

}

