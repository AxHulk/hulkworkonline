/**
 * Build-time static HTML pre-renderer (lightweight, no Puppeteer).
 *
 * For each known route we generate a per-route `index.html` inside `dist/`
 * with route-specific <title>, <meta>, canonical, Open Graph and JSON-LD tags
 * injected into <head>. This solves the SPA SEO problem for crawlers that do
 * NOT execute JavaScript (most social-network parsers and some indexers),
 * while crawlers that DO execute JS will still get the same tags via
 * react-helmet-async after hydration.
 *
 * Strategy:
 *  - We mirror the per-page metadata defined in src/pages and src/lib/seo.ts.
 *  - We do NOT render React server-side — we only patch <head>. The <body>
 *    keeps the original SPA bundle, so the app continues to hydrate normally.
 *  - Output: dist/<route>/index.html for every route, plus dist/index.html
 *    for the root.
 */
import type { Plugin, ResolvedConfig } from "vite";
import { promises as fs } from "node:fs";
import path from "node:path";

const SITE_URL = "https://hulkwork.online";
const SITE_NAME = "HulkWork Studio";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/41ledUTcSsRlUbEtjTOSWkObH7Z2/social-images/social-1776072740023-main_cta.webp";

interface RouteMeta {
  path: string; // e.g. "/services/seo"
  title: string;
  description: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  jsonLd?: object[];
  ogImage?: string;
}

const ORG_JSONLD = {
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
};

const LOCAL_BUSINESS_JSONLD = {
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
  areaServed: "RU",
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ru-RU",
};

const breadcrumb = (crumbs: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.url}`,
  })),
});

const service = (
  serviceType: string,
  url: string,
  description: string,
): object => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType,
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  areaServed: "RU",
  url: `${SITE_URL}${url}`,
  description,
});

const STATIC_ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "HulkWork Studio — создание сайтов, SEO, SMM в Симферополе",
    description:
      "Студия HulkWork: разработка сайтов под ключ, SEO-продвижение в Яндекс и Google, SMM и поведенческие факторы. Команда лучших фрилансеров для вашего бизнеса.",
    jsonLd: [ORG_JSONLD, LOCAL_BUSINESS_JSONLD, WEBSITE_JSONLD],
  },
  {
    path: "/services/web-development",
    title: "Создание сайтов под ключ — HulkWork Studio",
    description:
      "Разработка сайтов любой сложности: лендинги, корпоративные сайты, интернет-магазины, SaaS-платформы. Современный стек, скорость, конверсия и SEO с первого дня.",
    jsonLd: [
      service(
        "Создание сайтов под ключ",
        "/services/web-development",
        "Разработка сайтов любой сложности: лендинги, корпоративные сайты, интернет-магазины, SaaS-платформы.",
      ),
      breadcrumb([
        { name: "Услуги", url: "/" },
        { name: "Создание сайтов", url: "/services/web-development" },
      ]),
    ],
  },
  {
    path: "/services/seo",
    title: "SEO-продвижение сайтов в Яндекс и Google — HulkWork",
    description:
      "Комплексное SEO: технический аудит, семантика, on-page оптимизация, ссылочное и контент. Прозрачные отчёты, рост трафика и позиций в Яндексе и Google.",
    jsonLd: [
      service(
        "SEO-продвижение сайтов",
        "/services/seo",
        "Комплексное SEO-продвижение в Яндекс и Google: технический аудит, семантика, on-page оптимизация, ссылочное.",
      ),
      breadcrumb([
        { name: "Услуги", url: "/" },
        { name: "SEO аналитика", url: "/services/seo" },
      ]),
    ],
  },
  {
    path: "/services/smm",
    title: "SMM-продвижение в соцсетях — HulkWork Studio",
    description:
      "SMM-продвижение в VK, Telegram, Дзен: контент-стратегия, дизайн, ведение, таргетированная реклама. Рост вовлечённости и продаж через социальные сети.",
    jsonLd: [
      service(
        "SMM продвижение в социальных сетях",
        "/services/smm",
        "SMM-продвижение в VK, Telegram, Дзен: контент-стратегия, дизайн, ведение, таргетированная реклама.",
      ),
      breadcrumb([
        { name: "Услуги", url: "/" },
        { name: "SMM продвижение", url: "/services/smm" },
      ]),
    ],
  },
  {
    path: "/services/behavioral-factors",
    title: "Поведенческие факторы — накрутка ПФ для Яндекса",
    description:
      "Безопасная работа с поведенческими факторами в Яндексе: эмуляция реальных пользователей, рост позиций, контроль метрик. Прозрачные отчёты в Яндекс.Метрике.",
    jsonLd: [
      service(
        "Работа с поведенческими факторами",
        "/services/behavioral-factors",
        "Безопасная работа с поведенческими факторами в Яндексе: эмуляция реальных пользователей.",
      ),
      breadcrumb([
        { name: "Услуги", url: "/" },
        { name: "Поведенческие факторы", url: "/services/behavioral-factors" },
      ]),
    ],
  },
  {
    path: "/portfolio",
    title: "Портфолио HulkWork Studio — наши работы",
    description:
      "Кейсы и реализованные проекты HulkWork Studio: сайты, интернет-магазины, лендинги, SMM-проекты и платёжные системы. Ссылки на работающие домены.",
    jsonLd: [breadcrumb([{ name: "Портфолио", url: "/portfolio" }])],
  },
  {
    path: "/about",
    title: "О студии HulkWork — команда и подход к работе",
    description:
      "HulkWork Studio: миссия, бизнес-модель, команда специалистов и наш подход к созданию сайтов и продвижению. Работаем с фрилансерами уровня senior.",
    jsonLd: [breadcrumb([{ name: "О нас", url: "/about" }])],
  },
  {
    path: "/blog",
    title: "Блог HulkWork — статьи о digital, SEO, SMM и веб-разработке",
    description:
      "Экспертные статьи о создании сайтов, SEO-продвижении, SMM, поведенческих факторах и платной рекламе. 50+ материалов от практикующих специалистов.",
    jsonLd: [breadcrumb([{ name: "Блог", url: "/blog" }])],
  },
  {
    path: "/contacts",
    title: "Контакты HulkWork Studio — связаться с нами",
    description:
      "Свяжитесь с HulkWork Studio: телефон, email, мессенджеры, форма обратной связи. Адрес: г. Симферополь, ул. Кечкеметская, 94-А. Отвечаем в течение часа.",
    jsonLd: [breadcrumb([{ name: "Контакты", url: "/contacts" }])],
  },
  {
    path: "/offer",
    title: "Публичная оферта — HulkWork Studio",
    description:
      "Публичная оферта на оказание информационно-технических и цифровых услуг HulkWork Studio (ИП Фурса Н. Н.).",
    noindex: true,
  },
  {
    path: "/terms",
    title: "Оплата, возврат и условия услуг — HulkWork Studio",
    description: "Условия оплаты, безопасность платежей и политика возврата HulkWork Studio.",
    noindex: true,
  },
  {
    path: "/privacy",
    title: "Политика конфиденциальности — HulkWork Studio",
    description:
      "Политика обработки и защиты персональных данных пользователей сайта HulkWork Studio (ИП Фурса Н. Н.).",
    noindex: true,
  },
];

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildHeadInjection = (route: RouteMeta): string => {
  const url = `${SITE_URL}${route.path === "/" ? "" : route.path}`;
  const ogImage = route.ogImage ?? DEFAULT_OG_IMAGE;
  const ogType = route.ogType ?? "website";
  const lines: string[] = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
  ];
  if (route.noindex) lines.push(`<meta name="robots" content="noindex, nofollow" />`);
  lines.push(
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="ru_RU" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  );
  if (route.jsonLd?.length) {
    for (const data of route.jsonLd) {
      lines.push(
        `<script type="application/ld+json">${JSON.stringify(data).replace(
          /</g,
          "\\u003c",
        )}</script>`,
      );
    }
  }
  return lines.map((l) => `    ${l}`).join("\n");
};

/**
 * Patches the <head> of the source HTML:
 *  - Removes any existing <title>, default <meta name="description">,
 *    Open Graph, Twitter, canonical and JSON-LD tags so we can inject
 *    route-specific ones without duplicates.
 *  - Inserts our route-specific block right before </head>.
 */
const patchHtml = (html: string, route: RouteMeta): string => {
  let out = html;
  // Strip default tags that we will re-emit per route.
  const stripPatterns: RegExp[] = [
    /<title>[\s\S]*?<\/title>/gi,
    /<meta\s+name=["']description["'][^>]*>\s*/gi,
    /<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi,
    /<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi,
    /<link\s+rel=["']canonical["'][^>]*>\s*/gi,
    /<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>\s*/gi,
    /<meta\s+name=["']robots["'][^>]*>\s*/gi,
  ];
  for (const re of stripPatterns) out = out.replace(re, "");
  const injection = buildHeadInjection(route);
  out = out.replace(/<\/head>/i, `${injection}\n  </head>`);
  return out;
};

const loadBlogRoutes = async (): Promise<RouteMeta[]> => {
  const src = await fs.readFile(
    path.resolve(process.cwd(), "src/data/blogArticles.ts"),
    "utf8",
  );
  // Extract id, title, excerpt, category for every article.
  const records: RouteMeta[] = [];
  const objectRe =
    /\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  const categoryLabels: Record<string, string> = {
    web: "Веб-разработка",
    seo: "SEO",
    smm: "Маркетинг и СММ",
    pf: "Поведенческие факторы",
    ads: "Платная реклама",
  };
  while ((m = objectRe.exec(src))) {
    const [, id, title, excerpt, category] = m;
    const articleUrl = `/blog/${id}`;
    const fullUrl = `${SITE_URL}${articleUrl}`;
    records.push({
      path: articleUrl,
      title: `${title} — HulkWork Blog`,
      description: excerpt,
      ogType: "article",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: excerpt,
          image: DEFAULT_OG_IMAGE,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
          articleSection: categoryLabels[category] ?? category,
        },
        breadcrumb([
          { name: "Блог", url: "/blog" },
          { name: title, url: articleUrl },
        ]),
      ],
    });
  }
  return records;
};

export default function prerenderPlugin(): Plugin {
  let viteConfig: ResolvedConfig;
  return {
    name: "hulkwork-static-prerender",
    apply: "build",
    configResolved(c) {
      viteConfig = c;
    },
    async closeBundle() {
      const outDir = path.resolve(viteConfig.root, viteConfig.build.outDir);
      const indexPath = path.join(outDir, "index.html");
      let template: string;
      try {
        template = await fs.readFile(indexPath, "utf8");
      } catch {
        // Build output not present — skip silently.
        return;
      }
      const blogRoutes = await loadBlogRoutes();
      const allRoutes = [...STATIC_ROUTES, ...blogRoutes];
      let count = 0;
      for (const route of allRoutes) {
        const patched = patchHtml(template, route);
        if (route.path === "/") {
          await fs.writeFile(indexPath, patched, "utf8");
        } else {
          const dir = path.join(outDir, route.path);
          await fs.mkdir(dir, { recursive: true });
          await fs.writeFile(path.join(dir, "index.html"), patched, "utf8");
        }
        count++;
      }
      // eslint-disable-next-line no-console
      console.log(
        `\n[prerender] Generated ${count} static HTML files with per-route SEO meta-tags.`,
      );
    },
  };
}
