import { useState, FormEvent } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { toast } from "sonner";
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

const auditItems = [
  { check: "Технические ошибки (404, редиректы)", fix: "Устранение битых ссылок и цепочек редиректов", icon: Link2Off },
  { check: "Скорость загрузки страниц", fix: "Оптимизация изображений, кода и серверных настроек", icon: Gauge },
  { check: "Структура заголовков (H1–H6)", fix: "Корректная иерархия для поисковых роботов", icon: Heading1 },
  { check: "Мета-теги (Title, Description)", fix: "Написание уникальных и релевантных мета-данных", icon: FileText },
  { check: "Дублирующийся контент", fix: "Канонизация страниц и устранение дублей", icon: Copy },
  { check: "Индексация и карта сайта", fix: "Настройка robots.txt и sitemap.xml", icon: Map },
];

const processSteps = [
  { step: 1, title: "Аналитика и аудит", desc: "Полное сканирование сайта, выявление технических и контентных проблем", icon: Bug },
  { step: 2, title: "Исправление ошибок", desc: "Техническая оптимизация кода и структуры под требования Яндекса", icon: Wrench },
  { step: 3, title: "Разработка концепции", desc: "Сбор семантического ядра и создание стратегии контент-маркетинга", icon: Lightbulb },
  { step: 4, title: "Создание контента", desc: "Написание и публикация уникальных SEO-статей", icon: PenTool },
  { step: 5, title: "Подготовка к рекламе", desc: "Настройка аккаунтов Яндекс Директ и РСЯ для масштабирования", icon: DollarSign },
  { step: 6, title: "Мониторинг", desc: "Постоянное отслеживание позиций и корректировка стратегии", icon: TrendingUp },
];

const pricingItems = [
  { icon: Search, label: "Полный SEO-аудит", value: "Технический и контентный анализ сайта" },
  { icon: Wrench, label: "Исправление ошибок", value: "Устранение всех выявленных технических проблем" },
  { icon: Lightbulb, label: "Концепция продвижения", value: "Стратегия и семантическое ядро" },
  { icon: BookOpen, label: "Уникальные SEO-статьи", value: "Пакет текстов под целевые запросы" },
  { icon: ListChecks, label: "Рекомендации по улучшению", value: "Подробный план дальнейшего развития" },
];

const SeoPage = () => {
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      toast.error("Необходимо дать согласие на обработку персональных данных");
      return;
    }
    setConsentError(false);
    setLoading(true);
    logConsent("seo");
    setTimeout(() => {
      setLoading(false);
      toast.success("Заявка отправлена! Мы свяжемся с вами в течение 24 часов.");
      (e.target as HTMLFormElement).reset();
      setConsent(false);
    }, 800);
  };

  return (
    <Layout>
      <SEO
        title="SEO-продвижение сайтов в Яндекс и Google — HulkWork"
        description="Комплексное SEO: технический аудит, семантика, on-page оптимизация, ссылочное и контент. Прозрачные отчёты, рост трафика и позиций в Яндексе и Google."
        keywords="SEO, продвижение сайта, оптимизация, Яндекс, Google, поисковое продвижение"
        jsonLd={[
          serviceJsonLd,
          buildBreadcrumbJsonLd([
            { name: "Услуги", url: "/" },
            { name: "SEO аналитика", url: "/services/seo" },
          ]),
        ]}
      />
      {/* Block 1: Hero */}
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-20 md:py-28">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              SEO-аналитика и настройка: Фундамент вашего лидерства в поиске
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Превращаем ваш сайт в мощный инструмент продаж. От глубокого аудита и исправления технических
              ошибок до написания уникальных SEO-статей и подготовки рекламных кампаний в Яндекс Директ и
              РСЯ — мы берём на себя полный цикл поискового продвижения.
            </p>
            <Button size="lg" className="mt-8 font-heading font-semibold" asChild>
              <a href="#cta-form">Заказать SEO-аудит</a>
            </Button>
          </div>
          <div className="flex justify-center">
            <img src={seoHero} alt="SEO-аналитика — лупа с графиком роста" className="w-full max-w-lg rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Block 2: Technical Audit */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Диагностика и исправление: Делаем сайт идеальным для поисковиков
          </h2>

          <div className="mt-8 flex justify-center">
            <img src={seoAudit} alt="SEO-аудит: проверка ссылок, скорости, заголовков" className="w-full max-w-2xl rounded-xl" />
          </div>

          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Успешное продвижение невозможно на фундаменте с трещинами. Наша работа начинается с
              бескомпромиссной <strong>SEO-аналитики</strong> — полного технического аудита вашего ресурса.
            </p>
            <p>
              Специалисты HulkWork Studio не просто предоставляют сухой отчёт — мы берём на себя{" "}
              <strong>исправление сайта</strong>. Мы устраняем дубли страниц, оптимизируем скорость
              загрузки, выстраиваем правильную структуру заголовков и мета-тегов.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border bg-card">
            <div className="grid grid-cols-2 border-b bg-muted px-5 py-3">
              <span className="font-heading text-sm font-semibold">Что проверяем</span>
              <span className="font-heading text-sm font-semibold">Что исправляем</span>
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
            Контент, который любят люди и поисковые алгоритмы
          </h2>

          <img src={seoContent} alt="Контент-стратегия: Mind Map → Написание → Семантика" className="mx-auto mt-10 w-full max-w-2xl rounded-xl" />

          <div className="mt-8 space-y-4 text-left text-muted-foreground leading-relaxed">
            <p>
              Алгоритмы ранжирования становятся всё умнее, отдавая предпочтение экспертному и полезному
              контенту. Мы разрабатываем индивидуальную <strong>концепцию продвижения</strong>, основанную
              на семантическом ядре вашей ниши и реальных потребностях целевой аудитории.
            </p>
            <p>
              Наша команда профессиональных авторов занимается <strong>написанием уникальных
              SEO-статей</strong>. Мы создаём материалы, которые не только содержат необходимые ключевые
              запросы, но и полностью раскрывают тему, удерживая внимание читателя.
            </p>
          </div>

          <div className="mt-6 rounded-xl border bg-card p-5 text-sm italic text-muted-foreground">
            Хороший SEO-текст — это прежде всего полезный текст. Мы пишем для людей, а алгоритмы это
            замечают.
          </div>
        </div>
      </section>

      {/* Block 4: Yandex Direct & RSY */}
      <section className="py-16 md:py-24">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Яндекс Директ и РСЯ: Максимум трафика из единой экосистемы
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы рассматриваем SEO не как изолированный инструмент, а как часть комплексной
                маркетинговой стратегии. Идеально оптимизированный сайт — это лучшая посадочная площадка
                для платного трафика.
              </p>
              <p>
                Наша услуга включает профессиональную <strong>подготовку и настройку аккаунтов</strong> для
                рекламных кампаний. Мы создаём эффективные структуры кампаний в{" "}
                <strong>Яндекс Директ</strong> и настраиваем объявления для{" "}
                <strong>Рекламной сети Яндекса (РСЯ)</strong>. Ваш сайт и рекламные аккаунты работают в
                единой связке.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={seoYandex} alt="Воронка SEO + Яндекс Директ" className="w-full max-w-sm rounded-xl" />
          </div>
        </div>
      </section>

      {/* Block 5: Process */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Как мы выводим проекты в топ
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Наш подход основан на прозрачности и строгой последовательности действий.
          </p>

          <div className="mt-6 flex justify-center">
            <img src={seoProcess} alt="Процесс работы: 6 шагов" className="w-full max-w-2xl rounded-xl" />
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
            Комплексный подход по понятной цене
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Стоимость рассчитывается после первичного аудита и зависит от объёма работ, конкурентности ниши
            и необходимого количества контента.
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
            Оставьте заявку — мы рассчитаем индивидуальную стоимость для вашего проекта в течение 24 часов.
          </p>
        </div>
      </section>

      {/* Block 7: CTA Form */}
      <section id="cta-form" className="bg-primary py-16 md:py-24">
        <div className="container max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            Заложите фундамент для роста трафика
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Готовы сделать свой сайт видимым для клиентов? Свяжитесь с нами — первичный аудит покажет
            реальную картину и точки роста вашего проекта.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input placeholder="Ваше имя" name="name" required className="bg-primary-foreground" />
            <Input placeholder="Ссылка на сайт" name="website" type="url" required className="bg-primary-foreground" />
            <Input placeholder="Email или Telegram" name="contact" required className="bg-primary-foreground" />
            <textarea
              name="description"
              placeholder="Краткое описание задачи"
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
              {loading ? "Отправка..." : "Получить SEO-аудит"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default SeoPage;
