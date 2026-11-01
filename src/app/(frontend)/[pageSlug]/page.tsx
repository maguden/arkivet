import { getPayload } from "payload";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import config from "@/payload.config";
import Link from "next/link";

type Props = {
  params: Promise<{ pageSlug: string }>;
}

export default async function Page({ params }: Props) {
  const { pageSlug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: pageSlug
      },
    },
    limit: 1,
    depth: 1,
  });

  const page = result.docs[0];

  if (!page) {
    notFound();
  }

  const image = page.image && typeof page.image === "object" ? page.image : null;

  return (
    <main className="about-page">
      <h1>{page.title}</h1>
      {page.content && (
        <div className="about-content">
          <RichText data={page.content} />
        </div>
      )}
      {image?.url && (<img src={image.url} alt={image.alt || ""} style={{ maxWidth: "100%", height: "auto" }} />)}
      <Link className="about-link" href="/database">Utforsk databasen →</Link>
    </main>
  );
}