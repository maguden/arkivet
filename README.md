# arkivet. 

Arkivet er et studentprosjekt laget av Magnus Gude. 
Dette er en side for kunstinteresserte, studenter, og for deg som ønsker oppdage Munchs kunst.

Prosjektet bruker Next.js, TypeScript og Payload CMS. 
Kunstverkene hentes fra MUNCHs FotoWeb-API:
https://github.com/Munchmuseet/FotoWeb-API


## Hvordan starte prosjektet

Du trenger Node.js 24.22.1 eller nyere, og Docker Desktop.

1. Kjør `npm install`.
2. Kopier `.env.example` til `.env`.
3. Fyll inn hemmelighet, databasebruker, passord og databasenavn.
   behold DATABASE_URL som den er.
4. Start databasen med `docker compose up -d`.

Ved første oppstart av ny database, kjør:

```bash
NODE_ENV=production SKIP_MIGRATIONS=true npm run migrate
NODE_ENV=production SKIP_MIGRATIONS=true npx tsx scripts/seed.ts
```
Dette lager tabellene og legger til startinnholdet.

Start siden med:

```bash
npm run dev
```

Åpne http://localhost:3000

Stopp siden med Ctrl + C og databasen med `docker compose down`. Ikke bruk `-v`, da dette sletter databasevolumet.


## Teste bygg

La databasen kjøre og stopp utviklingsserveren. Kjør:

```bash
SKIP_MIGRATIONS=true npm run build
```


## Begrensninger
- Siden trenger internett for å hente data.
- Antall verk per side bestemmes av API-et.
- Når ingen kategori er valgt, vises kategoriene etter hverandre.
- Noen verk mangler opplysninger om fotograf eller lisens, dette stammer fra mangler i  API-et.

Forsidebilder ligger i prosjektet. Tekst og navigasjon kan redigeres i Payload. en adminbruker kan opprettes på http://localhost:3000/admin

Nettstedet er ikke et offisielt nettsted fra MUNCH.


## Utgangspunkt
Prosjektet er basert på vegarcodes Payload-starter, versjon 1.1.0:
https://github.com/vegarcodes/payload-cms-docker-starter







 
