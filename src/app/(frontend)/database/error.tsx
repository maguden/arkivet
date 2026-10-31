"use client"; 

import Link from "next/link";

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function DatabaseError({ reset }: Props) {
    return (
        <main className="database-error">
            <h1>Kunne ikke hente</h1>
            <p>Det oppstod en feil</p>
            <button type="button" onClick={() => reset()}>Prøv igjen</button>

            <Link href="/database">Til databasen</Link>
        </main>
    );
}