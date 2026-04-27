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

const features = [
  { icon: Lightbulb, title: "Концепция и логотип", desc: "Разработка фирменного стиля с нуля — по необходимости, в рамках единого проекта" },
  { icon: Route, title: "Путь клиента", desc: "Глубинное продумывание логики сайта и Customer Journey для максимальной конверсии" },
  { icon: Brain, title: "ИИ-интеграции", desc: "Подключение ChatGPT, Claude, Grok, DeepSeek, Lovable, Manus для умных функций" },
  { icon: Send, title: "Telegram-интеграция", desc: "Боты, уведомления, управление заказами прямо из мессенджера" },
  { icon: ShoppingCart, title: "Магазин и витрина", desc: "Полнофункциональный интернет-магазин или каталог-витрина с корзиной и оплатой" },
  { icon: Database, title: "Базы данных", desc: "Работа с MySQL, PostgreSQL, MongoDB и любыми другими существующими БД" },
  { icon: UserCheck, title: "Личные кабинеты", desc: "Защищённые профили пользователей с персонализированным функционалом" },
  { icon: Settings, title: "CMS решения", desc: "Интеграция с популярными платформами или создание собственной системы управления" },
];

const pricingRows = [
  { icon: DollarSign, label: "Стартовая цена", value: "от $500" },
  { icon: Clock, label: "Сроки реализации", value: "от 5 часов" },
  { icon: Code, label: "Языки и фреймворки", value: "HTML, PHP, Java, Laravel, Python" },
  { icon: Cpu, label: "ИИ-инструменты", value: "ChatGPT, Claude, Grok, DeepSeek, Lovable, Manus" },
  { icon: HardDrive, label: "Базы данных", value: "MySQL, PostgreSQL, MongoDB и любые другие" },
  { icon: Wrench, label: "Инфраструктура", value: "Установка на сервер, хостинг, домен" },
  { icon: Plus, label: "Дополнительно", value: "Магазин, Telegram-бот, личные кабинеты, CMS, ИИ-функции" },
];

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
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      toast.error("Необходимо дать согласие на обработку персональных данных");
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
      toast.success("Заявка отправлена! Мы свяжемся с вами в течение 24 часов.");
      form.reset();
      setConsent(false);
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Создание сайтов под ключ — HulkWork Studio"
        description="Разработка сайтов любой сложности: лендинги, корпоративные сайты, интернет-магазины, SaaS-платформы. Современный стек, скорость, конверсия и SEO с первого дня."
        keywords="создание сайтов, разработка сайтов, лендинг, интернет-магазин, веб-разработка"
        jsonLd={[
          serviceJsonLd,
          buildBreadcrumbJsonLd([
            { name: "Услуги", url: "/" },
            { name: "Создание сайтов", url: "/services/web-development" },
          ]),
        ]}
      />
      {/* Block 1: Hero */}
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-20 md:py-28">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Разработка сайтов будущего: Интеллект, Скорость, Безупречность
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Мы создаём не просто страницы, а мощные цифровые инструменты для вашего бизнеса.
              Используя самые современные технологии и передовые нейросети, HulkWork Studio обеспечивает
              великолепную функциональность без ошибок — от 5 часов работы и от $500 за проект.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <QuizCTAButton source="webdev_hero" size="lg" label="Узнать цену за 2 мин" />
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={heroWebdev}
              alt="Разработка сайтов — иллюстрация с кодом и нейросетями"
              className="w-full max-w-lg rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Block 2: Our Approach */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Архитектура вашего успеха
          </h2>
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Каждый успешный проект начинается с фундамента. Мы не используем шаблонные решения там, где
              требуется индивидуальность. Прежде чем написать первую строку кода, наша команда берётся за
              глубинное продумывание логики работы сайта и пути клиента (Customer Journey) — чтобы каждый
              клик посетителя неизбежно вёл к целевому действию.
            </p>
            <p>
              Мы выстраиваем сценарии взаимодействия, устраняем точки трения и создаём интуитивно понятный
              опыт для конечного пользователя. Если у вас ещё нет фирменного стиля, мы берём на себя
              разработку концепции и логотипа, создавая визуальный язык, который будет гармонично сочетаться
              с техническим совершенством проекта.
            </p>
            <p>
              Результат нашей работы — это великолепная функциональность без ошибок, где каждая деталь
              работает на конверсию и долгосрочный рост.
            </p>
          </div>
        </div>
      </section>

      {/* Block 3: Technologies & AI */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Синергия человеческого опыта и искусственного интеллекта
          </h2>

          <div className="mt-10 space-y-8">
            <div>
              <img
                src={techStackIcons}
                alt="Технологии: HTML5, PHP, Java, Laravel, Python, MySQL, PostgreSQL, MongoDB"
                className="mx-auto w-full max-w-2xl rounded-xl"
              />
              <p className="mt-6 text-center text-muted-foreground leading-relaxed">
                Наш стек охватывает все уровни разработки: от классических решений на <strong>HTML</strong>,{" "}
                <strong>PHP</strong> и <strong>Java</strong> до современных фреймворков вроде{" "}
                <strong>Laravel</strong> и мощных backend-архитектур на <strong>Python</strong>. Мы работаем
                с любыми базами данных — MySQL, PostgreSQL, MongoDB — гарантируя безопасность и скорость.
              </p>
            </div>

            <div>
              <img
                src={aiToolsIcons}
                alt="ИИ-инструменты: ChatGPT, Claude, Grok, DeepSeek, Lovable, Manus"
                className="mx-auto w-full max-w-2xl rounded-xl"
              />
              <p className="mt-6 text-center text-muted-foreground leading-relaxed">
                Мы интегрируем возможности передовых нейросетей — <strong>ChatGPT</strong>,{" "}
                <strong>Claude</strong>, <strong>Grok</strong>, <strong>DeepSeek</strong>,{" "}
                <strong>Lovable</strong> и <strong>Manus</strong> — для генерации чистого кода, создания
                интеллектуальных алгоритмов и автоматизации процессов.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Comprehensive Solutions */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Безграничные возможности для вашего бизнеса
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Современный сайт — это сложный механизм, и мы проектируем системы любой сложности, обеспечивая
            бесшовную работу всех компонентов.
          </p>

          <div className="mx-auto mt-6 flex justify-center">
            <img
              src={serviceFeatureIcons}
              alt="Иконки комплексных решений"
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
            Для управления контентом мы предлагаем гибкие решения: профессиональные CMS интеграции с
            популярными платформами или создание собственных систем управления. Особое внимание мы уделяем
            автоматизации — бесшовная интеграция с Telegram позволяет управлять заказами прямо из
            мессенджера.
          </p>
        </div>
      </section>

      {/* Block 5: Infrastructure */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">От идеи до успешного запуска</h2>

          <img
            src={infrastructureIllustration}
            alt="Домен → Хостинг → Запуск"
            className="mx-auto mt-10 w-full max-w-2xl rounded-xl"
          />

          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed text-left">
            <p>
              Мы сопровождаем вас на каждом этапе технического развёртывания проекта. Наша команда
              предоставляет профессиональную помощь с хостингом, подбирая оптимальные мощности под ваши
              задачи и объём трафика. Мы берём на себя полную установку на ваш сервер, обеспечивая
              правильную настройку окружения и безопасность данных.
            </p>
            <p>
              Мы предоставляем возможность приобрести доменное имя с историей для быстрого старта в SEO —
              такие домены уже имеют авторитет в глазах поисковых систем — или выбрать новое уникальное имя,
              которое идеально отразит суть вашего бренда.
            </p>
          </div>
        </div>
      </section>

      {/* Block 6: Pricing */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Прозрачные инвестиции в качество
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Каждый проект уникален, но мы ценим ваше время и предлагаем понятные стартовые условия.
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
            Готовы создать выдающийся проект?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Оставьте заявку, и мы обсудим, как современные технологии и искусственный интеллект могут решить
            задачи вашего бизнеса. Мы ответим в течение 24 часов.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input placeholder="Ваше имя" name="name" required className="bg-primary-foreground" />
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
              {loading ? "Отправка..." : "Начать сотрудничество"}
            </Button>
          </form>
        </div>
      </section>
      <ServiceInviteBanner
        storageKey="hw_webdev_invite_shown"
        source="webdev_invite_banner"
        track="website"
        icon={Rocket}
        title="Рассчитаем сайт под ваш проект"
        description={<>Ответьте на 15 коротких вопросов — узнайте <strong className="text-foreground">точную цену и срок</strong> разработки именно вашего сайта.</>}
        ctaLabel="Принять вызов"
        footnote="≈ 2 минуты · без обязательств"
      />
    </Layout>
  );
};

export default WebDevelopment;
