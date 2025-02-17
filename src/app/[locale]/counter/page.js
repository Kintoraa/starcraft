import StarcraftRaces from "@/components/starCraftComponents.jsx";
import {getAllRaces} from "@/db/controller/races.controller.js";
import { getAllUnityWithRace} from "@/db/controller/units.controller.js";
import Loading from "@/app/[locale]/dashboard/loading.js";
import {Suspense} from "react";



 export default async function Page() {
    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <Suspense fallback={<Loading />}>
            <StarcraftRaces></StarcraftRaces>
            </Suspense>
        </main>
    )

}

