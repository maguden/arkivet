import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

async function seed() {
    const { getPayload } = await import("payload");
    const { default: config } = await import("../src/payload.config");


const payload = await getPayload({ config });

const navigation = await payload.findGlobal({
    slug: "navigation",
});

if (!navigation.siteName) {
    await payload.updateGlobal({
        slug: "navigation",
        data: {
            siteName: "arkivet.",
            links: [
                { label: "Hjem", href: "/" },
                { label: "Database", href: "/database" },
                { label: "Om arkivet", href: "/om-arkivet" },
            ],
        },
    });
}

const homepage = await payload.findGlobal({
    slug: "homepage",
});

if (!homepage.title && !homepage.intro) {
    await payload.updateGlobal({
        slug: "homepage", 
        data: {
            title: "Oppdag kunsten",
            intro: "Utforsk kunst fra MUNCHs samlinger, og verkene og kunstneren bak dem.",
        },
    });
}

const aboutPage = await payload.find({
    collection: "pages",
    where: {
        slug: {
            equals: "om-arkivet"
        },
    },
    limit: 1,
});

if (aboutPage.docs.length === 0) {
    const paragraphs = [
        "Arkivets database gjør det enkelt å bli kjent med Edvard Munchs kunst. Her kan du utforske malerier, grafikk, tegninger og fotografier, og studere hvert verk.",
        "Dette er en side for kunstinteresserte, studenter, og for deg som ønsker oppdage Munchs kunst. Velg en kategori og utforsk i ditt eget tempo, bli bedre kjent med hvert verk.",
        "Bilder og opplysninger blir hentet fra MUNCHs FotoWeb-API. Fotograf, opphavsrett og lisens vises på hvert kunstverks egen detaljside, der hvor informasjonen er tilgjengelig. ",
        "Arkivet er et studentprosjekt laget av Magnus Gude med Next.js, TypeScript og Payload CMS. Nettstedet er ikke et offisielt nettsted fra MUNCH.",
    ];

    await payload.create({
        collection: "pages",
        data: {
            title: "Om arkivet",
            slug: "om-arkivet",
            content: {
                root: {
                    type: "root",
                    version: 1,
                    direction: null,
                    format: "",
                    indent: 0,
                    children: paragraphs.map((text) => ({
                        type: "paragraph",
                        version: 1,
                        direction: null,
                        format: "",
                        indent: 0,
                        children: [
                            {
                                type: "text",
                                version: 1,
                                text,
                                format: 0,
                                detail: 0,
                                mode: "normal",
                                style: "",
                            },                   
                        ],
                    })),
                },
            },
        },
    });
}

await payload.destroy();

console.log("Startinnhold er klart.");
}

seed().catch((error) => {
    console.error(error);
    process.exit(1);
});