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
        
        <header className="site-header">
         <nav className="header-left" aria-label="Hovedmeny">
          {navigation.links?.slice(0, 2).map((link) => (
            <Link key={link.id} href={link.href}>
              {link.label}
            </Link>
          ))}
         </nav>

          <Link className="header-logo" href="/">
            {navigation.siteName}
          </Link>

          <nav className="header-right" aria-label="Om nettsiden">
            {navigation.links?.slice(2).map((link) => (
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
