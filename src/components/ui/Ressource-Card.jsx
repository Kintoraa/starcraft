import Link from "next/link"
import {AlertDelete} from "@/components/AlertDelete.jsx";
import {FormModifierRessource} from "@/components/FormModifierRessource.jsx";

export default function ResourceCard({title, description, link, badge, isAuth, ressourceId, ressource}) {


    return (
        <div className="bg-gray-800 flex flex-col justify-between overflow-hidden shadow rounded-lg">
            <div className="px-3 py-3">
                <h3 className="text-sm font-medium text-gray-100">{title}</h3>
                <p className="mt-1 text-xs text-gray-400">{description}</p>
            </div>
            <div className="px-3 py-2 flex justify-between">
                <Link
                    href={link}
                    className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Voir plus <span aria-hidden="true">&rarr;</span>
                </Link>
                {badge === "FR" ? (

                    <div className="badge badge-success gap-2 ">
                        {badge.toUpperCase()}
                    </div>
                ) : (
                    <div className="badge badge-warning gap-2">
                        {badge.toUpperCase()}
                    </div>
                )}
            </div>
            {isAuth && (
                <div className={"flex justify-between items-center px-2"}>
                    <FormModifierRessource ressource={ressource}></FormModifierRessource>
                    <AlertDelete ressourceId={ressourceId}></AlertDelete>
                </div>
            )
            }
        </div>
    )
}

