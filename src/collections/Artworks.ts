import { slugField, type CollectionConfig } from "payload";

export const Artworks: CollectionConfig = {
    slug: "artworks",
    labels: {
        singular: "Kunstverk",
        plural: "Kunstverk",
    },
    admin: {
       useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            label: "Tittel",
            type: "text",
            required: true,
        },
        slugField(),
        {
            name: "munchId",
            label: "Inventarnummer hos MUNCH",
            type: "text",
            index: true,
        },
        {
            name: "artist",
            label: "Kunstner",
            type: "text",
        },
        {
            name: "date",
            label: "datering fra",
            type: "number",
        },
        {
            name: "dateTo",
            label: "Datering til",
            type: "number",
            admin: {
                description: "Fyll ut hvis verket datert til en pariode i stedet for et spesifikt årstall.",
            }
        },
        {
            name: "category",
            label: "Kategori",
            type: "select",
            required: true,
            options: [
                { label: "Malerier", value: "malerier" },
                { label: "Grafikk", value: "grafikk" },
                { label: "Tegninger", value: "tegninger" },
                { label: "Fotografi", value: "fotografi" },
            ],
        },
        {
            name: "image",
            label: "Bilde",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "description",
            label: "Beskrivelse",
            type: "textarea",
        },
        {
            name: "credit",
            label: "Fotokreditering",
            type: "text",
        },
        {
            name: "license",
            label: "Lisens",
            type: "text",
        },
        {
            name: "licenseUrl",
            label: "Lenke til lisens",
            type: "text",
        },
        {
            name: "sourceUrl",
            label: "Lenke til verket hos MUNCH",
            type: "text",
        },
    ],
};