import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SITE_NAME = 'BP Solutions Florida';
const BASE_URL  = 'https://bp-solutions-florida.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;

const DEFAULT_TITLE =
  'BP Solutions Florida | General Contractor & Construction Company in South Florida';
const DEFAULT_DESC =
  'BP Solutions Florida provides design-build, remodeling, permitting, and construction services across South Florida for residential and commercial projects.';

export const SEO = ({
  title       = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical,
  ogImage     = DEFAULT_OG_IMAGE,
  ogType      = 'website',
  noIndex     = false,
}: SEOProps) => {
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      {/* ── Primary ────────────────────────────────────────────── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ─────────────────────────────────────────── */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_US" />

      {/* ── Twitter Card ───────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:url"         content={canonicalUrl} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  );
};
