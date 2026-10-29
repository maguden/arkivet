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
            name: "artist",
            label: "Kunstner",
            type: "text",
        },
        {
            name: "date",
            label: "datering",
            type: "number",
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