
import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation";
import {Suspense} from "react";
import UnitDashBoard from "@/components/unitDashBoard.jsx";
import {getI18n} from "../../../../../locales/server.js";



export default async function Page() {
    const session = await verifySession();
    const t = await getI18n()
    if(!session.isAuth) return redirect("/login");

    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <h1 className={"font-bold text-center text-4xl"}>{t("dashboard.modifier.pageTitle")}</h1>
            <Suspense fallback={<p>Recherche du contenue ...</p>}>
           <UnitDashBoard></UnitDashBoard>
            </Suspense>
        </main>
    )

}
