# Ian — Virtual Assistant & Developer Portfolio

A responsive React portfolio designed with Astra. Includes services, a complete toolkit, three featured GitHub projects, project dialogs, a working process accordion, and GSAP scroll motion with reduced-motion support.

The enhanced design uses a cinematic hero, larger editorial typography, service reveal animations, pinned project navigation on desktop, and a responsive inquiry form. The form composes an email or WhatsApp message; visitors send it through their own app. No messages are sent or stored by the site.

## Run locally

```sh
npm install
npm run dev
```

## Personalize before publishing

- Update `profile` at the top of `src/main.jsx` with your name, email, GitHub, and LinkedIn. An email activates the contact link. Until then the contact dialog links to the supplied GitHub profile and offers a message template.
- The featured projects are Class Scheduling System, Academic Early Warning System, and Queueless. Each links to its GitHub repository. Card artwork is labeled as an illustration rather than an application screenshot.
- Update the title and description in `index.html` if you change the name.
- Fonts load from Google Fonts; system fonts are used if unavailable.

## Deploy on Vercel

Import this folder as a GitHub repository in Vercel. Select the Vite framework preset. Build command: `npm run build`. Output directory: `dist`. The included `vercel.json` supplies these settings. No environment variables or backend services are required.

```sh
npm run build
npm run preview
```

Project artwork illustrates scheduling, machine learning, and queue workflows. The portfolio has no fabricated client outcomes or testimonials.

