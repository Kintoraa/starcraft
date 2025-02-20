"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {deleteRessource} from "@/db/controller/ressources.controller.js";
import {useState} from "react";
import Error from "@/components/Error.jsx";
import {toast} from "sonner";
import {LoaderDialog} from "@/components/LoaderDialog.jsx";
import {useReload} from "@/app/store/logged.zustand.js";

export function AlertDelete({ressourceId}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(false);
    const setReload = useReload((state) => state.SetReload)

    const handleClick = async (id) => {

        if (!ressourceId) return toast.error("Aucun ressource trouvée")
        setIsLoading(true);
        const res = await deleteRessource(id)
        setIsLoading(false);
        if (!res) setError(true);
        setReload(prevState => !prevState);
        toast.success("Ressource supprimé avec succés !")
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={"bg-red-500 my-2 cursor-pointer"}>Supprimer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={"bg-gray-800"}>
                {isLoading ? (<LoaderDialog desc={"Supression en cours ..."}></LoaderDialog>) :
                    (
                        <>
                            <AlertDialogDescription></AlertDialogDescription>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Vous etes vraiment sur de vouloir supprimer ? </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className={"cursor-pointer"}>Annuler</AlertDialogCancel>
                                <AlertDialogAction className={"bg-red-500 cursor-pointer"}
                                                   onClick={() => handleClick(ressourceId)}>Continuer</AlertDialogAction>
                                {isError && (<Error></Error>)}
                            </AlertDialogFooter>
                        </>
                    )}
            </AlertDialogContent>
        </AlertDialog>
    )
}
