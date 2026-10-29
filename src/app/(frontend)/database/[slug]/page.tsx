import { getPayload } from "payload";
import { notFound } from "next/navigation";
import Link from "next/link";
import config from "@/payload.config";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ArtworkPage({ params }: Props) {
    const { slug } = await params;
    const payload = await getPayload({ config });

    const result = await payload.find({
        collection: "artworks",
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 1,
        limit: 1,
});

const artwork = result.docs[0];

if (!artwork) {
    notFound();
}

const image = artwork.image && typeof artwork.image === "object" ? artwork.image : null;

return (
    <main className="artwork-detail">
        <h1>{artwork.title}</h1>

        {image?.url && (
            <img 
            src={image.url}
            alt={image.alt || ""}
            width={image.width ?? undefined}
            height={image.height ?? undefined}
            style={{ maxWidth: "100%", height: "auto" }}
            />
        )}

        <p>{artwork.artist}</p>
        <p>{artwork.date}</p>

        {artwork.credit && <p>{artwork.credit}</p>}

        {artwork.license && (
            <p>
                Lisens: {" "}
                {artwork.licenseUrl ? (
                    <a href={artwork.licenseUrl}>{artwork.license}</a>
                ) : (
                    artwork.license
                )}
            </p>
        )}

        {artwork.sourceUrl && (
            <p>
                <a href={artwork.sourceUrl}>Se verket hos MUNCH</a>
            </p>
        )}
    </main>

)

}