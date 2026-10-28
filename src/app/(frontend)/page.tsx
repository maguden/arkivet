import { getPayload } from "payload";
import config from "@/payload.config";
import Link from "next/link";

export default async function Home() {
  const payload = await getPayload({ config });

  const homepage = await payload.findGlobal({
    slug: "homepage",
    depth: 1,
  });

  const image = homepage.image && typeof homepage.image === "object" ? homepage.image : null;

  return (
    <main className="homepage">
     <section className="hero" aria-label="forsidebilde">
       {image?.url && (
         <img
         className="hero-image"
         src={image.url}
         alt={image.alt || ""}
         width={image.width ?? undefined}
         height={image.height ?? undefined}
         />
       )}
     </section>

     <section className="homepage-intro">
       <h1>{homepage.title}</h1>
       <h2>{homepage.intro}</h2>
     </section>

     <section className="category-grid" aria-label="Kunstkategorier">
      {homepage.categories?.map((category) => {
        const categoryImage = 
         category.image && typeof category.image === "object" ? category.image : null;

         return (
          <Link 
             key={category.id}
             href={category.href}
             className="category-card"
          >
            {categoryImage?.url && (
              <img
                 src={categoryImage.url}
                 alt={categoryImage.alt || ""}
              />
            )}

            <h2>{category.title}</h2>
          </Link>
         );
     })}
     </section>
    </main>
  );
}
