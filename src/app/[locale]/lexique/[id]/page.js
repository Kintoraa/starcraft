import Lexique from "@/components/Lexique.jsx";

export default async function Page() {

    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <h1 className="text-2xl font-bold text-gray-100 text-center">Lexique</h1>
            <Lexique/>
        </main>
    )

}
