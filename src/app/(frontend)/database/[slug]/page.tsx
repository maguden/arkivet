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
      <div className="artwork-detail-info">
         <h1>{artwork.title}</h1>

         <div className="artwork-detail-meta">
             <p>{artwork.artist}</p>
             <p>Datering: {artwork.date}</p>
         </div>

         <div className="artwork-detail-credits">
             {artwork.credit && <p>Foto: {artwork.credit}</p>}

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
                   <a href={artwork.sourceUrl}>Se verket hos MUNCH →</a>
                 </p>
             )}
         </div>
      </div>

      <div className="artwork-detail-image">
          {image?.url && (
            <img 
            src={image.url}
            alt={image.alt || ""}
            width={image.width ?? undefined}
            height={image.height ?? undefined}
            style={{ maxWidth: "100%", height: "auto" }}
            />
        )}
      </div>
    </main>

)

}