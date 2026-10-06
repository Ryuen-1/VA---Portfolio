import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,'The initial page should have exactly one primary heading.');
for (const text of ['Ian Quimbo','Class Scheduling System','Academic Early Warning System','Queueless','Google Workspace','ian.quimbo2004@gmail.com']) assert.ok(html.includes(text),`Initial HTML must include ${text}.`);
for (const repo of ['Class-Scheduling','AEWS---FINAL','Wbsys']) assert.ok(html.includes(`href="https://github.com/Ryuen-1/${repo}"`),'Project links must be crawlable in the initial HTML.');
const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema['@graph'].find(item=>item['@type']==='Person').name,'Ian Quimbo');
assert.equal(schema['@graph'].filter(item=>item['@type']==='SoftwareSourceCode').length,3);
const robots=await readFile('dist/robots.txt','utf8');
assert.ok(robots.includes('Allow: /'));
assert.equal(html.includes('noindex'),process.env.VERCEL_ENV==='preview');
{
  assert.ok(html.includes('rel="canonical"'));
  const sitemap=await readFile('dist/sitemap.xml','utf8');
  assert.ok(sitemap.includes('<loc>https://'));
  assert.ok(robots.includes('Sitemap: https://'));
}
console.log('SEO checks passed: initial content, heading, repository links, structured data, and crawler access.');
