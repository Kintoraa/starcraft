import {Suspense} from "react";
import Loading from "@/app/[locale]/dashboard/loading.js";
import UnitDashBoardAdmin from "@/components/UnitDashBoardWrapper.jsx";
import {getI18n} from "../../../../../../locales/server.js";
import Unit from "@/components/Unit.jsx";


export default async function Page({ params }) {

    const id = (await params).id
    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>

            <Suspense fallback={<Loading/>}>
          <Unit id_unit={id}></Unit>
            </Suspense>
        </main>
    )
}


