import {z} from "zod";

export const formSchemaUnit = z.object({
    name_en: z.optional(z.string().max(25)),
    name_fr: z.optional(z.string().max(25)),
    description_en: z.optional(z.string().max(80)),
    description_fr: z.optional(z.string().max(80)),
    img_url: z.optional(z.string().max(25)),
    count_crystal: z.optional(z.coerce.number().min(0, "Dans starcraft les valeur sont positif").max(1000)),
    count_gaz: z.optional(z.coerce.number().min(0, "Dans starcraft les valeur sont positif").max(1000)),
    place: z.optional(z.coerce.number().min(0, "dans starcraft les valeur sont postif").max(1000)),
    time_production: z.optional(z.coerce.number().min(0, "dans starcraft les valeur sont positif").max(1000)),
    melee_or_ranged_fr: z.enum(["mêlée", "à distance"]),
    melee_or_ranged_en: z.enum(["melee", "ranged"]),
    target_type_en: z.enum(["both", "ground", "air"]),
    target_type_fr: z.enum(["aérien", "les deux", "terrestre"]),
    hp: z.optional(z.coerce.number().min(0, "HP must be at least 1").max(10000)),
});