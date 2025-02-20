import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {valuesRessources} from "@/schema/ressource.schema.js";
import {Button} from "@/components/ui/button.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";

export function LayoutForm({onSubmit, form}) {

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                                <Input{...field} />
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
                                    className="resize-none "
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
                            <FormLabel>url</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
    )
}