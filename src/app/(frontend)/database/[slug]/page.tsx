import { getMunchArtwork, getMunchValue } from "@/lib/munch";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
}

export default async function ArtworkPage({ params }: Props) {
    const { slug: encodedSlug } = await params;

    let slug: string;

    try {
        slug = decodeURIComponent(encodedSlug);
    } catch {
        notFound();
    }

    const archives = [
        "5013-Malerier",
        "5014-Grafikk",
        "5015-Tegninger",
        "5016-Fotografi",
    ];

    const validArchive = archives.some((archive) => 
        slug.startsWith(`/fotoweb/archives/${archive}/`)
    );

    if (!validArchive || !slug.endsWith(".info")) {
        notFound();
    }

    const artwork = await getMunchArtwork(slug);
    const preview = artwork.previews[0];

    const imageUrl = preview ? new URL(preview.href,"https://foto.munchmuseet.no").href : null;

    return(
        <main className="artwork-detail">
            <div className="artwork-detail-info">
                <h1>{getMunchValue(artwork, "5")}</h1>

                <div className="artwork-detail-meta">
                    <p>{getMunchValue(artwork, "110")}</p>
                    <p>{getMunchValue(artwork, "203")}</p>
                </div>

                <div className="artwork-detail-credits">
                    {getMunchValue(artwork, "80") && (
                    <p>Foto: {getMunchValue(artwork, "80")}</p>
                    )}

                    {getMunchValue(artwork, "315") && (
                        <p>Lisens: {getMunchValue(artwork, "315")}</p>
                    )}

                    {getMunchValue(artwork, "116") && (
                        <p>{getMunchValue(artwork, "116")}</p>
                    )}
                </div>
            </div>

            <div className="artwork-detail-image">
                {imageUrl && (
                    <img
                    src={imageUrl}
                    alt={getMunchValue(artwork, "5")}
                    width={preview?.width}
                    height={preview?.height}
                    />
                )}
            </div>
        </main>
    )
}