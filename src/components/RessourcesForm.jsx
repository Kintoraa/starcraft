"use client"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createRessource} from "@/db/controller/ressources.controller.js";
import {useState} from "react";
import {toast} from "sonner";
import {LoaderDialog} from "@/components/LoaderDialog.jsx";
import {useReload} from "@/app/store/logged.zustand.js";
import {ressourceSchema} from "@/schema/ressource.schema.js";
import {LayoutForm} from "@/components/form/ressource/LayoutForm.jsx";


export function RessourcesForm() {
    const [isLoading, setIsLoading] = useState(false);
    const setReload = useReload((state) => state.SetReload)
    const form = useForm({
        resolver: zodResolver(ressourceSchema),
    })

    const onSubmit = async (values) => {
        setIsLoading(true);
        const res = await createRessource(values);
        if (res) {
            toast.success("Ajout de la ressources avec succés !")
        } else {
            toast.error("Erreur lors de la création de la ressource")
        }
        setIsLoading(false);
        setReload(prevState => !prevState);

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"bg-green-800 "}>Ajouter une ressource</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1c2433] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={"text-center"}>Ajouter votre ressource</DialogTitle>
                    <DialogDescription className={"text-center"}>
                        Pensez a mettre une description precises et le tag pour la langue ciblé
                    </DialogDescription>
                </DialogHeader>
                {!isLoading ? (
                    <LayoutForm onSubmit={onSubmit} form={form}></LayoutForm>
                ) : (
                    <LoaderDialog desc={"Ajout en cours..."}></LoaderDialog>
                )}
            </DialogContent>
        </Dialog>
    )
}
