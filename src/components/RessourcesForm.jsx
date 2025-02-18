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
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {createRessource} from "@/db/controller/ressources.controller.js";
import {useState} from "react";
import {toast} from "sonner";
import {LoaderDialog} from "@/components/LoaderDialog.jsx";
import {useReload} from "@/app/store/logged.zustand.js";
import {ressourceSchema, valuesRessources} from "@/schema/ressource.schema.js";


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
                <Button className={"bg-green-800"}>Ajouter une ressource</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1c2433] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={"text-center"}>Ajouter votre ressource</DialogTitle>
                    <DialogDescription className={"text-center"}>
                        Pensez a mettre une description precises et le tag pour la langue ciblé
                    </DialogDescription>
                </DialogHeader>
                {!isLoading ? (

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Titre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="url"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>url</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            /> <FormField
                            control={form.control}
                            name="section"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Section</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="  w-full">
                                                <SelectValue placeholder="Choissisez une section"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className={"bg-[#1c2433]"}>
                                            <SelectItem value={valuesRessources.section.youtube}>Youtube</SelectItem>
                                            <SelectItem value={valuesRessources.section.internet}>Site
                                                Internet</SelectItem>
                                            <SelectItem value={valuesRessources.section.twitch}>Twitch</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                            <FormField
                                control={form.control}
                                name="tag"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tag</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choissisez un Tag"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className={"bg-[#1c2433]"}>
                                                <SelectItem value={valuesRessources.tag.fr}>FR</SelectItem>
                                                <SelectItem value={valuesRessources.tag.en}>EN</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button className={"cursor-pointer"} type="submit">Ajouter</Button>
                        </form>
                    </Form>
                ) : (
                    <LoaderDialog desc={"Ajout en cours..."}></LoaderDialog>
                )}
            </DialogContent>
        </Dialog>
    )
}
