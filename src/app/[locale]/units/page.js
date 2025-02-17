
import {Suspense} from "react";
import Loading from "@/app/[locale]/dashboard/loading.js";
import UnitDashBoardAdmin from "@/components/UnitDashBoardWrapper.jsx";
import UnitDashBoard from "@/components/unitDashBoard.jsx";
import {getI18n} from "../../../../locales/server.js";



export default async function Page() {
    const t = await getI18n();

    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <h1 className={"font-bold text-center text-4xl"}>{t("dashboard.modifier.pageTitle")}</h1>
            <Suspense fallback={<Loading />}>
                <UnitDashBoard isAdmin={false} />
            </Suspense>
        </main>
    )

}
