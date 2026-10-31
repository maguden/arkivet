import Link from "next/link";

export default function ArtworkNotFound() {
    return (
      <main className="database-error">
            <h1>Fant ikke kunstverket</h1>
            <p>Verket finnes ikke, eller adressen er feil</p>

            <Link href="/database">Til databasen</Link>
        </main>
    );
}