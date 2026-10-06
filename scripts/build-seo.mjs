import { build } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

await build();
await build({ build: { ssr: 'src/entry-server.jsx', outDir: '.seo-render', emptyOutDir: true } });
const { render } = await import(pathToFileURL(path.resolve('.seo-render/entry-server.js')).href);
let html = await readFile('dist/index.html', 'utf8');
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
const rawUrl = process.env.SITE_URL || 'https://quimbovaportfolio.vercel.app';
let base;
if (rawUrl) {
  const url = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
  if (url.protocol !== 'https:') throw new Error('SITE_URL must use HTTPS.');
  base = url.origin;
}
const person = {
  '@type': 'Person', '@id': base ? `${base}/#ian` : '#ian', name: 'Ian Quimbo',
  jobTitle: 'Virtual Assistant and Web Developer',
  description: 'Virtual assistant and developer specializing in audio annotation, data entry, calendar scheduling, file organization, basic research, Google Workspace, full-stack development, SaaS applications, and MVP prototypes.',
  email: 'mailto:ian.quimbo2004@gmail.com', telephone: '+639161453803',
  sameAs: ['https://github.com/Ryuen-1', 'https://www.facebook.com/Seishourou'],
  knowsAbout: ['Audio Annotation', 'Data Entry', 'Calendar Scheduling', 'File Organization', 'Basic Research', 'Google Workspace', 'React', 'Next.js', 'Node.js', 'Python', 'XGBoost', 'MERN Stack', 'SaaS Development', 'MVP Development'],
  ...(base ? { url: `${base}/`, image: `${base}/ian-quimbo.webp` } : {}),
};
const graph = {
  '@context': 'https://schema.org', '@graph': [person,
    { '@type': 'ProfilePage', '@id': base ? `${base}/#profile` : '#profile', name: 'Ian Quimbo — Virtual Assistant & Web Developer', mainEntity: { '@id': person['@id'] }, ...(base ? { url: `${base}/` } : {}) },
    ...[
      ['Class Scheduling System','https://github.com/Ryuen-1/Class-Scheduling','A MERN stack class scheduling web application.'],
      ['Academic Early Warning System','https://github.com/Ryuen-1/AEWS---FINAL','An academic early warning project using Python and XGBoost.'],
      ['Queueless','https://github.com/Ryuen-1/Wbsys','A PHP-based SaaS project focused on queue management.'],
    ].map(([name,url,description]) => ({ '@type': 'SoftwareSourceCode', name, description, codeRepository: url, author: { '@id': person['@id'] } })),
  ],
};
const escaped = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;');
const tags = [
  `<meta name="robots" content="${process.env.VERCEL_ENV === 'preview' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}"/>`,
  '<meta name="author" content="Ian Quimbo"/>',
  '<meta property="og:locale" content="en_US"/>',
  '<meta property="og:site_name" content="Ian Quimbo Portfolio"/>',
  `<script type="application/ld+json">${JSON.stringify(graph).replaceAll('<','\\u003c')}</script>`,
];
if (base) {
  tags.push(`<link rel="canonical" href="${escaped(base)}/"/>`, `<meta property="og:url" content="${escaped(base)}/"/>`, `<meta property="og:image" content="${escaped(base)}/ian-quimbo.webp"/>`, '<meta property="og:image:alt" content="Ian Quimbo, virtual assistant and web developer"/>', `<meta name="twitter:image" content="${escaped(base)}/ian-quimbo.webp"/>`);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escaped(base)}/</loc></url></urlset>\n`);
}
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${base ? `Sitemap: ${base}/sitemap.xml\n` : ''}`);
html = html.replace('</head>', `${tags.join('\n')}</head>`);
await writeFile('dist/index.html',html);
console.log(`SEO: rendered page content, structured data and robots.txt.${base ? ' Canonical URL and sitemap: '+base : ' Set SITE_URL or deploy on Vercel to generate the canonical URL and sitemap.'}`);
