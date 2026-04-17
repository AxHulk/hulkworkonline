import { useState, FormEvent } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
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

import bfHero from "@/assets/bf_hero.webp";
import bfTechnology from "@/assets/bf_technology.webp";
import bfSafety from "@/assets/bf_safety.webp";
import bfActions from "@/assets/bf_actions.webp";
import bfResults from "@/assets/bf_results.webp";

const techFeatures = [
  { icon: Code, label: "Тип разработки", value: "Собственный код, не публичные инструменты" },
  { icon: Zap, label: "Нагрузочное тестирование", value: "Протестировано на высоких объёмах трафика" },
  { icon: Clock, label: "Режим работы", value: "Ежедневно, без остановок" },
  { icon: SlidersHorizontal, label: "Адаптация", value: "Настройка паттернов под нишу и конкурентность" },
];

const actions = [
  { icon: ScrollText, title: "Скроллинг страниц", desc: "Естественная скорость чтения и прокрутки контента" },
  { icon: MousePointerClick, title: "Переходы по ссылкам", desc: "Изучение разделов каталога и внутренних страниц" },
  { icon: Timer, title: "Задержка на элементах", desc: "Курсор задерживается на кнопках, формах, изображениях" },
  { icon: ShoppingCart, title: "Корзина и формы", desc: "Имитация добавления товаров и заполнения форм" },
  { icon: FileText, title: "Глубина просмотра", desc: "Посещение нескольких страниц за одну сессию" },
];

const metrics = [
  { icon: Timer, label: "Время на сайте", value: "Рост среднего времени сессии до показателей топ-10 выдачи" },
  { icon: Eye, label: "Глубина просмотра", value: "Увеличение количества страниц за один визит" },
  { icon: ArrowDownUp, label: "Показатель отказов", value: "Снижение до минимальных значений по нише" },
  { icon: Search, label: "CTR в поисковой выдаче", value: "Имитация кликов по вашему сниппету в результатах поиска" },
  { icon: TrendingUp, label: "Позиции по запросам", value: "Уверенный рост по целевым коммерческим ключевым словам" },
];

const pricingRows = [
  { icon: DollarSign, label: "Стоимость", value: "от $400 / месяц" },
  { icon: Activity, label: "Режим работы", value: "Ежедневно, 24/7" },
  { icon: Wrench, label: "Настройка", value: "Паттерны поведения под вашу нишу и запросы" },
  { icon: ClipboardCheck, label: "Отчётность", value: "Регулярный мониторинг позиций и метрик" },
  { icon: Lock, label: "Безопасность", value: "Проходит все проверки вебмастера, GA, Яндекс Метрики" },
];

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
    logConsent("behavioral_factors");
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
        title="Поведенческие факторы — накрутка ПФ для Яндекса"
        description="Безопасная работа с поведенческими факторами в Яндексе: эмуляция реальных пользователей, рост позиций, контроль метрик. Прозрачные отчёты в Яндекс.Метрике."
        keywords="поведенческие факторы, накрутка ПФ, продвижение в Яндексе"
        jsonLd={[
          serviceJsonLd,
          buildBreadcrumbJsonLd([
            { name: "Услуги", url: "/" },
            { name: "Поведенческие факторы", url: "/services/behavioral-factors" },
          ]),
        ]}
      />
      {/* Block 1: Hero */}
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-20 md:py-28">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Доминирование в поиске: Умная имитация поведенческих факторов
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Ваш сайт может быть идеально сделан — но без правильных поведенческих сигналов поисковые
              системы не поставят его в топ. Мы решаем эту задачу с помощью уникального алгоритма
              собственной разработки, который создаёт безупречную картину живого, вовлечённого трафика. От
              $400 в месяц.
            </p>
            <Button size="lg" className="mt-8 font-heading font-semibold" asChild>
              <a href="#cta-form">Запустить рост трафика</a>
            </Button>
          </div>
          <div className="flex justify-center">
            <img
              src={bfHero}
              alt="Рост поведенческих факторов — неоновый график"
              className="w-full max-w-lg rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Block 2: Unique Technology */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Технология, которой нет аналогов на рынке
          </h2>

          <div className="mt-8 flex justify-center">
            <img
              src={bfTechnology}
              alt="Собственная технология имитации поведенческих факторов"
              className="w-full max-w-2xl rounded-xl"
            />
          </div>

          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Мы не используем публичные ботнеты или дешёвые скрипты, которые легко вычисляются
              поисковыми системами. В основе нашей услуги лежит <strong>уникальная имитация
              поведенческих факторов</strong>, реализованная посредством <strong>собственного
              разработанного кода</strong> — алгоритма, созданного и постоянно совершенствуемого
              командой HulkWork Studio.
            </p>
            <p>
              Наше решение прошло серьёзную проверку боем: оно <strong>протестировано высокими
              нагрузками</strong> на десятках конкурентных проектов и <strong>работает
              ежедневно</strong>, обеспечивая стабильный и предсказуемый результат.
            </p>
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
            100% невидимость для антифрод-систем
          </h2>

          <img
            src={bfSafety}
            alt="Безопасность: щит, Google Analytics, Яндекс Метрика"
            className="mx-auto mt-10 w-full max-w-2xl rounded-xl"
          />

          <div className="mt-8 space-y-4 text-left text-muted-foreground leading-relaxed">
            <p>
              Главный риск при работе с поведенческими факторами — это санкции со стороны поисковых
              систем. Именно поэтому безопасность была заложена в архитектуру нашего алгоритма с первого
              дня разработки.
            </p>
            <p>
              Трафик, генерируемый нашим кодом, <strong>проходит любые проверки вебмастера</strong>. Он
              абсолютно прозрачен для систем аналитики: <strong>Google Analytics</strong> и{" "}
              <strong>Яндекс Метрики</strong>. Каждая сессия обладает правильной глубиной просмотра,
              адекватным временем на сайте и органичными источниками перехода.
            </p>
          </div>

          <div className="mt-6 rounded-xl border bg-card p-5 text-sm italic text-muted-foreground">
            Ваш сайт остаётся в полной безопасности. Никаких санкций, никакой пессимизации, никаких
            блокировок.
          </div>
        </div>
      </section>

      {/* Block 4: Target Actions */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Не просто клики — осмысленное поведение
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Наша система обеспечивает выполнение целевых действий на вашем сайте, воспроизводя полный цикл
            поведения заинтересованного посетителя.
          </p>

          <div className="mt-6 flex justify-center">
            <img
              src={bfActions}
              alt="Целевые действия: скролл, клики, корзина, формы"
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
            Измеримый результат уже в первые недели
          </h2>

          <img
            src={bfResults}
            alt="Результаты до и после — рост метрик"
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
            Прозрачные инвестиции в рост позиций
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Мы предлагаем модель ежемесячной подписки на нашу технологию. Вы платите за стабильно
            работающий инструмент, который ежедневно улучшает ваши позиции.
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
            Точная стоимость зависит от объёма необходимого трафика и конкурентности вашей ниши. Оставьте
            заявку — мы рассчитаем оптимальный план.
          </p>
        </div>
      </section>

      {/* Block 7: CTA Form */}
      <section id="cta-form" className="bg-primary py-16 md:py-24">
        <div className="container max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            Выведите свой сайт в топ уже сегодня
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Хватит терять клиентов из-за низких позиций в поиске. Подключите нашу систему и наблюдайте за
            тем, как ваши метрики меняются к лучшему — день за днём.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input placeholder="Ваше имя" name="name" required className="bg-primary-foreground" />
            <Input placeholder="Ссылка на сайт" name="website" type="url" required className="bg-primary-foreground" />
            <Input placeholder="Email или Telegram" name="contact" required className="bg-primary-foreground" />
            <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="w-full font-heading font-semibold"
              disabled={loading}
            >
              {loading ? "Отправка..." : "Начать продвижение"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default BehavioralFactors;
