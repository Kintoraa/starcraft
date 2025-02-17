import ResourceSection from "@/components/ui/Ressource-Section.jsx";
import {Globe, Twitch, Youtube} from "lucide-react"
import ResourceCard from "@/components/ui/Ressource-Card.jsx";

export default async function Page() {
    return (
        <main className={"min-h-screen pt-40 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <div className="bg-gray-900 rounded-lg max-w-[1200px] m-auto text-gray-100">
                <header className=" rounded-lg bg-gray-800 shadow">
                    <div className=" max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-100 text-center">Resource Page</h1>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto rounded-lg py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <ResourceSection title="Chaine Youtube" icon={<Youtube className="w-5 h-5"/>}>
                            <ResourceCard
                                title="Zuka"
                                description="Meilleur youtubeur starcraft pour les débutant il donne des excellente explication, je vous le conseille fortement, vous pouvez trouvé du gameplay , terran , zergs, protoss "
                                link="https://www.youtube.com/@zukaIngame"
                                badge={"FR"}
                            />

                        </ResourceSection>

                        <ResourceSection title="Chaine Twitch" icon={<Twitch className="w-5 h-5"/>}>
                            <ResourceCard
                                title="Zuka"
                                description="Il fait aussi des lives ! "
                                link="https://www.twitch.tv/zuka_tv?lang=fr"
                                badge={"FR"}
                            />
                        </ResourceSection>

                        <ResourceSection title="Autre site internet" icon={<Globe className="w-5 h-5"/>}>
                            <ResourceCard title="spawningTool"
                                          description="Plein d'info d'ouverture, de replays ect.0.."
                                          link="https://lotv.spawningtool.com/" badge={"EN"}/>

                        </ResourceSection>
                    </div>
                </div>
            </div>
        </main>
    )

}

