import { not } from "@payloadcms/db-postgres/drizzle";
import { notFound } from "next/navigation";

export type MunchAsset = {
    href: string;
    metadata: Record<
        string,
        { value?: string | string[] } | undefined
    >;

    previews: {
        href: string;
        width: number;
        height: number;
    }[];
};

type MunchAssetList = {
    data: MunchAsset[];
    paging?: {
        next?: string | null;
        prev?: string | null;
        last?: string | null;
    };
};

export async function getMunchArtwork(
    assetPath: string
): Promise<MunchAsset> {
    const url = new URL(
        assetPath, "https://foto.munchmuseet.no"
    );

    const response = await fetch(url, {
        headers: {
            Accept: "application/vnd.fotoware.asset+json",
        },
        cache: "no-store",
    });

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error(
            `Kunne ikke hente verket fra MUNCH: ${response.status}`,
        );
    }

    return response.json();
}

export function getMunchValue(
    artwork: MunchAsset,
    field: string
): string {
    const value = artwork.metadata[field]?.value;

    if (Array.isArray(value)) {
        return value.join(",");
    }

    return value ?? "";
}

export async function getMunchArtworks(
    category = "",
    pagePath = ""
): Promise<MunchAssetList> {
    const archives = [
        { category: "malerier", archive: "5013-Malerier" },
        { category: "grafikk", archive: "5014-Grafikk" },
        { category: "tegninger", archive: "5015-Tegninger" },
        { category: "fotografi", archive: "5016-Fotografi" },
    ];

    const baseUrl = "https://foto.munchmuseet.no";

    function archivePath(index: number) {
        return `/fotoweb/archives/${archives[index].archive}/`;
    }

    let archiveIndex = 0;

    if (category) {
        archiveIndex = archives.findIndex(
            (item) => item.category === category
        );
    } else if (pagePath) {
        const url = new URL(pagePath, baseUrl);

        archiveIndex = archives.findIndex((item) =>
            url.pathname.startsWith(
                `/fotoweb/archives/${item.archive}`
            )
        );
    }

    if (archiveIndex === -1) {
        throw new Error("Ugyldig kategori eller sideadresse.");
    }

    async function fetchPage(
        path: string,
        index: number
    ): Promise<MunchAssetList> {
        const url = new URL(path, baseUrl);

        if (
            url.origin !== baseUrl ||
            !url.pathname.startsWith(archivePath(index))
        ) {
            throw new Error("Ugyldig sideadresse.");
        }

        const response = await fetch(url, {
            headers: {
                Accept: "application/vnd.fotoware.assetlist+json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(
                `Kunne ikke hente verk fra MUNCH: ${response.status}`
            );
        }

        return response.json();
    }

    const result = await fetchPage(
        pagePath || archivePath(archiveIndex),
        archiveIndex
    );

    console.log("SIDEINFO", result.paging);

    let next = result.paging?.next ?? null;
    let prev = result.paging?.prev ?? null;

    if (!category) {
        if (!next && archiveIndex < archives.length -1) {
            next = archivePath(archiveIndex + 1);
        }

        if (!prev && archiveIndex > 0) {
            const previousArchive = await fetchPage(
                archivePath(archiveIndex - 1),
                archiveIndex - 1
            );

            prev = previousArchive.paging?.last || archivePath(archiveIndex - 1);
        }
    }

    return {
        data: result.data,
        paging: {
            next,
            prev,
        },
    };
}


export function getMunchDates(value: string): {
    date: number | null;
    dateTo: number | null;
} {
    const match = value.trim().match(
        /^(\d{4})(?:\s*[-–—]\s*(\d{4}))?$/
    );

    if (!match) {
        return { date: null, dateTo: null };
    }

    const date = Number(match[1]);
    const dateTo = match[2] ? Number(match[2]) : null;

    if (dateTo !== null && dateTo < date) {
        return { date: null, dateTo: null };
    }

    return { date, dateTo };
}

