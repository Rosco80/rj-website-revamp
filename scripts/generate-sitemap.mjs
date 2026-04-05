/**
 * generate-sitemap.mjs
 * Runs at build time (before vite build) to produce a complete public/sitemap.xml
 * that includes all static pages + every published Sanity blog post.
 */
import { createClient } from '@sanity/client';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://rjwoodtrading.com';

const client = createClient({
    projectId: '2alzdb48',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
});

const staticPages = [
    { url: '/',          changefreq: 'monthly', priority: '1.0' },
    { url: '/about',     changefreq: 'monthly', priority: '0.8' },
    { url: '/products',  changefreq: 'monthly', priority: '0.9' },
    { url: '/products/balau', changefreq: 'monthly', priority: '0.9' },
    { url: '/products/merbau', changefreq: 'monthly', priority: '0.9' },
    { url: '/products/teak', changefreq: 'monthly', priority: '0.9' },
    { url: '/export/europe', changefreq: 'monthly', priority: '0.9' },
    { url: '/export/middle-east', changefreq: 'monthly', priority: '0.9' },
    { url: '/vitrex',    changefreq: 'monthly', priority: '0.7' },
    { url: '/agarwood',  changefreq: 'monthly', priority: '0.7' },
    { url: '/blog',      changefreq: 'weekly',  priority: '0.8' },
    { url: '/quote',     changefreq: 'yearly',  priority: '0.6' },
];

function urlEntry({ url, changefreq, priority, lastmod }) {
    return [
        '  <url>',
        `    <loc>${BASE_URL}${url}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
    ].filter(Boolean).join('\n');
}

async function generate() {
    let posts = [];
    try {
        posts = await client.fetch(
            `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt } | order(publishedAt desc)`
        );
        console.log(`📝  Found ${posts.length} blog post(s) in Sanity`);
    } catch (err) {
        console.warn(`⚠️  Could not fetch posts from Sanity (${err.message}) — sitemap will contain static pages only`);
    }

    const entries = [
        ...staticPages.map(urlEntry),
        ...posts.map(({ slug, publishedAt }) => urlEntry({
            url: `/blog/${slug}`,
            lastmod: publishedAt ? publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
            changefreq: 'never',
            priority: '0.7',
        })),
    ].join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

    const outPath = join(__dirname, '../public/sitemap.xml');
    writeFileSync(outPath, xml, 'utf8');
    console.log(`✅  Sitemap written: ${staticPages.length} static + ${posts.length} blog post(s)`);
}

generate();
