"use client"
import {useEffect, useState} from "react";
import Loading from "@/app/[locale]/dashboard/loading.js";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {useCurrentLocale} from "../../locales/clients.js";
import {getAllLexique} from "@/db/controller/lexique.controller.js";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {useParams} from "next/navigation.js";

export default function Lexique() {
    const idPage = useParams().id;
    const [lexiques, setLexiques] = useState(null);
    const local = useCurrentLocale();

    useEffect(() => {
        const getLexique = async () => {
            const lexiques = await getAllLexique(idPage);
            setLexiques(lexiques);
        }
        getLexique();
    }, [])


    if (!lexiques) return <Loading/>

    return (
        <div className={"flex flex-col gap-4"}>
            {lexiques.length > 0 ? lexiques.map((lexique) => (
                <Card className={"bg-slate-900"}>
                    <CardHeader>
                        <CardTitle>{local === "fr" ? lexique.name_fr : lexique.name_en}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            {local === "fr" ? lexique.description_fr : lexique.description_en}
                        </CardDescription>
                    </CardContent>
                </Card>
            )) : <p>Aucune resultat trouvée</p>}
            <Pagination>
                <PaginationContent>
                    {idPage > 1 &&
                        <PaginationItem>
                            <PaginationPrevious href={`/lexique/${idPage - 1}`}/>
                        </PaginationItem>
                    }
                    <PaginationItem>
                        <PaginationLink href="/lexique/1">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="/lexique/2">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="/lexique/3">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    {idPage < 3 &&
                        <PaginationItem>
                            <PaginationNext href={`/lexique/${idPage + 1}`}/>
                        </PaginationItem>
                    }
                </PaginationContent>
            </Pagination>
        </div>
    )
}