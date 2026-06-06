import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuizCTAButton from "@/components/quiz/QuizCTAButton";
import Layout from "@/components/layout/Layout";
import { useUsdRubRate, formatPrice } from "@/lib/exchangeRate";
import { useT } from "@/i18n/translations";
import {
  Code,
  Zap,
  Clock,
  SlidersHorizontal,
  Shield,
  BarChart3,
  MousePointerClick,
  ScrollText,
  ShoppingCart,
  FileText,
  Timer,
  TrendingUp,
  Eye,
  ArrowDownUp,
  Search,
  DollarSign,
  Activity,
  Wrench,
  ClipboardCheck,
  Lock,
} from "lucide-react";
import SEO from "@/components/SEO";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";

import bfHero from "@/assets/bf_hero.png";
import bfTechnology from "@/assets/bf_technology.png";
import bfSafety from "@/assets/bf_safety.png";
import bfActions from "@/assets/bf_actions.png";
import bfResults from "@/assets/bf_results.png";

const TECH_TEXT = {
  ru: [
    { label: "Тип разработки", value: "Собственный код, не публичные инструменты" },
    { label: "Нагрузочное тестирование", value: "Протестировано на высоких объёмах трафика" },
    { label: "Режим работы", value: "Ежедневно, без остановок" },
    { label: "Адаптация", value: "Настройка паттернов под нишу и конкурентность" },
  ],
  en: [
    { label: "Development type", value: "Proprietary code, not public tools" },
    { label: "Load testing", value: "Tested under high traffic volumes" },
    { label: "Operation mode", value: "Daily, non-stop" },
    { label: "Adaptation", value: "Pattern tuning per niche and competition" },
  ],
};
const TECH_ICONS = [Code, Zap, Clock, SlidersHorizontal];

const ACTIONS_TEXT = {
  ru: [
    { title: "Скроллинг страниц", desc: "Естественная скорость чтения и прокрутки контента" },
    { title: "Переходы по ссылкам", desc: "Изучение разделов каталога и внутренних страниц" },
    { title: "Задержка на элементах", desc: "Курсор задерживается на кнопках, формах, изображениях" },
    { title: "Корзина и формы", desc: "Имитация добавления товаров и заполнения форм" },
    { title: "Глубина просмотра", desc: "Посещение нескольких страниц за одну сессию" },
  ],
  en: [
    { title: "Page scrolling", desc: "Natural reading and scrolling speed" },
    { title: "Link navigation", desc: "Browsing catalog sections and internal pages" },
    { title: "Element hovering", desc: "Cursor lingers on buttons, forms, images" },
    { title: "Cart and forms", desc: "Simulating product additions and form fills" },
    { title: "View depth", desc: "Multiple pages per session" },
  ],
};
const ACTION_ICONS = [ScrollText, MousePointerClick, Timer, ShoppingCart, FileText];

const METRICS_TEXT = {
  ru: [
    { label: "Время на сайте", value: "Рост среднего времени сессии до показателей топ-10 выдачи" },
    { label: "Глубина просмотра", value: "Увеличение количества страниц за один визит" },
    { label: "Показатель отказов", value: "Снижение до минимальных значений по нише" },
    { label: "CTR в поисковой выдаче", value: "Имитация кликов по вашему сниппету в результатах поиска" },
    { label: "Позиции по запросам", value: "Уверенный рост по целевым коммерческим ключевым словам" },
  ],
  en: [
    { label: "Time on site", value: "Average session time grows to top-10 SERP levels" },
    { label: "View depth", value: "More pages viewed per visit" },
    { label: "Bounce rate", value: "Reduced to niche-minimum levels" },
    { label: "SERP CTR", value: "Simulated clicks on your snippet in search results" },
    { label: "Keyword rankings", value: "Steady growth on target commercial keywords" },
  ],
};
const METRIC_ICONS = [Timer, Eye, ArrowDownUp, Search, TrendingUp];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Работа с поведенческими факторами",
  provider: { "@type": "Organization", name: "HulkWork Studio", url: SITE_URL },
  areaServed: "RU",
  url: `${SITE_URL}/services/behavioral-factors`,
  description:
    "Безопасная работа с поведенческими факторами в Яндексе: эмуляция реальных пользователей, рост позиций.",
};

const BehavioralFactors = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  const rate = useUsdRubRate();
  const fmt = (usd: number) => formatPrice(usd, lang, rate);
  const techFeatures = TECH_TEXT[lang].map((f, i) => ({ ...f, icon: TECH_ICONS[i] }));
  const actions = ACTIONS_TEXT[lang].map((a, i) => ({ ...a, icon: ACTION_ICONS[i] }));
  const metrics = METRICS_TEXT[lang].map((m, i) => ({ ...m, icon: METRIC_ICONS[i] }));
  const pricingRows = [
    { icon: DollarSign, label: isEn ? "Cost" : "Стоимость", value: isEn ? `from ${fmt(400)} / month` : `от ${fmt(400)} / месяц` },
    { icon: Activity, label: isEn ? "Operation mode" : "Режим работы", value: isEn ? "Daily, 24/7" : "Ежедневно, 24/7" },
    { icon: Wrench, label: isEn ? "Configuration" : "Настройка", value: isEn ? "Behavior patterns tuned to your niche and queries" : "Паттерны поведения под вашу нишу и запросы" },
    { icon: ClipboardCheck, label: isEn ? "Reporting" : "Отчётность", value: isEn ? "Regular rank and metric monitoring" : "Регулярный мониторинг позиций и метрик" },
    { icon: Lock, label: isEn ? "Safety" : "Безопасность", value: isEn ? "Passes all webmaster checks, GA and Yandex Metrica" : "Проходит все проверки вебмастера, GA, Яндекс Метрики" },
  ];
  return (
    <Layout>
      <SEO
        title={isEn ? "Behavioral factors — user-behavior simulation for SEO" : "Поведенческие факторы — накрутка ПФ для Яндекса"}
        description={isEn
          ? "Safe behavioral-factor work for search engines: real-user emulation, rank growth, metric control. Transparent reports in analytics."
          : "Безопасная работа с поведенческими факторами в Яндексе: эмуляция реальных пользователей, рост позиций, контроль метрик. Прозрачные отчёты в Яндекс.Метрике."}
        keywords={isEn ? "behavioral factors, user behavior simulation, SEO behavioral, search rankings" : "поведенческие факторы, накрутка ПФ, продвижение в Яндексе"}
        jsonLd={[
          serviceJsonLd,
          buildBreadcrumbJsonLd([
            { name: isEn ? "Services" : "Услуги", url: "/" },
            { name: isEn ? "Behavioral factors" : "Поведенческие факторы", url: "/services/behavioral-factors" },
          ]),
        ]}
      />
      {/* Block 1: Hero */}
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-20 md:py-28">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              {isEn ? "Search dominance: smart behavioral-factor simulation" : "Доминирование в поиске: Умная имитация поведенческих факторов"}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {isEn
                ? `Your site can be perfectly built — but without the right behavioral signals, search engines won't put it on top. We solve this with a proprietary algorithm that creates a flawless picture of live, engaged traffic. From ${fmt(400)} per month.`
                : `Ваш сайт может быть идеально сделан — но без правильных поведенческих сигналов поисковые системы не поставят его в топ. Мы решаем эту задачу с помощью уникального алгоритма собственной разработки, который создаёт безупречную картину живого, вовлечённого трафика. От ${fmt(400)} в месяц.`}
            </p>
            <QuizCTAButton
              source="behavioral_page_hero"
              track="seo"
              size="lg"
              className="mt-8"
              label={isEn ? "Start traffic growth" : "Запустить рост трафика"}
            />
          </div>
          <div className="flex justify-center">
            <img
              src={bfHero}
              alt={isEn ? "Behavioral factor growth — neon chart" : "Рост поведенческих факторов — неоновый график"}
              className="w-full max-w-lg rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Block 2: Unique Technology */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Technology with no market equivalent" : "Технология, которой нет аналогов на рынке"}
          </h2>

          <div className="mt-8 flex justify-center">
            <img
              src={bfTechnology}
              alt={isEn ? "Proprietary behavioral simulation technology" : "Собственная технология имитации поведенческих факторов"}
              className="w-full max-w-2xl rounded-xl"
            />
          </div>

          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            {isEn ? (
              <>
                <p>We don't use public botnets or cheap scripts that search engines easily detect. Our service is built on <strong>unique behavioral-factor simulation</strong> via <strong>proprietary code</strong> — an algorithm created and continuously refined by the HulkWork team.</p>
                <p>Our solution has been battle-tested: <strong>high load testing</strong> across dozens of competitive projects, with <strong>daily operation</strong> producing stable and predictable results.</p>
              </>
            ) : (
              <>
                <p>Мы не используем публичные ботнеты или дешёвые скрипты, которые легко вычисляются поисковыми системами. В основе нашей услуги лежит <strong>уникальная имитация поведенческих факторов</strong>, реализованная посредством <strong>собственного разработанного кода</strong> — алгоритма, созданного и постоянно совершенствуемого командой HulkWork Studio.</p>
                <p>Наше решение прошло серьёзную проверку боем: оно <strong>протестировано высокими нагрузками</strong> на десятках конкурентных проектов и <strong>работает ежедневно</strong>, обеспечивая стабильный и предсказуемый результат.</p>
              </>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {techFeatures.map((f) => (
              <Card key={f.label} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">{f.label}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{f.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3: Safety */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "100% invisible to antifraud systems" : "100% невидимость для антифрод-систем"}
          </h2>

          <img
            src={bfSafety}
            alt={isEn ? "Safety: shield, Google Analytics, Yandex Metrica" : "Безопасность: щит, Google Analytics, Яндекс Метрика"}
            className="mx-auto mt-10 w-full max-w-2xl rounded-xl"
          />

          <div className="mt-8 space-y-4 text-left text-muted-foreground leading-relaxed">
            {isEn ? (
              <>
                <p>The main risk with behavioral-factor work is search-engine penalties. That's why safety has been built into our algorithm from day one.</p>
                <p>Traffic generated by our code <strong>passes any webmaster checks</strong>. It's fully transparent in analytics systems: <strong>Google Analytics</strong> and <strong>Yandex Metrica</strong>. Each session has correct view depth, adequate time on site and organic referral sources.</p>
              </>
            ) : (
              <>
                <p>Главный риск при работе с поведенческими факторами — это санкции со стороны поисковых систем. Именно поэтому безопасность была заложена в архитектуру нашего алгоритма с первого дня разработки.</p>
                <p>Трафик, генерируемый нашим кодом, <strong>проходит любые проверки вебмастера</strong>. Он абсолютно прозрачен для систем аналитики: <strong>Google Analytics</strong> и <strong>Яндекс Метрики</strong>. Каждая сессия обладает правильной глубиной просмотра, адекватным временем на сайте и органичными источниками перехода.</p>
              </>
            )}
          </div>

          <div className="mt-6 rounded-xl border bg-card p-5 text-sm italic text-muted-foreground">
            {isEn ? "Your site stays fully safe. No penalties, no pessimization, no blocks." : "Ваш сайт остаётся в полной безопасности. Никаких санкций, никакой пессимизации, никаких блокировок."}
          </div>
        </div>
      </section>

      {/* Block 4: Target Actions */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Not just clicks — meaningful behavior" : "Не просто клики — осмысленное поведение"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            {isEn
              ? "Our system performs target actions on your site, reproducing the full behavior cycle of an engaged visitor."
              : "Наша система обеспечивает выполнение целевых действий на вашем сайте, воспроизводя полный цикл поведения заинтересованного посетителя."}
          </p>

          <div className="mt-6 flex justify-center">
            <img
              src={bfActions}
              alt={isEn ? "Target actions: scroll, clicks, cart, forms" : "Целевые действия: скролл, клики, корзина, формы"}
              className="w-full max-w-xl rounded-xl"
            />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {actions.map((a) => (
              <Card key={a.title} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold">{a.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5: Results Before/After */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Measurable results in the first weeks" : "Измеримый результат уже в первые недели"}
          </h2>

          <img
            src={bfResults}
            alt={isEn ? "Before & after results — metric growth" : "Результаты до и после — рост метрик"}
            className="mx-auto mt-10 w-full max-w-2xl rounded-xl"
          />

          <div className="mt-8 overflow-hidden rounded-xl border bg-card">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`flex items-center gap-4 px-5 py-4 ${i !== metrics.length - 1 ? "border-b" : ""}`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <m.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-heading text-sm font-semibold">{m.label}</span>
                  <p className="text-xs text-muted-foreground">{m.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 6: Pricing */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            {isEn ? "Transparent investment in rank growth" : "Прозрачные инвестиции в рост позиций"}
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            {isEn
              ? "We offer a monthly subscription to our technology. You pay for a stable tool that improves your rankings every day."
              : "Мы предлагаем модель ежемесячной подписки на нашу технологию. Вы платите за стабильно работающий инструмент, который ежедневно улучшает ваши позиции."}
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
            {isEn ? "Exact pricing depends on traffic volume and niche competition. Send a request and we'll calculate the best plan." : "Точная стоимость зависит от объёма необходимого трафика и конкурентности вашей ниши. Оставьте заявку — мы рассчитаем оптимальный план."}
          </p>
        </div>
      </section>

      {/* Block 7: CTA Form */}
      <section id="cta-form" className="bg-primary py-16 md:py-24">
        <div className="container max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            {isEn ? "Get your site to the top today" : "Выведите свой сайт в топ уже сегодня"}
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            {isEn
              ? "Stop losing customers to low search positions. Activate our system and watch your metrics improve, day after day."
              : "Хватит терять клиентов из-за низких позиций в поиске. Подключите нашу систему и наблюдайте за тем, как ваши метрики меняются к лучшему — день за днём."}
          </p>
          <p className="mt-2 text-sm text-primary-foreground/70">
            {isEn
              ? "Answer 12 short questions — a personal manager will contact you within 12 hours with a ready strategy for your niche."
              : "Ответьте на 12 коротких вопросов — персональный менеджер свяжется с вами в течение 12 часов с готовой стратегией под вашу нишу."}
          </p>
          <div className="mt-8 flex justify-center">
            <QuizCTAButton
              source="behavioral_page_cta"
              track="seo"
              size="lg"
              variant="secondary"
              label={isEn ? "Take the quiz" : "Пройти опросник"}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BehavioralFactors;
