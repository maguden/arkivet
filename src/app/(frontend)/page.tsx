import { getPayload } from "payload";
import config from "@/payload.config";
import Link from "next/link";

export default async function Home() {
  const payload = await getPayload({ config });

  const homepage = await payload.findGlobal({
    slug: "homepage",
    depth: 1,
  });

  const categories = [
    {
      title: "Malerier",
      image: "/images/malerier.jpg",
      href: "/database?category=malerier",
    },
    {
      title: "Grafikk",
      image: "/images/grafikk.jpg",
      href: "/database?category=grafikk",
    },
    {
      title: "Tegninger",
      image: "/images/tegninger.jpg",
      href: "/database?category=tegninger",
    },
    {
      title: "Fotografi",
      image: "/images/fotografi.jpg",
      href: "/database?category=fotografi",
    },
  ];

  return (
    <main className="homepage">
     <section className="hero" aria-label="forsidebilde">
         <img
         className="hero-image"
         src="/images/hero.jpg"
         alt="Maleri fra MUNCHs samling"
         />
     </section>

     <section className="homepage-intro">
       <h1>{homepage.title}</h1>
       <h2>{homepage.intro}</h2>
     </section>

     <section className="category-grid" aria-label="Kunstkategorier">
      {categories.map((category) => {

         return (
          <Link 
             key={category.href}
             href={category.href}
             className="category-card"
          >
              <img src={category.image} alt="" />

            <h2>{category.title}</h2>
          </Link>
         );
     })}
     </section>
    </main>
  );
}
