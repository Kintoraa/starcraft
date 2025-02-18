"use client";

import ResourceSection from "@/components/ui/Ressource-Section.jsx";
import {Youtube} from "lucide-react";
import ResourceCard from "@/components/ui/Ressource-Card.jsx";
import {useReload} from "@/app/store/logged.zustand.js";
import {useEffect, useState} from "react";
import {getAllRessources} from "@/db/controller/ressources.controller.js";
import {toast} from "sonner";
import Loading from "@/app/[locale]/dashboard/loading.js";


export default function Ressources({isAuth}) {
    const reload = useReload((state) => state.reload);
    const [isRessources, setRessources] = useState([]);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchRessources = async () => {
            try {
                const ressources = await getAllRessources();
                setRessources(ressources);
                setSections([...new Set(ressources.map((ressource) => ressource.section))]);
            } catch (error) {
                toast.error("Erreur lors de la récupération des ressources ");
            }
        };

        fetchRessources();
    }, [reload]);

    return (
        <div className="bg-gray-900 rounded-lg max-w-[1200px] m-auto text-gray-100">
            <header className="rounded-lg bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-100 text-center">
                        Les différentes ressources
                    </h1>
                </div>
            </header>

            <div className="max-w-7xl mx-auto rounded-lg py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {sections.length > 0 ? (
                        sections.map((section, index) => (
                            <ResourceSection key={index} title={section} icon={<Youtube className="w-5 h-5"/>}>
                                {isRessources
                                    .filter((ressource) => section === ressource.section)
                                    .map((ressource) => (
                                        <ResourceCard
                                            isAuth={isAuth}
                                            key={ressource.id}
                                            ressource={ressource}
                                            ressourceId={ressource.id}
                                            title={ressource.title}
                                            description={ressource.description}
                                            badge={ressource.tag}
                                            link={ressource.url}
                                        />
                                    ))}
                            </ResourceSection>
                        ))
                    ) : (
                        <Loading></Loading>
                    )}
                </div>
            </div>
        </div>
    );
}
