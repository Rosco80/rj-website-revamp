import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://rjwoodtrading.com'
const SITE_NAME = 'R&J Wood Trading'
const DEFAULT_IMAGE = '/hero-home.jpg'

// Accepts either a single `schema` object or a `schemas` array.
// Multiple schemas = multiple <script type="application/ld+json"> blocks per page.
export default function SEO({ title, description, canonical, image, schema, schemas }) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Sustainable Timber Supplier Malaysia`
    const metaImage = image || DEFAULT_IMAGE
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : null

    // Normalise: always work with an array
    const customSchemas = schemas
        ? schemas
        : schema
            ? [schema]
            : []

    // Base Architecture for AEO: Every page has a Breadcrumb List (unless it's homepage)
    const urlPath = canonical ? canonical.split('/').filter(Boolean) : [];
    const breadcrumbSchema = urlPath.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
            },
            ...urlPath.map((pathChunk, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": pathChunk.charAt(0).toUpperCase() + pathChunk.slice(1),
                "item": `${SITE_URL}/${urlPath.slice(0, index + 1).join('/')}`
            }))
        ]
    } : null;

    const finalSchemas = [...customSchemas];
    if (breadcrumbSchema) {
        finalSchemas.push(breadcrumbSchema);
    }

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* GEO Targeting: Global Fallback since we don't use localized subdirectories */}
            {canonicalUrl && <link rel="alternate" hreflang="en" href={canonicalUrl} />}
            {canonicalUrl && <link rel="alternate" hreflang="x-default" href={canonicalUrl} />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImage} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={metaImage} />

            {/* JSON-LD Structured Data — one block per schema */}
            {finalSchemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    )
}
