# Sieder Villareal — Portfolio

Personal portfolio: a minimal single page with work, personal projects, skills, resume, and contact links. Light and dark mode follow the system setting.

## Stack

- React 19 + TypeScript
- Vite (build), Vitest + Testing Library (tests)
- Plain CSS with custom properties (`src/styles.css`)
- Hosted on Vercel (project `sieders-projects/sieder-portfolio`)

## Run locally

```bash
yarn install
yarn dev        # http://localhost:5173
```

## Build / test

```bash
yarn build      # typecheck + production build into dist/
yarn test
yarn preview    # serve dist/ locally
```

> The build script forces `NODE_ENV=production` because some shells export a different `NODE_ENV`, which would make Vite bundle React's dev build.

## Editing content

All content lives in `src/data/`:

- `about.ts` — name, role, location, bio
- `projects.ts` — `id`, `category` (`WORK` / `PERSONAL`), `title`, `tech[]`, optional `url`, `description`
- `skills.ts` — list of skill names
- `contact.ts` — `label`, `value`, `href`

Resume PDF → `public/resume.pdf`. Favicon → `public/favicon.svg`.

## Deployment

The repo is linked to the Vercel project `sieder-portfolio` (`.vercel/`, git-ignored). Build settings are in `vercel.json`.

```bash
vercel          # preview deploy
vercel --prod   # production deploy
```

### Domain

`sieder.dev` expired and was released by the registry (Nov 2026). To bring it back, register it again, e.g. `vercel domains buy sieder.dev`. Vercel then points it at this project automatically. If you buy it elsewhere, add an `A sieder.dev 76.76.21.21` record, or switch the nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.

## License

Personal project. Code is reference-only. Please don't copy the content (resume, project list, etc.) verbatim.
