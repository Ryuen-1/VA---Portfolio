# Ian — Virtual Assistant & Developer Portfolio

A responsive React portfolio designed with Astra. Includes services, a complete toolkit, three featured GitHub projects, project dialogs, a working process accordion, and GSAP scroll motion with reduced-motion support.

The enhanced design uses a cinematic hero, larger editorial typography, service reveal animations, pinned project navigation on desktop, and a responsive inquiry form. The form composes an email or WhatsApp message; visitors send it through their own app. No messages are sent or stored by the site.

## Run locally

```sh
npm install
npm run dev
```

## Personalize before publishing

- Update `profile` at the top of `src/App.jsx` with your name, email, GitHub, and LinkedIn. Keep the person details in `scripts/build-seo.mjs` aligned when editing them.
- The featured projects are Class Scheduling System, Academic Early Warning System, and Queueless. Each links to its GitHub repository. Card artwork is labeled as an illustration rather than an application screenshot.
- Update the title and description in `index.html` if you change the name.
- Fonts load from Google Fonts; system fonts are used if unavailable.

## Deploy on Vercel

Import this folder as a GitHub repository in Vercel. Select the Vite framework preset. Build command: `npm run build`. Output directory: `dist`. The included `vercel.json` supplies these settings. No backend services are required.

## Search engine optimization

Production builds render the full React page into static HTML and hydrate it in the browser. Crawlers can read the introduction, services, projects, and contact links without JavaScript. The build adds Person, ProfilePage, and SoftwareSourceCode JSON-LD, descriptive metadata, social sharing tags, and robots.txt.

The canonical domain is `https://quimbovaportfolio.vercel.app`. Set `SITE_URL` in Vercel if you switch to a custom HTTPS domain. Builds generate the canonical link, absolute sharing image, and sitemap.xml using this domain. Vercel preview deployments receive a noindex directive.

Run `node scripts/check-seo.mjs` after building to verify initial content and metadata. After deployment, submit `/sitemap.xml` in Google Search Console and inspect the public URL. Indexing and search position depend on the deployed site and search engines; local configuration cannot confirm them.

```sh
npm run build
npm run preview
```

Project artwork illustrates scheduling, machine learning, and queue workflows. The portfolio has no fabricated client outcomes or testimonials.

