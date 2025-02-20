import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation";
import {Suspense} from "react";
import {getI18n} from "../../../../../locales/server.js";
import Loading from "@/app/[locale]/dashboard/loading.js";
import UnitDashBoardAdmin from "@/components/UnitDashBoardWrapper.jsx";


export default async function Page() {
    const session = await verifySession();
    if (!session.isAuth) return redirect("/login");
    const t = await getI18n()

    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <h1 className={"font-bold text-center text-4xl"}>{t("dashboard.modifier.pageTitle")}</h1>
            <Suspense fallback={<Loading/>}>
                <UnitDashBoardAdmin/>
            </Suspense>
        </main>
    )

}
