import React from "react";
import "./styles.css";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";

export const metadata = {
  description: "Utforsk kunstverk og kunstnere fra MUNCH museet.",
  title: "arkivet.",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const payload = await getPayload({config});
  const navigation = await payload.findGlobal({
    slug: "navigation"
  });

  return (
    <html lang="no">
      <body>
        
        <header>
          <Link href="/">{navigation.siteName}</Link>

          <nav aria-label="Hovedmeny">
            {navigation.links?.map((link) => (
              <Link key={link.id} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        {children}

        <footer>
          <p>Et studentprosjekt med kunst fra MUNCHs samlinger</p>
        </footer>

      </body>
    </html>
  );
};
