import { getPayload } from "payload";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import config from "@/payload.config";

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

  return (
    <div>
      <h1>{page.title}</h1>
      {page.content && <RichText data={page.content} />}
    </div>
  );
}