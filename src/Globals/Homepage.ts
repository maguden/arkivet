import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
    slug: "homepage",
    label: "Forside",
    fields: [
        {
            name: "title",
            label: "Overskrift",
            type: "text",
        },
        {
            name: "intro",
            label: "Introduksjon",
            type: "textarea",
        },
        {
            name: "image",
            label: "Hovedbilde",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "categories",
            label: "Kategorier",
            type: "array",
            maxRows: 4,
            fields: [
                {
                    name: "title",
                    label: "Tittel",
                    type: "text",
                    required: true,
                },
                {
                    name: "image",
                    label: "Bilde",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "href",
                    label: "Lenke",
                    type: "text",
                    required: true,
                },
            ],
        },
    ],
};