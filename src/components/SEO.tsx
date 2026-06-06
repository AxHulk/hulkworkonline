import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { buildCanonical, DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/seo";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  jsonLd?: object | object[];
  keywords?: string;
}

const SEO = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd,
  keywords,
}: SEOProps) => {
  const { pathname } = useLocation();
  const url = canonical ?? buildCanonical(pathname);
  const fullTitle = title.length > 60 ? title : title;
  const jsonArr = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const htmlLang = isEn ? "en" : "ru";
  const ogLocale = isEn ? "en_US" : "ru_RU";
  // hreflang alternates: pair each route with its EN counterpart (legal/blog routes have no EN version).
  const ruPath = isEn ? (pathname === "/en" ? "/" : pathname.slice(3)) : pathname;
  const enPath = isEn ? pathname : (pathname === "/" ? "/en" : `/en${pathname}`);
  const ruOnly = /^\/(blog|offer|terms|privacy|unsubscribe)(\/|$)/.test(ruPath);

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />

      {/* hreflang */}
      <link rel="alternate" hrefLang="ru" href={buildCanonical(ruPath)} />
      {!ruOnly && <link rel="alternate" hrefLang="en" href={buildCanonical(enPath)} />}
      <link rel="alternate" hrefLang="x-default" href={buildCanonical(ruPath)} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonArr.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
