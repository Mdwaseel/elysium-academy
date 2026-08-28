# Deploying to Netlify

The site builds to a **static export** — plain HTML, CSS and JS in `out/`. There
is no Next.js server, no serverless functions, and nothing that breaks when
Netlify updates its Next.js adapter. It runs on Netlify's free tier.

---

## Option A — Connect a Git repo (recommended)

Every push redeploys automatically, and pull requests get their own preview URL.

1. Push this `web/` folder to GitHub, GitLab or Bitbucket.

   ```bash
   cd web
   git init                 # only if it isn't a repo yet
   git add .
   git commit -m "Elysium Academy site"
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. In Netlify: **Add new site → Import an existing project** and pick the repo.

3. Netlify reads `netlify.toml` and fills these in automatically — confirm they
   match and click **Deploy**:

   | Setting | Value |
   | --- | --- |
   | Base directory | `web` (only if you pushed the whole project, not just `web/`) |
   | Build command | `npm run build` |
   | Publish directory | `out` |
   | Node version | `22` (set in `netlify.toml`) |

That's it. First build takes roughly two minutes.

---

## Option B — Drag and drop (fastest, no Git)

```bash
cd web
npm install
npm run build
```

Then open <https://app.netlify.com/drop> and drag the **`out`** folder onto the
page. The site is live in seconds.

The catch: there's no automatic redeploy. Every change means rebuilding and
dragging `out/` across again. Fine for a first look, worse for real use.

---

## Option C — Netlify CLI

```bash
npm install -g netlify-cli
cd web
netlify login
netlify init          # links or creates the site
netlify deploy --prod # builds and publishes
```

---

## Custom domain

1. Netlify dashboard → **Domain management → Add a domain**.
2. Enter your domain and follow the DNS instructions (either point your
   registrar's nameservers at Netlify, or add the `CNAME`/`A` records it shows).
3. HTTPS is provisioned automatically via Let's Encrypt once DNS resolves —
   usually within an hour.

Then update `url` in `src/config/site.ts` so canonical URLs and Open Graph tags
point at the real domain:

```ts
url: "https://your-real-domain.com",
```

Rebuild and redeploy after changing it.

---

## What's already configured

`netlify.toml` sets up:

- **Build** — `npm run build` publishing `out/`, on Node 22
- **Caching** — immutable one-year cache on fingerprinted `/_next/static/*`
  assets, `must-revalidate` on HTML so deploys appear immediately, 30 days on
  images
- **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`

### Images

A static export has no Next.js image optimizer, so `next/image` is pointed at
**Netlify's Image CDN** through a custom loader
(`src/lib/netlifyImageLoader.ts`). Deployed on Netlify you still get automatic
WebP/AVIF conversion and responsive resizing.

The loader falls back to the raw file when `NODE_ENV !== "production"`, so
`npm run dev` works normally. If you ever move off Netlify, that one file is the
only thing to change.

---

## Local commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at <http://localhost:3000> |
| `npm run build` | Production build → `out/` |
| `npm run preview` | Serve the built `out/` at <http://localhost:3000> |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint over `src` |
| `npm run check` | All three, in order — run before deploying |

---

## Before you go live

- [ ] Set the real domain in `src/config/site.ts`
- [ ] Replace the 12 client-win placeholder tiles with real screenshots
      (`winPlaceholders` in `src/data/assets.ts`)
- [ ] Add video URLs in `src/data/content.ts` — every `videoUrl: ""` is an
      unplayable poster until filled
- [ ] Swap the workspace placeholders in `src/data/assets.ts` (anything marked
      `placeholder: true`) for real photography
- [ ] Wire the application form to a real endpoint — see the `TODO` in
      `src/components/sections/FinalCTA.tsx`; right now it validates and shows a
      success state without sending anything
- [ ] Confirm the earnings disclaimer in `src/config/site.ts` is wording you're
      happy with, and keep it if you run paid traffic
- [ ] Verify claims in `src/data/content.ts` you can't substantiate — the "7+
      agencies" figure and the star-rating strip in particular
