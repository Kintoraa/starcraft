"use client"

import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {LayoutForm} from "@/components/form/ressource/LayoutForm.jsx";
import {updateRessource} from "@/db/controller/ressources.controller.js";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {ressourceSchema} from "@/schema/ressource.schema.js";
import {LoaderDialog} from "@/components/LoaderDialog.jsx";
import {useReload} from "@/app/store/logged.zustand.js";


export function FormModifierRessource({ressource, ressourceId}) {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const setReload = useReload((prev) => prev.SetReload);

    const form = useForm({
        resolver: zodResolver(ressourceSchema),
        defaultValues: ressource,
    })


    const onSubmit = async (data) => {
        setIsLoading(true);
        const res = await updateRessource(data, ressourceId);
        setReload((prev) => !prev);
        setIsLoading(false);
        if (!res) return setError(true)

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 ">
                <DialogHeader>
                    <DialogTitle>Modifier la ressource</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                {!isLoading ? (
                        <LayoutForm onSubmit={onSubmit} form={form}></LayoutForm>
                    ) :
                    <LoaderDialog></LoaderDialog>
                }
                {error && (<p>Erreur lors de l'envoie du formulaire</p>)}
            </DialogContent>
        </Dialog>

    )

}