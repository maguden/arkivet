import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";
import { getMunchArtworks, getMunchValue } from "@/lib/munch";
import ArtworkCard from "@/components/ArtworkCard";

type Props = {
    searchParams: Promise<{category?: string; cursor?: string;}>;
}

export default async function DatabasePage({ searchParams }: Props) {
    const params = await searchParams;

    const categories = [
        "malerier",
        "grafikk",
        "tegninger",
        "fotografi"
    ];

    const category = 
       params.category && categories.includes(params.category)? params.category: "";

    const result = await getMunchArtworks(category, params.cursor ?? "");

    function pageLink(path: string) {
        const query = new URLSearchParams({
            category,
            cursor:path,
        });

        return `/database?${query.toString()}`;
    }

    return (
        <main className="database-page">
            <aside className="database-filters">
                <form
                   action="/database"
                   method="get"
                   className="database-search"
                >
                    <CategoryFilter
                        key={category}
                        initialCategory={category}
                    />

                    <button type="submit">Vis kategori</button>
                    <Link href="/database">Nullstill</Link>
                </form>
            </aside>

            <div className="database-results">
                {result.data.length === 0 && (
                    <div className="empty-results" role="status">
                        <h2>Ingen treff</h2>
                        <p>Prøv et annet søk</p>
                    </div>
                )}

                <div className="artwork-grid">
                    {result.data.map((artwork) => {
                        const title = getMunchValue(artwork, "5");
                        const preview = artwork.previews[0];

                        const imageUrl = preview? new URL(preview.href, "https://foto.munchmuseet.no").href: null;

                        return (
                            <article key={artwork.href} className="artwork-card">
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
                        )
                    })}
                </div>

                {(result.paging?.prev || result.paging?.next) && (
                    <nav aria-label="Sidevalg">
                        {result.paging?.prev && (
                           <Link href={pageLink(result.paging.prev)}>
                            Forrige
                           </Link>
                        )}

                        {result.paging?.next && (
                           <Link href={pageLink(result.paging.next)}>
                            Neste
                           </Link>
                        )}
                    </nav>
                )}
            </div>
        </main>
    ); 
}