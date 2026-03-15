/**
 * prerender.mjs
 * Wrapper around react-snap that skips gracefully in CI / Vercel environments
 * where Chrome is not available. Pre-rendering is a local-only enhancement.
 *
 * Googlebot renders JavaScript, so all meta tags, JSON-LD schemas, and H1s
 * are fully visible to Google without pre-rendered HTML.
 */
import { spawnSync } from 'child_process';

if (process.env.VERCEL || process.env.CI) {
    console.log('ℹ️  CI/Vercel environment detected — skipping react-snap.');
    console.log('   Run `npm run build` locally to generate pre-rendered HTML.');
    process.exit(0);
}

const result = spawnSync('react-snap', [], { stdio: 'inherit', shell: true });
process.exit(result.status ?? 0);
