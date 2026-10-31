import Link from "next/link";
import { getMunchValue, type MunchAsset } from "@/lib/munch";

type Props = {
    artwork: MunchAsset;
}

export default function ArtworkCard({ artwork }: Props) {
    const title = getMunchValue(artwork, "5");
    const preview = artwork.previews[0];

    const imageUrl = preview? new URL(preview.href, "https://foto.munchmuseet.no").href: null;

    return (
        <article className="artwork-card">
            <Link href={`/database/${encodeURIComponent(artwork.href)}`}>
               {imageUrl && (
                  <img
                  src={imageUrl}
                  alt={title}
                  width={preview?.width}
                  height={preview?.height}
                  />
               )}

               <h2>{title}</h2>
            </Link>

            <p>{getMunchValue(artwork, "203")}</p>
        </article>
    );
}