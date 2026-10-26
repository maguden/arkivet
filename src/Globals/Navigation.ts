import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigasjon",
  fields: [
    {
      name: "siteName",
      label: "NettstedNavn",
      type: "text",
      required: true,
    },
    {
    name: "links",
    label: "Lenker",
    type: "array",
    fields: [
      {
        name: "label",
        label: "Tittel",
        type: "text",
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