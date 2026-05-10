import { Helmet } from "react-helmet-async";

const SITE_URL = "https://realgameapps.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface SEOProps {
  title: string;
  description: string;
  /** Path beginning with "/" — appended to SITE_URL for canonical/og:url */
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  keywords?: string;////added keyword prop for seo
  /** Any number of JSON-LD objects to inject as application/ld+json scripts */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd,
  noindex = false,
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {ldArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
export { SITE_URL };
