export default async function Home() {
  const response = await fetch(
        "https://foto.munchmuseet.no/fotoweb/archives/5013-Malerier/",
        {
          headers: {
            accept: "application/vnd.fotoware.assetlist+json",
          },
        }
  );

  if (!response.ok) {
    return <p>Kunne ikke hente kunstverk</p>;
  }

  const result = await response.json();
  const artwork = result.data[0];

  return (
    <main>
      <h1>arkivet.</h1>
      <p>Utforsk MUNCH sitt arkiv</p>
      <article>
        <img
  src={`https://foto.munchmuseet.no${artwork.previews[0].href}`}
  alt={artwork.metadata["5"].value}
  width={artwork.previews[0].width}
  height={artwork.previews[0].height}
  style={{ maxWidth: "100%", height: "auto" }}
/>

        <h2>{artwork.metadata["5"].value}</h2>
        <p>{artwork.metadata["110"].value}, {artwork.metadata["203"].value}</p>
        <p>{artwork.metadata["200"].value}</p>
        <p>{artwork.metadata["3"].value}</p>
      </article>
    </main>
  );
}
