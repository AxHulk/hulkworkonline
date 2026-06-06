import { useState, FormEvent } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import { submitLead } from "@/lib/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { toast } from "sonner";
import {
  Lightbulb,
  Route,
  Brain,
  Send,
  ShoppingCart,
  Database,
  UserCheck,
  Settings,
  Globe,
  Server,
  Rocket,
  DollarSign,
  Clock,
  Code,
  Cpu,
  HardDrive,
  Wrench,
  Plus,
} from "lucide-react";

import heroWebdev from "@/assets/hero_webdev.png";
import techStackIcons from "@/assets/tech_stack_icons.png";
import aiToolsIcons from "@/assets/ai_tools_icons.png";
import serviceFeatureIcons from "@/assets/service_feature_icons.png";
import infrastructureIllustration from "@/assets/infrastructure_illustration.png";
import QuizCTAButton from "@/components/quiz/QuizCTAButton";
import ServiceInviteBanner from "@/components/quiz/ServiceInviteBanner";
import CitiesLinkGrid from "@/components/seo/CitiesLinkGrid";
import FaqSection from "@/components/seo/FaqSection";
import { useUsdRubRate, formatPrice } from "@/lib/exchangeRate";
import { useT } from "@/i18n/translations";

const FEATURES_TEXT = {
  ru: [
    { title: "Концепция и логотип", desc: "Разработка фирменного стиля с нуля — по необходимости, в рамках единого проекта" },
    { title: "Путь клиента", desc: "Глубинное продумывание логики сайта и Customer Journey для максимальной конверсии" },
    { title: "ИИ-интеграции", desc: "Подключение ChatGPT, Claude, Grok, DeepSeek, Lovable, Manus для умных функций" },
    { title: "Telegram-интеграция", desc: "Боты, уведомления, управление заказами прямо из мессенджера" },
    { title: "Магазин и витрина", desc: "Полнофункциональный интернет-магазин или каталог-витрина с корзиной и оплатой" },
    { title: "Базы данных", desc: "Работа с MySQL, PostgreSQL, MongoDB и любыми другими существующими БД" },
    { title: "Личные кабинеты", desc: "Защищённые профили пользователей с персонализированным функционалом" },
    { title: "CMS решения", desc: "Интеграция с популярными платформами или создание собственной системы управления" },
  ],
  en: [
    { title: "Concept & logo", desc: "Brand identity from scratch — on demand, as part of a single project" },
    { title: "Customer journey", desc: "Deep customer-journey design for maximum conversion" },
    { title: "AI integrations", desc: "ChatGPT, Claude, Grok, DeepSeek, Lovable, Manus for smart features" },
    { title: "Telegram integration", desc: "Bots, notifications, order management directly from the messenger" },
    { title: "Storefront & catalog", desc: "Full e-commerce or catalog with cart and payments" },
    { title: "Databases", desc: "MySQL, PostgreSQL, MongoDB and any other databases" },
    { title: "User dashboards", desc: "Secure user profiles with personalized functionality" },
    { title: "CMS solutions", desc: "Integration with popular platforms or a custom CMS" },
  ],
};

const ICONS = [Lightbulb, Route, Brain, Send, ShoppingCart, Database, UserCheck, Settings];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Создание сайтов под ключ",
  provider: { "@type": "Organization", name: "HulkWork Studio", url: SITE_URL },
  areaServed: "RU",
  url: `${SITE_URL}/services/web-development`,
  description:
    "Разработка сайтов любой сложности: лендинги, корпоративные сайты, интернет-магазины, SaaS-платформы.",
};

const WebDevelopment = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const rate = useUsdRubRate();
  const fmt = (usd: number) => formatPrice(usd, lang, rate);
  const features = FEATURES_TEXT[lang].map((f, i) => ({ ...f, icon: ICONS[i] }));

  const pricingRows = [
    { icon: DollarSign, label: isEn ? "Starting price" : "Стартовая цена", value: isEn ? `from ${fmt(500)}` : `от ${fmt(500)}` },
    { icon: Clock, label: isEn ? "Timeline" : "Сроки реализации", value: isEn ? "from 5 hours" : "от 5 часов" },
    { icon: Code, label: isEn ? "Languages & frameworks" : "Языки и фреймворки", value: "HTML, PHP, Java, Laravel, Python" },
    { icon: Cpu, label: isEn ? "AI tools" : "ИИ-инструменты", value: "ChatGPT, Claude, Grok, DeepSeek, Lovable, Manus" },
    { icon: HardDrive, label: isEn ? "Databases" : "Базы данных", value: isEn ? "MySQL, PostgreSQL, MongoDB and others" : "MySQL, PostgreSQL, MongoDB и любые другие" },
    { icon: Wrench, label: isEn ? "Infrastructure" : "Инфраструктура", value: isEn ? "Server setup, hosting, domain" : "Установка на сервер, хостинг, домен" },
    { icon: Plus, label: isEn ? "Add-ons" : "Дополнительно", value: isEn ? "Store, Telegram bot, dashboards, CMS, AI features" : "Магазин, Telegram-бот, личные кабинеты, CMS, ИИ-функции" },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      toast.error(isEn ? "Please accept the privacy policy to continue" : "Необходимо дать согласие на обработку персональных данных");
      return;
    }
    setConsentError(false);
    setLoading(true);
    logConsent("web_development");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await submitLead({
        source: "web_development",
        name: String(fd.get("name") || "").trim(),
        contact: String(fd.get("contact") || "").trim(),
        message: String(fd.get("description") || "").trim() || undefined,
      });
      toast.success(isEn ? "Request sent! We'll get back to you within 24 hours." : "Заявка отправлена! Мы свяжемся с вами в течение 24 часов.");
      form.reset();
      setConsent(false);
    } catch (err) {
      console.error(err);
      toast.error(isEn ? "Failed to send the request. Please try again." : "Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title={isEn ? "Custom Web Development — HulkWork Studio" : "Создание сайтов под ключ — HulkWork Studio"}
        description={isEn
          ? "Web development of any complexity: landing pages, corporate sites, e-commerce, SaaS platforms. Modern stack, speed, conversion and SEO from day one."
          : "Разработка сайтов любой сложности: лендинги, корпоративные сайты, интернет-магазины, SaaS-платформы. Современный стек, скорость, конверсия и SEO с первого дня."}
        keywords={isEn
          ? "web development, custom website, landing page, e-commerce development, corporate website, SaaS development"
          : "сделать сайт для компании, разработчики сайтов, стоимость сайта, корпоративный сайт под ключ, веб агентство, агентство веб дизайна, разработка корпоративного портала, лендинг под ключ, бизнес сайт под ключ, сайты любой сложности под ключ, проектирование сайтов, сайт под ключ в москве, изготовление сайтов в москве, веб разработка цена"}
        jsonLd={[
          serviceJsonLd,
          buildBreadcrumbJsonLd([
            { name: isEn ? "Services" : "Услуги", url: "/" },
            { name: isEn ? "Web Development" : "Создание сайтов", url: "/services/web-development" },
          ]),
        ]}
      />
      {/* Block 1: Hero */}
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-20 md:py-28">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              {isEn ? "Web development of the future: intelligence, speed, perfection" : "Разработка сайтов будущего: Интеллект, Скорость, Безупречность"}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {isEn
                ? `We don't build pages — we build powerful digital tools for your business. Using cutting-edge technology and AI, HulkWork Studio delivers flawless functionality from 5 hours of work and ${fmt(500)} per project.`
                : `Мы создаём не просто страницы, а мощные цифровые инструменты для вашего бизнеса. Используя самые современные технологии и передовые нейросети, HulkWork Studio обеспечивает великолепную функциональность без ошибок — от 5 часов работы и от ${fmt(500)} за проект.`}
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <QuizCTAButton source="webdev_hero" size="lg" label={isEn ? "Get a price in 2 min" : "Узнать цену за 2 мин"} />
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={heroWebdev}
              alt={isEn ? "Web development — illustration with code and AI" : "Разработка сайтов — иллюстрация с кодом и нейросетями"}
              className="w-full max-w-lg rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Block 2: Our Approach */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "The architecture of your success" : "Архитектура вашего успеха"}
          </h2>
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            {isEn ? (
              <>
                <p>Every successful project starts with a foundation. We don't use template solutions where individuality is required. Before writing a single line of code, our team works out the site logic and customer journey so every click leads to a target action.</p>
                <p>We design interaction scenarios, remove friction points and craft an intuitive experience. If you don't yet have a brand identity, we'll design the concept and logo — a visual language that matches the technical excellence of the product.</p>
                <p>The result is flawless functionality where every detail works for conversion and long-term growth.</p>
              </>
            ) : (
              <>
                <p>Каждый успешный проект начинается с фундамента. Мы не используем шаблонные решения там, где требуется индивидуальность. Прежде чем написать первую строку кода, наша команда берётся за глубинное продумывание логики работы сайта и пути клиента (Customer Journey) — чтобы каждый клик посетителя неизбежно вёл к целевому действию.</p>
                <p>Мы выстраиваем сценарии взаимодействия, устраняем точки трения и создаём интуитивно понятный опыт для конечного пользователя. Если у вас ещё нет фирменного стиля, мы берём на себя разработку концепции и логотипа, создавая визуальный язык, который будет гармонично сочетаться с техническим совершенством проекта.</p>
                <p>Результат нашей работы — это великолепная функциональность без ошибок, где каждая деталь работает на конверсию и долгосрочный рост.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Block 3: Technologies & AI */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Human expertise meets artificial intelligence" : "Синергия человеческого опыта и искусственного интеллекта"}
          </h2>

          <div className="mt-10 space-y-8">
            <div>
              <img
                src={techStackIcons}
                alt="Технологии: HTML5, PHP, Java, Laravel, Python, MySQL, PostgreSQL, MongoDB"
                className="mx-auto w-full max-w-2xl rounded-xl"
              />
              <p className="mt-6 text-center text-muted-foreground leading-relaxed">
                {isEn ? (
                  <>Our stack covers every layer of development: from classic <strong>HTML</strong>, <strong>PHP</strong> and <strong>Java</strong> to modern frameworks like <strong>Laravel</strong> and powerful backend architectures on <strong>Python</strong>. We work with any database — MySQL, PostgreSQL, MongoDB — guaranteeing security and speed.</>
                ) : (
                  <>Наш стек охватывает все уровни разработки: от классических решений на <strong>HTML</strong>, <strong>PHP</strong> и <strong>Java</strong> до современных фреймворков вроде <strong>Laravel</strong> и мощных backend-архитектур на <strong>Python</strong>. Мы работаем с любыми базами данных — MySQL, PostgreSQL, MongoDB — гарантируя безопасность и скорость.</>
                )}
              </p>
            </div>

            <div>
              <img
                src={aiToolsIcons}
                alt="ИИ-инструменты: ChatGPT, Claude, Grok, DeepSeek, Lovable, Manus"
                className="mx-auto w-full max-w-2xl rounded-xl"
              />
              <p className="mt-6 text-center text-muted-foreground leading-relaxed">
                {isEn ? (
                  <>We integrate cutting-edge neural networks — <strong>ChatGPT</strong>, <strong>Claude</strong>, <strong>Grok</strong>, <strong>DeepSeek</strong>, <strong>Lovable</strong> and <strong>Manus</strong> — for clean code generation, intelligent algorithms and process automation.</>
                ) : (
                  <>Мы интегрируем возможности передовых нейросетей — <strong>ChatGPT</strong>, <strong>Claude</strong>, <strong>Grok</strong>, <strong>DeepSeek</strong>, <strong>Lovable</strong> и <strong>Manus</strong> — для генерации чистого кода, создания интеллектуальных алгоритмов и автоматизации процессов.</>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Comprehensive Solutions */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Unlimited possibilities for your business" : "Безграничные возможности для вашего бизнеса"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            {isEn
              ? "A modern website is a complex mechanism, and we design systems of any complexity with seamless operation of all components."
              : "Современный сайт — это сложный механизм, и мы проектируем системы любой сложности, обеспечивая бесшовную работу всех компонентов."}
          </p>

          <div className="mx-auto mt-6 flex justify-center">
            <img
              src={serviceFeatureIcons}
              alt={isEn ? "Comprehensive solutions icons" : "Иконки комплексных решений"}
              className="w-full max-w-2xl rounded-xl"
            />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground leading-relaxed">
            {isEn
              ? "For content management we offer flexible solutions: integration with popular CMS platforms or building a custom one. Special attention to automation — seamless Telegram integration lets you manage orders directly from the messenger."
              : "Для управления контентом мы предлагаем гибкие решения: профессиональные CMS интеграции с популярными платформами или создание собственных систем управления. Особое внимание мы уделяем автоматизации — бесшовная интеграция с Telegram позволяет управлять заказами прямо из мессенджера."}
          </p>
        </div>
      </section>

      {/* Block 5: Infrastructure */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">{isEn ? "From idea to successful launch" : "От идеи до успешного запуска"}</h2>

          <img
            src={infrastructureIllustration}
            alt={isEn ? "Domain → Hosting → Launch" : "Домен → Хостинг → Запуск"}
            className="mx-auto mt-10 w-full max-w-2xl rounded-xl"
          />

          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed text-left">
            {isEn ? (
              <>
                <p>We support you at every step of technical deployment. Our team provides professional hosting assistance, picking the right capacity for your traffic. We handle full server setup, environment configuration and data security.</p>
                <p>You can buy an aged domain with history for a fast SEO start — such domains already have authority — or choose a brand-new unique name that perfectly reflects your brand.</p>
              </>
            ) : (
              <>
                <p>Мы сопровождаем вас на каждом этапе технического развёртывания проекта. Наша команда предоставляет профессиональную помощь с хостингом, подбирая оптимальные мощности под ваши задачи и объём трафика. Мы берём на себя полную установку на ваш сервер, обеспечивая правильную настройку окружения и безопасность данных.</p>
                <p>Мы предоставляем возможность приобрести доменное имя с историей для быстрого старта в SEO — такие домены уже имеют авторитет в глазах поисковых систем — или выбрать новое уникальное имя, которое идеально отразит суть вашего бренда.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Block 6: Pricing */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Transparent investment in quality" : "Прозрачные инвестиции в качество"}
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            {isEn ? "Every project is unique, but we respect your time and offer clear starting terms." : "Каждый проект уникален, но мы ценим ваше время и предлагаем понятные стартовые условия."}
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border bg-card">
            {pricingRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center gap-4 px-5 py-4 ${i !== pricingRows.length - 1 ? "border-b" : ""}`}
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
            Оставьте заявку — и мы рассчитаем точную стоимость вашего проекта в течение 24 часов.
          </p>
        </div>
      </section>

      {/* Block 7: CTA Form */}
      <section id="cta-form" className="bg-primary py-16 md:py-24">
        <div className="container max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            {isEn ? "Ready to build an outstanding project?" : "Готовы создать выдающийся проект?"}
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            {isEn
              ? "Send a request and we'll discuss how modern tech and AI can solve your business challenges. We respond within 24 hours."
              : "Оставьте заявку, и мы обсудим, как современные технологии и искусственный интеллект могут решить задачи вашего бизнеса. Мы ответим в течение 24 часов."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input placeholder={isEn ? "Your name" : "Ваше имя"} name="name" required className="bg-primary-foreground" />
            <Input placeholder={isEn ? "Email or Telegram" : "Email или Telegram"} name="contact" required className="bg-primary-foreground" />
            <textarea
              name="description"
              placeholder={isEn ? "Briefly describe your task" : "Краткое описание задачи"}
              required
              className="flex min-h-[100px] w-full rounded-md border border-input bg-primary-foreground px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="w-full font-heading font-semibold"
              disabled={loading}
            >
              {loading ? (isEn ? "Sending..." : "Отправка...") : (isEn ? "Start working together" : "Начать сотрудничество")}
            </Button>
          </form>
        </div>
      </section>
      <CitiesLinkGrid
        service="web-development"
        title="Сайт под ключ в вашем городе"
        subtitle="Делаем сайты для компаний по всей России. Выберите свой регион — увидите цены, сроки и FAQ под город."
      />
      <FaqSection
        title={isEn ? "Pricing and what's included" : "Сколько стоит и что входит в сайт под ключ"}
        items={isEn ? [
          { q: "How much does a business website cost?", a: `Landing page from ${fmt(500)}, corporate website from ${fmt(700)}, e-commerce from ${fmt(800)}, corporate portal from ${fmt(1500)}. Exact price calculated within 24 hours after a short brief.` },
          { q: "What's included in a full-cycle corporate website?", a: "Concept and prototype, brand identity (if needed), design, frontend, backend, integrations (CRM, payments, Telegram bot), SEO setup, hosting deployment, domain, CMS training and one month of support." },
          { q: "How is a web agency different from a freelancer?", a: "An agency covers the full cycle: planning, design, development, testing, SEO, support. It's contractual responsibility, fixed deadlines, accounting documents and a team instead of one person." },
          { q: "Do you build landing pages and ad campaigns together?", a: "Yes. Landing + Google/Yandex Ads + end-to-end analytics is our standard package for a fast sales launch." },
          { q: "Can we work remotely from any country?", a: "Yes. We work remotely worldwide. All steps via video calls and a task tracker." },
          { q: "How long does a corporate portal take?", a: "A simple portal — from 14 days. A complex one with roles, document flow and ERP integrations — from 6-8 weeks. Deadlines are fixed in the contract." },
        ] : [
          { q: "Сколько стоит сделать сайт для компании?", a: `Стартовая цена лендинга — от ${fmt(500)}, корпоративного сайта под ключ — от ${fmt(700)}, интернет-магазина — от ${fmt(800)}, корпоративного портала — от ${fmt(1500)}. Точную стоимость рассчитываем за 24 часа после короткого брифа.` },
          { q: "Что входит в «корпоративный сайт под ключ»?", a: "Концепция и прототип, фирменный стиль (если нужен), дизайн, вёрстка, бэкенд, интеграции (1С, CRM, оплата, Telegram-бот), SEO-настройка, размещение на хостинге, домен, обучение по управлению контентом и месяц поддержки." },
          { q: "Чем агентство веб-разработки отличается от фрилансера?", a: "Агентство закрывает весь цикл: проектирование, дизайн, разработка, тестирование, SEO, поддержка. Это ответственность по договору, фиксированные сроки, документы для бухгалтерии и команда вместо одного человека." },
          { q: "Делаете ли вы лендинги и рекламу под ключ?", a: "Да. Связка лендинг + Яндекс Директ + РСЯ + сквозная аналитика — наш стандартный пакет для быстрого запуска продаж." },
          { q: "Можно ли сделать сайт под ключ удалённо из любого города?", a: "Да. Мы работаем удалённо со всей Россией: Москва, СПб, Краснодар, Казань, Сочи, Крым, Екатеринбург, Уфа, Самара и др. Все этапы — через видеозвонки и таск-трекер." },
          { q: "Сколько времени занимает разработка корпоративного портала?", a: "Простой портал — от 14 дней. Сложный, с ролями, документооборотом и интеграциями с ERP — от 6–8 недель. Сроки фиксируем в договоре." },
        ]}
      />
      <ServiceInviteBanner
        storageKey="hw_webdev_invite_shown"
        source="webdev_invite_banner"
        track="website"
        icon={Rocket}
        title={isEn ? "Calculate a quote for your site" : "Рассчитаем сайт под ваш проект"}
        description={isEn ? <>Answer 15 quick questions — get the <strong className="text-foreground">exact price and timeline</strong> for your project.</> : <>Ответьте на 15 коротких вопросов — узнайте <strong className="text-foreground">точную цену и срок</strong> разработки именно вашего сайта.</>}
        ctaLabel={isEn ? "Accept the challenge" : "Принять вызов"}
        footnote={isEn ? "≈ 2 minutes · no commitment" : "≈ 2 минуты · без обязательств"}
      />
    </Layout>
  );
};

export default WebDevelopment;
