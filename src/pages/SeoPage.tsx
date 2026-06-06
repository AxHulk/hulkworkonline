import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuizCTAButton from "@/components/quiz/QuizCTAButton";
import ServiceInviteBanner from "@/components/quiz/ServiceInviteBanner";
import CitiesLinkGrid from "@/components/seo/CitiesLinkGrid";
import FaqSection from "@/components/seo/FaqSection";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { useUsdRubRate, formatPrice } from "@/lib/exchangeRate";
import { useT } from "@/i18n/translations";
import {
  Link2Off,
  Gauge,
  Heading1,
  FileText,
  Copy,
  Map,
  Search,
  Bug,
  Wrench,
  Lightbulb,
  PenTool,
  DollarSign,
  TrendingUp,
  ClipboardCheck,
  BookOpen,
  FileCheck,
  ListChecks,
} from "lucide-react";

import seoHero from "@/assets/seo_hero.png";
import seoAudit from "@/assets/seo_audit.png";
import seoContent from "@/assets/seo_content.png";
import seoYandex from "@/assets/seo_yandex.png";
import seoProcess from "@/assets/seo_process.png";

const AUDIT_TEXT = {
  ru: [
    { check: "Технические ошибки (404, редиректы)", fix: "Устранение битых ссылок и цепочек редиректов" },
    { check: "Скорость загрузки страниц", fix: "Оптимизация изображений, кода и серверных настроек" },
    { check: "Структура заголовков (H1–H6)", fix: "Корректная иерархия для поисковых роботов" },
    { check: "Мета-теги (Title, Description)", fix: "Написание уникальных и релевантных мета-данных" },
    { check: "Дублирующийся контент", fix: "Канонизация страниц и устранение дублей" },
    { check: "Индексация и карта сайта", fix: "Настройка robots.txt и sitemap.xml" },
  ],
  en: [
    { check: "Technical errors (404s, redirects)", fix: "Fixing broken links and redirect chains" },
    { check: "Page load speed", fix: "Image, code and server optimization" },
    { check: "Heading structure (H1–H6)", fix: "Proper hierarchy for search bots" },
    { check: "Meta tags (Title, Description)", fix: "Writing unique and relevant metadata" },
    { check: "Duplicate content", fix: "Page canonicalization and deduplication" },
    { check: "Indexing and sitemap", fix: "robots.txt and sitemap.xml setup" },
  ],
};
const AUDIT_ICONS = [Link2Off, Gauge, Heading1, FileText, Copy, Map];

const PROCESS_TEXT = {
  ru: [
    { title: "Аналитика и аудит", desc: "Полное сканирование сайта, выявление технических и контентных проблем" },
    { title: "Исправление ошибок", desc: "Техническая оптимизация кода и структуры под требования Яндекса" },
    { title: "Разработка концепции", desc: "Сбор семантического ядра и создание стратегии контент-маркетинга" },
    { title: "Создание контента", desc: "Написание и публикация уникальных SEO-статей" },
    { title: "Подготовка к рекламе", desc: "Настройка аккаунтов Яндекс Директ и РСЯ для масштабирования" },
    { title: "Мониторинг", desc: "Постоянное отслеживание позиций и корректировка стратегии" },
  ],
  en: [
    { title: "Analytics & audit", desc: "Full site scan, identifying technical and content issues" },
    { title: "Fixing errors", desc: "Technical optimization of code and structure for search engines" },
    { title: "Strategy concept", desc: "Semantic core collection and content marketing strategy" },
    { title: "Content creation", desc: "Writing and publishing unique SEO articles" },
    { title: "Ad campaign prep", desc: "Setting up Google/Yandex ad accounts for scaling" },
    { title: "Monitoring", desc: "Continuous rank tracking and strategy adjustment" },
  ],
};
const PROCESS_ICONS = [Bug, Wrench, Lightbulb, PenTool, DollarSign, TrendingUp];

const PRICING_TEXT = {
  ru: [
    { label: "Полный SEO-аудит", value: "Технический и контентный анализ сайта" },
    { label: "Исправление ошибок", value: "Устранение всех выявленных технических проблем" },
    { label: "Концепция продвижения", value: "Стратегия и семантическое ядро" },
    { label: "Уникальные SEO-статьи", value: "Пакет текстов под целевые запросы" },
    { label: "Рекомендации по улучшению", value: "Подробный план дальнейшего развития" },
  ],
  en: [
    { label: "Full SEO audit", value: "Technical and content analysis of the site" },
    { label: "Fixing errors", value: "Resolving all identified technical issues" },
    { label: "Promotion strategy", value: "Strategy and semantic core" },
    { label: "Unique SEO articles", value: "Content package for target queries" },
    { label: "Improvement recommendations", value: "Detailed roadmap for further growth" },
  ],
};
const PRICING_ICONS = [Search, Wrench, Lightbulb, BookOpen, ListChecks];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "SEO-продвижение сайтов",
  provider: { "@type": "Organization", name: "HulkWork Studio", url: SITE_URL },
  areaServed: "RU",
  url: `${SITE_URL}/services/seo`,
  description:
    "Комплексное SEO-продвижение в Яндекс и Google: технический аудит, семантика, on-page оптимизация, ссылочное.",
};

const SeoPage = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  const rate = useUsdRubRate();
  const fmt = (usd: number) => formatPrice(usd, lang, rate);
  const auditItems = AUDIT_TEXT[lang].map((it, i) => ({ ...it, icon: AUDIT_ICONS[i] }));
  const processSteps = PROCESS_TEXT[lang].map((s, i) => ({ ...s, step: i + 1, icon: PROCESS_ICONS[i] }));
  const pricingItems = PRICING_TEXT[lang].map((p, i) => ({ ...p, icon: PRICING_ICONS[i] }));
  return (
    <Layout>
      <SEO
        title={isEn ? "SEO promotion in Google & Yandex — HulkWork" : "SEO-продвижение сайтов в Яндекс и Google — HulkWork"}
        description={isEn
          ? "Full-cycle SEO: technical audit, semantics, on-page optimization, link building and content. Transparent reports, growth in traffic and rankings in Google and Yandex."
          : "Комплексное SEO: технический аудит, семантика, on-page оптимизация, ссылочное и контент. Прозрачные отчёты, рост трафика и позиций в Яндексе и Google."}
        keywords={isEn ? "SEO, Google SEO, Yandex SEO, technical SEO, semantic core, link building" : "комплексное SEO, услуги комплексного интернет маркетинга, услуги комплексного продвижения в интернете, продвижение санкт петербург, продвижение спб, продвижение москва, продвижение краснодар, продвижение екатеринбург, продвижение уфа, продвижение самара, продвижение красноярск, продвижение тула, продвижение барнаул, продвижение саранск"}
        jsonLd={[
          serviceJsonLd,
          buildBreadcrumbJsonLd([
            { name: isEn ? "Services" : "Услуги", url: "/" },
            { name: isEn ? "SEO" : "SEO аналитика", url: "/services/seo" },
          ]),
        ]}
      />
      {/* Block 1: Hero */}
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-20 md:py-28">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              {isEn ? "SEO analytics and setup: the foundation of your search leadership" : "SEO-аналитика и настройка: Фундамент вашего лидерства в поиске"}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {isEn
                ? "We turn your site into a powerful sales tool. From deep technical audits and fixing errors to writing unique SEO articles and preparing ad campaigns — we handle the full cycle of search promotion."
                : "Превращаем ваш сайт в мощный инструмент продаж. От глубокого аудита и исправления технических ошибок до написания уникальных SEO-статей и подготовки рекламных кампаний в Яндекс Директ и РСЯ — мы берём на себя полный цикл поискового продвижения."}
            </p>
            <QuizCTAButton
              source="seo_page_hero"
              track="seo"
              size="lg"
              className="mt-8"
              label={isEn ? "Order an SEO audit" : "Заказать SEO-аудит"}
            />
          </div>
          <div className="flex justify-center">
            <img src={seoHero} alt={isEn ? "SEO analytics — magnifier and growth chart" : "SEO-аналитика — лупа с графиком роста"} className="w-full max-w-lg rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Block 2: Technical Audit */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Diagnostics and fixes: making your site perfect for search engines" : "Диагностика и исправление: Делаем сайт идеальным для поисковиков"}
          </h2>

          <div className="mt-8 flex justify-center">
            <img src={seoAudit} alt={isEn ? "SEO audit: link, speed, heading checks" : "SEO-аудит: проверка ссылок, скорости, заголовков"} className="w-full max-w-2xl rounded-xl" />
          </div>

          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            {isEn ? (
              <>
                <p>Successful promotion is impossible on a cracked foundation. Our work starts with uncompromising <strong>SEO analytics</strong> — a full technical audit of your site.</p>
                <p>HulkWork specialists don't just hand over a dry report — we take on the <strong>fixes</strong> ourselves. We eliminate duplicate pages, optimize load speed and build correct heading and meta-tag structure.</p>
              </>
            ) : (
              <>
                <p>Успешное продвижение невозможно на фундаменте с трещинами. Наша работа начинается с бескомпромиссной <strong>SEO-аналитики</strong> — полного технического аудита вашего ресурса.</p>
                <p>Специалисты HulkWork Studio не просто предоставляют сухой отчёт — мы берём на себя <strong>исправление сайта</strong>. Мы устраняем дубли страниц, оптимизируем скорость загрузки, выстраиваем правильную структуру заголовков и мета-тегов.</p>
              </>
            )}
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border bg-card">
            <div className="grid grid-cols-2 border-b bg-muted px-5 py-3">
              <span className="font-heading text-sm font-semibold">{isEn ? "What we check" : "Что проверяем"}</span>
              <span className="font-heading text-sm font-semibold">{isEn ? "What we fix" : "Что исправляем"}</span>
            </div>
            {auditItems.map((item, i) => (
              <div key={item.check} className={`grid grid-cols-2 gap-4 px-5 py-4 ${i !== auditItems.length - 1 ? "border-b" : ""}`}>
                <div className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm">{item.check}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.fix}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3: Content Strategy */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Content loved by both people and search algorithms" : "Контент, который любят люди и поисковые алгоритмы"}
          </h2>

          <img src={seoContent} alt={isEn ? "Content strategy: mind map → writing → semantics" : "Контент-стратегия: Mind Map → Написание → Семантика"} className="mx-auto mt-10 w-full max-w-2xl rounded-xl" />

          <div className="mt-8 space-y-4 text-left text-muted-foreground leading-relaxed">
            {isEn ? (
              <>
                <p>Ranking algorithms keep getting smarter, favoring expert and useful content. We build an individual <strong>promotion strategy</strong> based on your niche's semantic core and your audience's real needs.</p>
                <p>Our team of professional writers handles <strong>unique SEO articles</strong>. We create content that not only contains the right keywords but fully covers the topic and holds reader attention.</p>
              </>
            ) : (
              <>
                <p>Алгоритмы ранжирования становятся всё умнее, отдавая предпочтение экспертному и полезному контенту. Мы разрабатываем индивидуальную <strong>концепцию продвижения</strong>, основанную на семантическом ядре вашей ниши и реальных потребностях целевой аудитории.</p>
                <p>Наша команда профессиональных авторов занимается <strong>написанием уникальных SEO-статей</strong>. Мы создаём материалы, которые не только содержат необходимые ключевые запросы, но и полностью раскрывают тему, удерживая внимание читателя.</p>
              </>
            )}
          </div>

          <div className="mt-6 rounded-xl border bg-card p-5 text-sm italic text-muted-foreground">
            {isEn ? "Good SEO content is first and foremost useful content. We write for people, and algorithms notice." : "Хороший SEO-текст — это прежде всего полезный текст. Мы пишем для людей, а алгоритмы это замечают."}
          </div>
        </div>
      </section>

      {/* Block 4: Yandex Direct & RSY */}
      <section className="py-16 md:py-24">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              {isEn ? "Google Ads & Yandex Direct: maximum traffic from a unified ecosystem" : "Яндекс Директ и РСЯ: Максимум трафика из единой экосистемы"}
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              {isEn ? (
                <>
                  <p>We see SEO not as an isolated tool but as part of a complete marketing strategy. A perfectly optimized site is the best landing ground for paid traffic.</p>
                  <p>Our service includes professional <strong>account setup</strong> for ad campaigns. We build effective campaign structures in <strong>Google Ads</strong> and <strong>Yandex Direct</strong>. Your site and ad accounts work together as a single system.</p>
                </>
              ) : (
                <>
                  <p>Мы рассматриваем SEO не как изолированный инструмент, а как часть комплексной маркетинговой стратегии. Идеально оптимизированный сайт — это лучшая посадочная площадка для платного трафика.</p>
                  <p>Наша услуга включает профессиональную <strong>подготовку и настройку аккаунтов</strong> для рекламных кампаний. Мы создаём эффективные структуры кампаний в <strong>Яндекс Директ</strong> и настраиваем объявления для <strong>Рекламной сети Яндекса (РСЯ)</strong>. Ваш сайт и рекламные аккаунты работают в единой связке.</p>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <img src={seoYandex} alt={isEn ? "SEO + Ads funnel" : "Воронка SEO + Яндекс Директ"} className="w-full max-w-sm rounded-xl" />
          </div>
        </div>
      </section>

      {/* Block 5: Process */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "How we get projects to the top" : "Как мы выводим проекты в топ"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            {isEn ? "Our approach is built on transparency and strict sequence of actions." : "Наш подход основан на прозрачности и строгой последовательности действий."}
          </p>

          <div className="mt-6 flex justify-center">
            <img src={seoProcess} alt={isEn ? "Workflow: 6 steps" : "Процесс работы: 6 шагов"} className="w-full max-w-2xl rounded-xl" />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s) => (
              <Card key={s.step} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                      {s.step}
                    </span>
                    <h3 className="font-heading text-sm font-semibold">{s.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Block 6: Pricing */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "A complete approach at a clear price" : "Комплексный подход по понятной цене"}
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            {isEn
              ? "Pricing is calculated after the initial audit and depends on scope, niche competitiveness and content volume."
              : "Стоимость рассчитывается после первичного аудита и зависит от объёма работ, конкурентности ниши и необходимого количества контента."}
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border bg-card">
            {pricingItems.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center gap-4 px-5 py-4 ${i !== pricingItems.length - 1 ? "border-b" : ""}`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <row.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-heading text-sm font-semibold">{row.label}</span>
                  <p className="text-xs text-muted-foreground">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm italic text-muted-foreground">
            {isEn ? "Send a request — we'll calculate a tailored quote within 24 hours." : "Оставьте заявку — мы рассчитаем индивидуальную стоимость для вашего проекта в течение 24 часов."}
          </p>
        </div>
      </section>

      {/* Block 7: CTA Form */}
      <section id="cta-form" className="bg-primary py-16 md:py-24">
        <div className="container max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            {isEn ? "Lay the foundation for traffic growth" : "Заложите фундамент для роста трафика"}
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            {isEn
              ? "Ready to make your site visible to customers? Get in touch — the initial audit reveals the real picture and growth opportunities."
              : "Готовы сделать свой сайт видимым для клиентов? Свяжитесь с нами — первичный аудит покажет реальную картину и точки роста вашего проекта."}
          </p>
          <p className="mt-2 text-sm text-primary-foreground/70">
            {isEn
              ? "Answer 12 short questions — a manager will reach out within 12 hours with a personal proposal."
              : "Ответьте на 12 коротких вопросов — менеджер свяжется с вами в течение 12 часов с персональным предложением."}
          </p>
          <div className="mt-8 flex justify-center">
            <QuizCTAButton
              source="seo_page_cta"
              track="seo"
              size="lg"
              variant="secondary"
              label={isEn ? "Take the SEO quiz" : "Пройти SEO-опросник"}
            />
          </div>
        </div>
      </section>
      <ServiceInviteBanner
        storageKey="hw_seo_invite_shown"
        source="seo_invite_banner"
        track="seo"
        icon={Search}
        title={isEn ? "We'll pick an SEO strategy for your site" : "Подберём стратегию SEO под ваш сайт"}
        description={isEn ? <>Answer 12 questions — a manager will send you a <strong className="text-foreground">personal promotion plan</strong> with growth projections.</> : <>Ответьте на 12 вопросов — менеджер пришлёт <strong className="text-foreground">персональный план продвижения</strong> и оценку перспектив роста.</>}
        ctaLabel={isEn ? "Take the SEO quiz" : "Пройти SEO-опросник"}
        footnote={isEn ? "≈ 3 minutes · personal proposal" : "≈ 3 минуты · персональное предложение"}
      />
      <CitiesLinkGrid
        service="seo"
        title="SEO-продвижение по городам России"
        subtitle="Региональное продвижение с учётом локальной выдачи Яндекса. Выберите ваш город — увидите специфику ниши, сроки и FAQ."
      />
      <FaqSection
        title={isEn ? "FAQ about full-cycle SEO" : "Частые вопросы про комплексное SEO"}
        items={isEn ? [
          { q: "What is full-cycle SEO and what does it include?", a: "It's the complete cycle: technical audit and error fixing, semantic core, on-page optimization, SEO articles, link building, regional targeting and monthly reports on rankings and traffic." },
          { q: "How is full-cycle internet marketing different from regular SEO?", a: "Full-cycle marketing includes SEO + paid ads (Google/Yandex) + behavioral factors + content marketing. This delivers fast traffic alongside long-term organic growth." },
          { q: "How many months until SEO shows results?", a: "Low-frequency commercial queries reach top-10 in 2-3 months. High-frequency queries in 4-8 months. Speed depends on site age, niche competition and budget." },
          { q: "Do you do regional SEO?", a: "Yes. We support regional SEO across many cities and countries with localized strategies." },
          { q: "How much does full-cycle SEO cost?", a: `Starting audit and setup from ${fmt(500)}. Monthly maintenance from ${fmt(400)}. Exact range depends on region, niche and current site state.` },
          { q: "Can I order just an audit without a monthly subscription?", a: `Yes. A one-off SEO audit starts at ${fmt(300)} and includes a 30+ page report with a prioritized action list.` },
        ] : [
          { q: "Что такое комплексное SEO и что в него входит?", a: "Это полный цикл работ: технический аудит и исправление ошибок, сбор семантического ядра, on-page оптимизация, написание SEO-статей, наращивание ссылочного профиля, региональная привязка и ежемесячные отчёты по позициям и трафику." },
          { q: "Чем услуги комплексного интернет-маркетинга отличаются от обычного SEO?", a: "Комплексный интернет-маркетинг включает SEO + контекстную рекламу (Яндекс Директ, РСЯ) + работу с поведенческими факторами + контент-маркетинг. Это даёт быстрый трафик параллельно с долгосрочным ростом органики." },
          { q: "Через сколько месяцев SEO даст результат?", a: "Низкочастотные коммерческие запросы выходят в топ-10 за 2–3 месяца. Высокочастотные — за 4–8 месяцев. Скорость зависит от возраста сайта, конкуренции в нише и бюджета." },
          { q: "Делаете ли вы SEO для конкретных городов?", a: "Да. У нас есть отдельные страницы и стратегии для Москвы, СПб, Казани, Краснодара, Сочи, Крыма, Екатеринбурга, Уфы, Самары, Красноярска, Тулы, Барнаула и Саранска." },
          { q: "Сколько стоит комплексное SEO?", a: `Стартовый аудит и настройка — от ${fmt(500)}. Ежемесячное сопровождение — от ${fmt(400)}. Точная вилка зависит от региона, ниши и текущего состояния сайта.` },
          { q: "Можно ли заказать только аудит без месячного абонемента?", a: `Да. Разовый SEO-аудит сайта стоит от ${fmt(300)} и включает отчёт на 30+ страниц с приоритизированным списком работ.` },
        ]}
      />
    </Layout>
  );
};

export default SeoPage;
