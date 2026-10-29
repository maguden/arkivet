import { getPayload, type Where } from "payload";
import config from "@/payload.config";
import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";

type Props = {
    searchParams: Promise<{ 
        page?: string;
        name?: string;
        from?: string;
        to?: string;
        category?: string; 
    }>;
};

export default async function DatabasePage({ searchParams}: Props) {
    const params = await searchParams;
    const requestedPage = Number(params.page);

    const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const payload = await getPayload({ config });

    const filters: Where[] = [];

    if (params.name?.trim()) {
        filters.push({
            title: {
                contains: params.name.trim(),
            },
        });
    }

    if (params.from?.trim()) {
        const fromYear = Number(params.from);

        if (Number.isInteger(fromYear)) {
            filters.push({
                date: {
                    greater_than_equal: fromYear,
                },
            });
        }
    }

    if (params.to?.trim()) {
        const toYear = Number(params.to);

        if (Number.isInteger(toYear)) {
            filters.push({
                date: {
                    less_than_equal: toYear,
                },
            });
        }
    }

    const categories = [
        "malerier",
        "grafikk",
        "tegninger",
        "fotografier",
    ];

    if (params.category && categories.includes(params.category)) {
        filters.push({
            category: {
                equals: params.category,
            },
        });
    }


    const result = await payload.find({
        collection: "artworks",
        depth: 1,
        limit: 20,
        page: currentPage,
        sort: "title",
        where: filters.length > 0 ? { and: filters } : {},
    });

    function pageLink(page: number) {
        const query = new URLSearchParams();

        if (params.name) query.set("name", params.name);
        if (params.from) query.set("from", params.from);
        if (params.to) query.set("to", params.to);
        if (params.category) query.set("category", params.category);

        query.set("page", String(page));

        return `/database?${query.toString()}`;
    }

    return (
        <main className="database-page">
         <aside className="database-filters">
             <form action="/database" method="get" className="database-search">
                 <CategoryFilter 
                   key={params.category ?? ""}
                   initialCategory={params.category ?? ""}
                 />

                 <div>
                     <label htmlFor="artwork-name">Søk etter verk</label>
                     <input
                         id="artwork-name"
                         name="name"
                         type="search"
                         placeholder="Navn"
                         defaultValue={params.name ?? ""}
                     />
                 </div>

                 <fieldset>
                     <legend>Datering</legend>

                     <div className="date-range">
                     <div>
                     <input 
                         id="year-from"
                         name="from"
                         type="number"
                         step="1"
                         placeholder="Fra"
                         aria-label="Datering fra år"
                         defaultValue={params.from ?? ""}
                     />
                     </div>

                     <div>
                     <input
                         id="year-to"
                         name="to"
                         type="number"
                         step="1"
                         placeholder="Til"
                         aria-label="Datering til år"
                         defaultValue={params.to ?? ""}
                     />
                     </div>
                  </div>
                 </fieldset>  

                 <button type="submit">Søk</button> 
                 <Link href="/database">Nullstill</Link> 
             </form>
         </aside>
            <div className="database-results">
                {result.totalDocs === 0 && (
                  <div className="empty-results" role="status">
                     <h2>Ingen treff</h2>
                     <p>Prøv en annen tittel, kategori eller datering.</p>
                  </div>
                )}

               <div className="artwork-grid">
                 {result.docs.map((artwork) => {
                     const image =
                     artwork.image && typeof artwork.image === "object" ? artwork.image : null;

                     return (
                        <article key={artwork.id} className="artwork-card">
                          <Link href={`/database/${artwork.slug}`}>
                            {image?.url && (
                              <img
                                 src={image.url}
                                 alt={image.alt || ""}
                                 width={image.width ?? undefined}
                                 height={image.height ?? undefined}
                              />
                            )}

                            <h2>{artwork.title}</h2>
                          </Link>
                            <p>
                                {artwork.date}
                            </p>
                        </article>
                    );
                })}
            </div>

            {result.totalPages > 1 && (
                <nav aria-label="Sidevalg">
                    {result.hasPrevPage && (
                        <Link href={pageLink(result.prevPage!)}>Forrige</Link>
                    )}

                    <span>
                        {result.page} av {result.totalPages}
                    </span>

                    {result.hasNextPage && (
                        <Link href={pageLink(result.nextPage!)}>Neste</Link>
                    )}
                </nav>
            )}
            </div>
        </main>
    );
}