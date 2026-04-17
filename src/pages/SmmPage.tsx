import { FormEvent, useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import {
  Paintbrush,
  CalendarRange,
  ChartColumnIncreasing,
  Megaphone,
  MessageCircleQuestion,
  Palette,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  PenSquare,
  PlaySquare,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import smmHero from "@/assets/smm_hero.webp";
import smmDesign from "@/assets/smm_design.webp";
import smmContentPlan from "@/assets/smm_content_plan.webp";
import smmManagement from "@/assets/smm_management.webp";
import smmLaunch from "@/assets/smm_launch.webp";

const packagingItems = [
  {
    icon: Palette,
    title: "Оформление профиля",
    desc: "Создаём визуальную систему аккаунта: обложки, аватары, обложки актуального и единый стиль публикаций.",
  },
  {
    icon: Paintbrush,
    title: "Дизайн-материалы",
    desc: "Подготавливаем шаблоны постов, stories и рекламных креативов под задачу бренда.",
  },
  {
    icon: Sparkles,
    title: "Позиционирование",
    desc: "Формируем понятный образ бренда, который легко считывается и запоминается аудиторией.",
  },
  {
    icon: Target,
    title: "Упаковка под продажи",
    desc: "Соцсети становятся не просто витриной, а внятным каналом заявок и доверия.",
  },
];

const contentItems = [
  {
    icon: CalendarRange,
    title: "Контент-план",
    desc: "Строим последовательную сетку публикаций, где каждая тема работает на узнаваемость и конверсию.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Рубрики и сценарии",
    desc: "Продумываем экспертные, вовлекающие, продающие и репутационные форматы контента.",
  },
  {
    icon: PenSquare,
    title: "Тексты и смыслы",
    desc: "Пишем посты, которые удерживают внимание, объясняют ценность и подводят к действию.",
  },
  {
    icon: PlaySquare,
    title: "Stories и short-form",
    desc: "Закладываем регулярные касания с аудиторией через короткие динамичные форматы.",
  },
];

const managementItems = [
  {
    icon: PenSquare,
    title: "Производство контента",
    desc: "Подготавливаем тексты, визуалы и материалы для стабильного присутствия бренда в соцсетях.",
  },
  {
    icon: Megaphone,
    title: "Публикация и ведение",
    desc: "Размещаем контент, сопровождаем активности и поддерживаем единый темп коммуникации.",
  },
  {
    icon: ChartColumnIncreasing,
    title: "Аналитика и рост",
    desc: "Отслеживаем охваты, вовлечение и динамику подписчиков, корректируя стратегию по данным.",
  },
];

const pricingItems = [
  {
    icon: ShieldCheck,
    label: "Запуск с упаковкой",
    value: "Быстрый старт для новых или неоформленных аккаунтов.",
  },
  {
    icon: Clock3,
    label: "Долгосрочное ведение",
    value: "Системный рост бренда через регулярный контент и аналитику.",
  },
  {
    icon: TrendingUp,
    label: "Индивидуальный расчёт",
    value: "Стоимость зависит от объёма контента, количества площадок и глубины сопровождения.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "SMM продвижение в социальных сетях",
  provider: { "@type": "Organization", name: "HulkWork Studio", url: SITE_URL },
  areaServed: "RU",
  url: `${SITE_URL}/services/smm`,
  description:
    "SMM-продвижение в VK, Telegram, Дзен: контент-стратегия, дизайн, ведение, таргетированная реклама.",
};

const SmmPage = () => {
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
    logConsent("smm");
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
        title="SMM-продвижение в соцсетях — HulkWork Studio"
        description="SMM-продвижение в VK, Telegram, Дзен: контент-стратегия, дизайн, ведение, таргетированная реклама. Рост вовлечённости и продаж через социальные сети."
        keywords="SMM, продвижение в соцсетях, ВКонтакте, Telegram, контент-маркетинг"
        jsonLd={[
          serviceJsonLd,
          buildBreadcrumbJsonLd([
            { name: "Услуги", url: "/" },
            { name: "SMM продвижение", url: "/services/smm" },
          ]),
        ]}
      />
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-20 md:py-28">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              SMM-продвижение: превращаем соцсети в канал доверия и продаж
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Упаковываем бренд, создаём контент, ведём площадки и выстраиваем системную коммуникацию с аудиторией,
              чтобы соцсети работали на узнаваемость, лояльность и заявки.
            </p>
            <Button size="lg" className="mt-8 font-heading font-semibold" asChild>
              <a href="#cta-form">Обсудить SMM-стратегию</a>
            </Button>
          </div>
          <div className="flex justify-center">
            <img src={smmHero} alt="SMM продвижение с визуалом соцсетей и реакций" className="w-full max-w-lg rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Упаковка, которая делает бренд заметным</h2>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
            <img src={smmDesign} alt="Оформление и дизайн профиля для соцсетей" className="w-full rounded-xl" />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              {packagingItems.map((item) => (
                <Card key={item.title} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Контент-план, который работает на рост</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Вместо хаотичных публикаций мы строим контентную систему, где каждая единица поддерживает общую цель бренда.
          </p>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
            <img src={smmContentPlan} alt="Контент-план и контентные рубрики для соцсетей" className="w-full rounded-xl" />
            <div className="grid gap-4">
              {contentItems.map((item) => (
                <Card key={item.title} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Ведение и управление соцсетями без хаоса</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Мы берём на себя регулярное ведение аккаунтов: от подготовки публикаций и очередности выхода до контроля
              эффективности. Соцсети перестают быть стихийным каналом и становятся понятной управляемой системой.
            </p>
            <div className="mt-8 grid gap-4">
              {managementItems.map((item) => (
                <Card key={item.title} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold">{item.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <img src={smmManagement} alt="Процесс ведения соцсетей и аналитики" className="w-full max-w-xl rounded-xl" />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="flex justify-center md:order-2">
            <img src={smmLaunch} alt="Быстрый запуск против системного роста в SMM" className="w-full max-w-xl rounded-xl" />
          </div>
          <div className="md:order-1">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Быстрый запуск или устойчивый рост — выбираем правильный сценарий</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Для одних проектов важен быстрый старт и упаковка площадок, для других — глубокая работа на дистанции.
              Мы подбираем модель продвижения под ваш текущий этап, ресурс команды и цели бизнеса.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              В результате вы получаете не просто публикации, а управляемую маркетинговую систему, которая масштабируется
              вместе с брендом.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">Понятная стоимость SMM-сопровождения</h2>
          <p className="mt-3 text-center text-muted-foreground">
            Формируем предложение под объём задач, количество площадок и нужный уровень продакшна.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border bg-card">
            {pricingItems.map((item, index) => (
              <div key={item.label} className={`flex items-center gap-4 px-5 py-4 ${index !== pricingItems.length - 1 ? "border-b" : ""}`}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-heading text-sm font-semibold">{item.label}</span>
                  <p className="text-xs text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta-form" className="bg-primary py-16 md:py-24">
        <div className="container max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">Готовы выстроить сильное присутствие в соцсетях?</h2>
          <p className="mt-3 text-primary-foreground/80">
            Оставьте заявку — обсудим ваш бренд, площадки, формат контента и соберём подходящий сценарий продвижения.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input placeholder="Ваше имя" name="name" required className="bg-primary-foreground" />
            <Input placeholder="Ссылка на проект или аккаунт" name="project" required className="bg-primary-foreground" />
            <Input placeholder="Email или Telegram" name="contact" required className="bg-primary-foreground" />
            <Textarea placeholder="Кратко опишите задачу" name="description" required className="min-h-[110px] bg-primary-foreground" />
            <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
            <Button type="submit" size="lg" variant="secondary" className="w-full font-heading font-semibold" disabled={loading}>
              {loading ? "Отправка..." : "Получить SMM-стратегию"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default SmmPage;
