# D.Town Records

Official website for D.Town Records, a South African independent record label focused on artist empowerment, live bookings and collaborative studio work.

## What is included

- Responsive label homepage and roster
- Individual artist profile routes
- Artist performance enquiry workflow
- Dedicated studio page and session request workflow
- Cloudflare D1-backed enquiry storage
- Privacy and booking-terms pages
- Accessible keyboard navigation and reduced-motion support
- Optimised WebP photography

## Technology

- React 19 and Next-compatible App Router
- Vinext/Vite for Cloudflare Workers
- Drizzle ORM with Cloudflare D1
- TypeScript and Tailwind CSS

## Requirements

- Node.js 22.13 or newer
- npm
- Git

## Local development

```powershell
git clone https://github.com/KgomotsoNxumalo03/dtown-records.git
cd dtown-records
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Production build

```powershell
npm run build
```

The production Worker output is created under `dist/`.

## Database

The site uses the `DB` Cloudflare D1 binding declared in `.openai/hosting.json`. The schema lives in `db/schema.ts`; SQL migrations live in `drizzle/`.

Generate a migration after changing the schema:

```powershell
npm run db:generate
```

Do not commit local `.wrangler`, `.vinext`, `.sites-runtime` or environment-secret files.

## Main routes

- `/` — label homepage, roster and artist-booking form
- `/artists/[slug]` — artist profiles
- `/studio` — studio information and session request form
- `/privacy` — privacy notice
- `/terms` — booking terms

## Publishing

The hosted site is deployed through OpenAI Sites to Cloudflare Workers. Source pushed to GitHub does not automatically publish the hosted Site.

## Content ownership

Photography, artist identities, branding and written content belong to D.Town Records and their respective rights holders. No reuse is granted without permission.
