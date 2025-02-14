import StarcraftRaces from "@/components/starCraftComponents.jsx";
import {getAllRaces} from "@/db/controller/races.controller.js";
import {getAllUnityWithRace} from "@/db/controller/units.controller.js";
import DashBoard from "@/components/dashBoard.jsx";
import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation";


export default async function Page() {
    const session = await verifySession();
    if(!session.isAuth) return redirect("/login");

    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <h1 className={"font-bold text-center text-4xl"}>Les races et counteur de Starcraft 2</h1>
            <DashBoard ></DashBoard>
        </main>
    )

}
