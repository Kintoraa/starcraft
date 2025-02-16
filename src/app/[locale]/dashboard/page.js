
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import Link from 'next/link'
import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation.js";

export default async function Page() {
    const session = await verifySession();
    if(!session.isAuth) return redirect("/login");
    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Tableau de bord</h1>
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className={"text-center"}></CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Button asChild className="w-full">
                            <Link href="/dashboard/counter">Gerer les counters</Link>
                        </Button>
                        <Button asChild className="w-full">
                            <Link href="/dashboard/unit">Modifier les unités</Link>
                        </Button>
                        <Button asChild className="w-full">
                            <Link href="/dashboard/link3">Lien 3</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    )

}
