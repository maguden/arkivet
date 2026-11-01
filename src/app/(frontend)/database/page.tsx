import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";
import { getMunchArtworks } from "@/lib/munch";
import ArtworkCard from "@/components/ArtworkCard";

type Props = {
    searchParams: Promise<{category?: string; cursor?: string; page?: string;}>;
}

export default async function DatabasePage({ searchParams }: Props) {
    const params = await searchParams;

    const requestedPage = Number(params.page);

    const currentPage = Number.isInteger(requestedPage) && requestedPage > 0? requestedPage: 1;

    const categories = [
        "malerier",
        "grafikk",
        "tegninger",
        "fotografi"
    ];

    const category = 
       params.category && categories.includes(params.category)? params.category: "";

    const result = await getMunchArtworks(category, params.cursor ?? "");

    function pageLink(path: string, page: number) {
        const query = new URLSearchParams({
            category,
            cursor:path,
            page: String(page),
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
                    {result.data.map((artwork) => (
                        <ArtworkCard key={artwork.href} artwork={artwork} />
                    ))}
                </div>

                {(result.paging?.prev || result.paging?.next) && (
                    <nav aria-label="Sidevalg">
                        {result.paging?.prev && (
                           <Link href={pageLink(result.paging.prev, Math.max(1, currentPage -1))}>
                            ←
                           </Link>
                        )}

                        <span aria-current="page">{currentPage}</span>

                        {result.paging?.next && (
                           <Link href={pageLink(result.paging.next, currentPage + 1)}>
                            →
                           </Link>
                        )}
                    </nav>
                )}
            </div>
        </main>
    ); 
}