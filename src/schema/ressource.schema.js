import {z} from "zod";


export const valuesRessources = {
    section: {
        twitch: "twitch",
        youtube: "youtube",
        internet: "site",
    },
    tag: {
        fr: "FR",
        en: "EN",
    }
}

export const ressourceSchema = z.object({
    title: z.string().min(4, {
        message: "Entrez un titre de minimum 4 caractères",
    }),
    description: z.string().min(4, {
        message: "Entrez une description de minimum 4 caractères",
    }),
    url: z.string().url({
        message: "Entrez une url"
    }),
    tag: z.enum([valuesRessources.tag.fr, valuesRessources.tag.en]),
    section: z.enum([valuesRessources.section.twitch, valuesRessources.section.youtube, valuesRessources.section.internet]),
});