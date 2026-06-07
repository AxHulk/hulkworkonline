export const SITE_URL = "https://hulkwork.online";
export const SITE_NAME = "HulkWork Studio";
export const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/41ledUTcSsRlUbEtjTOSWkObH7Z2/social-images/social-1776072740023-main_cta.webp";

export const buildCanonical = (pathname: string) => {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  // Drop trailing slash except for root
  const normalized = clean.length > 1 && clean.endsWith("/") ? clean.slice(0, -1) : clean;
  return `${SITE_URL}${normalized}`;
};

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "ИП Фурса Наталия Николаевна",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "hello@axhulk.ru",
  telephone: "+7-978-540-09-81",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Кечкеметская, д. 94-А",
    addressLocality: "Симферополь",
    postalCode: "295050",
    addressCountry: "RU",
  },
  sameAs: [],
};

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: DEFAULT_OG_IMAGE,
  url: SITE_URL,
  telephone: "+7-978-540-09-81",
  email: "hello@axhulk.ru",
  priceRange: "₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Кечкеметская, д. 94-А",
    addressLocality: "Симферополь",
    postalCode: "295050",
    addressCountry: "RU",
  },
  description:
    "HulkWork Studio — создание сайтов, SEO-продвижение, SMM и работа с поведенческими факторами. Симферополь, работаем по всей России.",
  areaServed: "RU",
};

export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ru-RU",
};

// English variants for the EN locale. Address stays the same (it's factual),
// only natural-language description and inLanguage differ.
export const ORGANIZATION_JSONLD_EN = {
  ...ORGANIZATION_JSONLD,
  legalName: "IE Fursa Nataliia Nikolaevna",
};

export const LOCAL_BUSINESS_JSONLD_EN = {
  ...LOCAL_BUSINESS_JSONLD,
  description:
    "HulkWork Studio — web development, SEO promotion, SMM and behavioral-factors services. Based in Simferopol, working across Russia and internationally.",
};

export const WEBSITE_JSONLD_EN = {
  ...WEBSITE_JSONLD,
  inLanguage: "en-US",
};

export const getOrganizationJsonLd = (lang: "ru" | "en") =>
  lang === "en" ? ORGANIZATION_JSONLD_EN : ORGANIZATION_JSONLD;
export const getLocalBusinessJsonLd = (lang: "ru" | "en") =>
  lang === "en" ? LOCAL_BUSINESS_JSONLD_EN : LOCAL_BUSINESS_JSONLD;
export const getWebsiteJsonLd = (lang: "ru" | "en") =>
  lang === "en" ? WEBSITE_JSONLD_EN : WEBSITE_JSONLD;

export type BreadcrumbCrumb = { name: string; url: string };

export const buildBreadcrumbJsonLd = (crumbs: BreadcrumbCrumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: c.url.startsWith("http") ? c.url : `${SITE_URL}${c.url}`,
  })),
});
