# Metateic website

The Metateic company site, built with Next.js as a static export and deployed to GitHub Pages.

## Local development

Components come from the shared `@metateic/ui` package, installed from `../metateic-ui`, so clone that repo beside this one first.

```bash
nvm use        # Node version from .nvmrc
npm install
npm run dev    # http://localhost:3000
```

`npm run build` writes the static site to `out/`.

## Content

All copy (navigation, sections, contact form labels) lives in `content/strings.yml` and is loaded at build time by `lib/strings.ts`. Images are in `public/images/`.

## Contact form

The contact form sends through [EmailJS](https://www.emailjs.com). The template should accept `firstName`, `lastName`, `email`, `phone`, `message` and `mailingList`. For local testing, put the keys in `.env.local`:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

## Deployment

`.github/workflows/deploy.yml` builds every pull request and deploys `main` to GitHub Pages. In repo **Settings → Pages**, the source must be **GitHub Actions** and the custom domain set there.

Repository secrets:

| Secret | Purpose |
|---|---|
| `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` | Contact form |
| `METATEIC_UI_TOKEN` | Read access to `metateic/metateic-ui`. Only needed if that repo is private. |

CI checks out `metateic-ui` beside the app at the tag in the workflow's `ref:`. To pick up a new UI release, bump that tag.

## License

All rights reserved.
