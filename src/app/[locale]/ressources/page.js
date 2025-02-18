import Ressources from "@/components/Ressources.jsx";

export default async function Page() {
    return (
        <main className={"min-h-screen pt-40 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <Ressources></Ressources>
        </main>
    )

}

