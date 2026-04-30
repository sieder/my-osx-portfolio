# Sieder Portfolio — Amber CRT

A personal portfolio styled as a 16-bit amber CRT terminal.
Live at **https://sieder.dev**.

```
┌──────────────────────────────┐
│        SIEDER.SYS            │
│      ── MAIN MENU ──         │
│                              │
│        > ABOUT               │
│          PROJECTS            │
│          RESUME              │
│          CONTACT             │
│          SNAKE               │
│          POWER OFF           │
└──────────────────────────────┘
```

## Stack

- React 19 + TypeScript (Create React App)
- Tailwind CSS for styling, custom CSS for CRT effects (scanlines, glow, vignette, flicker)
- `useReducer` state machine for screen routing — no react-router
- Web Audio API for menu beeps
- Press Start 2P + VT323 fonts via Google Fonts
- Hosted on Vercel

## Run locally

```bash
yarn install
PORT=3000 yarn start
```

Open http://localhost:3000.

> The shell may have `PORT=4200` exported (used by other projects). Pass `PORT=3000` explicitly if `yarn start` reports the wrong port.

## Build

```bash
yarn build
```

## Test / typecheck

```bash
yarn test
npx tsc --noEmit
```

## Project layout

```
src/
├── App.tsx               # Top-level wiring: state, keyboard, screen router
├── components/
│   ├── CRTShell.tsx      # Chassis frame + scanlines + glow + vignette + curve
│   ├── ChannelTransition.tsx
│   ├── MobileDPad.tsx    # Touch controls (auto-shown on mobile)
│   └── ErrorBoundary.tsx
├── screens/
│   ├── BootScreen.tsx
│   ├── MainMenu.tsx
│   ├── AboutScreen.tsx        # RPG stat sheet
│   ├── ProjectsScreen.tsx     # Scroll list
│   ├── ProjectDetailScreen.tsx
│   ├── ResumeScreen.tsx       # Text mode + PDF mode
│   ├── ContactScreen.tsx
│   ├── SnakeScreen.tsx        # Mini-game with high score
│   └── PowerOffScreen.tsx
├── state/
│   ├── reducer.ts        # All transitions + nav logic
│   └── types.ts
├── hooks/
│   ├── useAudio.ts       # square-wave beeps
│   └── useKeyboard.ts
└── data/                 # ★ Edit these to update content
    ├── about.ts
    ├── skills.ts
    ├── projects.ts
    └── contact.ts
```

## Editing content

Everything that shows up on screen lives in `src/data/`:

- `about.ts` — name, class (role), location, bio
- `skills.ts` — skill name + level (0–100), drives the bar chart
- `projects.ts` — project list. Each entry: `id`, `category` (`WORK` / `PERSONAL`), `title`, `tech[]`, optional `url`, `description`
- `contact.ts` — email, GitHub, LinkedIn — `label` + `value` + `href`

Resume PDF → `public/resume.pdf` (replace the file to update).

Favicon → `public/favicon.svg` (amber CRT, edit colors / glyph there).

## Controls

Desktop:

| Key | Action |
|---|---|
| ↑ ↓ / W S | Navigate |
| Enter / Space | Select |
| Esc / Backspace | Back |
| V (Resume only) | Toggle text ↔ PDF view |
| D (Resume only) | Download PDF |
| ↑↓←→ (Snake only) | Move snake |

Mobile: on-screen D-pad + A (select) and B (back) buttons appear automatically.

## Deployment

The project is linked to the `sieders-projects/sieder-portfolio` Vercel project, which serves the **sieder.dev** apex domain.

### Deploy to production

```bash
vercel --prod
```

Run from the repo root. This is the canonical command for shipping changes to sieder.dev.

### Preview deploy

```bash
vercel
```

Returns a unique preview URL. Doesn't touch production.

### Auto-deploy on push (optional)

Not currently wired up. To enable:

1. Vercel dashboard → `sieder-portfolio` → Settings → Git
2. Connect to GitHub repo `sieder/my-osx-portfolio`
3. Set production branch to `master`

After that, every push to `master` auto-deploys to sieder.dev.

### Useful commands

```bash
vercel ls                              # recent deployments
vercel inspect <deployment-url>        # deployment details
vercel logs <deployment-url>           # build / runtime logs
vercel logs <deployment-url> --follow  # tail logs live
vercel project ls                      # all projects in scope
```

### Re-link to a different Vercel project

If `.vercel/` ever points at the wrong project:

```bash
rm -rf .vercel
vercel link --project sieder-portfolio --yes
```

## License

Personal project. Code is reference-only — feel free to take ideas, please don't copy the content (resume / project list / etc.) verbatim.
