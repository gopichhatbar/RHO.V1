/* eslint-disable react-refresh/only-export-components */
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://realgameapps.com";
const SITE_NAME = "Realgameapps";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const TWITTER_HANDLE = "@realgameapps";

export interface SEOProps {
  title: string;
  description: string;

  /** Route path starting with "/" */
  path?: string;

  /** Social preview image */
  image?: string;

  /** SEO page type */
  type?: "website" | "article" | "product";

  /** SEO keywords */
  keywords?: string;

  /** Prevent indexing */
  noindex?: boolean;

  /** Extra robots values */
  robots?: string;

  /** Optional author */
  author?: string;

  /** JSON-LD structured data */
  jsonLd?:
    | Record<string, unknown>
    | Record<string, unknown>[];
}

const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  keywords,
  noindex = false,
  robots,
  author = SITE_NAME,
  jsonLd,
}: SEOProps) => {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  const url = `${SITE_URL}${normalizedPath}`;

  const robotsContent = noindex
    ? "noindex, nofollow"
    : robots || "index, follow";

  const structuredData = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      {/* =========================
          Primary SEO
      ========================== */}

      <html lang="en" />

      <title>{title}</title>

      <meta charSet="utf-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge"
      />

      <meta
        name="description"
        content={description}
      />

      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      <meta
        name="author"
        content={author}
      />

      <meta
        name="robots"
        content={robotsContent}
      />

      <meta
        name="googlebot"
        content={robotsContent}
      />

      <meta
        name="language"
        content="English"
      />

      <meta
        name="theme-color"
        content="#000000"
      />

      <meta
        name="format-detection"
        content="telephone=no"
      />

      {/* =========================
          Canonical
      ========================== */}

      <link
        rel="canonical"
        href={url}
      />

      {/* =========================
          Favicons
      ========================== */}

      <link
        rel="icon"
        href="/favicon.ico"
      />

      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
      />

      <link
        rel="manifest"
        href="/site.webmanifest"
      />

      {/* =========================
          Open Graph
      ========================== */}

      <meta
        property="og:locale"
        content="en_US"
      />

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:site_name"
        content={SITE_NAME}
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:image:alt"
        content={title}
      />

      {/* =========================
          Twitter SEO
      ========================== */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:site"
        content={TWITTER_HANDLE}
      />

      <meta
        name="twitter:creator"
        content={TWITTER_HANDLE}
      />

      <meta
        name="twitter:url"
        content={url}
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />

      {/* =========================
          Structured Data
      ========================== */}

      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
        >
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

/* =========================
   Default Website Schema
========================= */

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/* =========================
   Organization Schema
========================= */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    "https://facebook.com/realgameapps",
    "https://twitter.com/realgameapps",
    "https://instagram.com/realgameapps",
  ],
};

export {
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
};