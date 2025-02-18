"use client"

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ressourceSchema, valuesRessources} from "@/schema/ressource.schema.js";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.jsx";


function SelectValue(props) {
    return null;
}

export function FormModifierRessource({ressource}) {


    const form = useForm({
        resolver: zodResolver(ressourceSchema),
        defaultValues: ressource,
    })

    console.log(ressource)


    const onSubmit = async (data) => {

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
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
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none"
                                            {...field}
                                        />
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
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choissi"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className={"bg-[#1c2433] "}>
                                            <SelectItem value={valuesRessources.tag.fr}>FR</SelectItem>
                                            <SelectItem value={valuesRessources.tag.en}>EN</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="section"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Section</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choissisez un Tag"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className={"bg-[#1c2433] "}>
                                            <SelectItem value={valuesRessources.section.internet}>Site
                                                internet</SelectItem>
                                            <SelectItem value={valuesRessources.section.youtube}>Youtube</SelectItem>
                                            <SelectItem value={valuesRessources.section.twitch}>Twitch</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Sauvegarder</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )

}