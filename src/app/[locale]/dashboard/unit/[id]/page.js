import {Suspense} from "react";
import Loading from "@/app/[locale]/dashboard/loading.js";
import {getI18n} from "../../../../../../locales/server.js";
import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation.js";
import UnitAdmin from "@/components/unitAdmin.jsx";


export default async function Page({params}) {
    const session = await verifySession();
    if (!session.isAuth) return redirect("/login");
    const t = await getI18n()

    const id = (await params).id
    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>

            <Suspense fallback={<Loading/>}>
                <UnitAdmin id_unit={id}></UnitAdmin>
            </Suspense>
        </main>
    )
}


