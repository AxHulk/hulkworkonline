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
import smmHero from "@/assets/smm_hero.png";
import smmDesign from "@/assets/smm_design.png";
import smmContentPlan from "@/assets/smm_content_plan.png";
import smmManagement from "@/assets/smm_management.png";
import smmLaunch from "@/assets/smm_launch.png";
import MarketingInviteBanner from "@/components/quiz/MarketingInviteBanner";
import QuizCTAButton from "@/components/quiz/QuizCTAButton";
import { useT } from "@/i18n/translations";

const PACKAGING_TEXT = {
  ru: [
    { title: "Оформление профиля", desc: "Создаём визуальную систему аккаунта: обложки, аватары, обложки актуального и единый стиль публикаций." },
    { title: "Дизайн-материалы", desc: "Подготавливаем шаблоны постов, stories и рекламных креативов под задачу бренда." },
    { title: "Позиционирование", desc: "Формируем понятный образ бренда, который легко считывается и запоминается аудиторией." },
    { title: "Упаковка под продажи", desc: "Соцсети становятся не просто витриной, а внятным каналом заявок и доверия." },
  ],
  en: [
    { title: "Profile branding", desc: "Visual system for the account: covers, avatars, highlight covers and a unified post style." },
    { title: "Design assets", desc: "Templates for posts, stories and ad creatives tailored to brand goals." },
    { title: "Positioning", desc: "A clear brand image that's easy to read and remember." },
    { title: "Sales-ready packaging", desc: "Social media becomes more than a showcase — a real channel for leads and trust." },
  ],
};
const PACKAGING_ICONS = [Palette, Paintbrush, Sparkles, Target];

const CONTENT_TEXT = {
  ru: [
    { title: "Контент-план", desc: "Строим последовательную сетку публикаций, где каждая тема работает на узнаваемость и конверсию." },
    { title: "Рубрики и сценарии", desc: "Продумываем экспертные, вовлекающие, продающие и репутационные форматы контента." },
    { title: "Тексты и смыслы", desc: "Пишем посты, которые удерживают внимание, объясняют ценность и подводят к действию." },
    { title: "Stories и short-form", desc: "Закладываем регулярные касания с аудиторией через короткие динамичные форматы." },
  ],
  en: [
    { title: "Content plan", desc: "A consistent posting schedule where every topic works for awareness and conversion." },
    { title: "Rubrics & scenarios", desc: "Expert, engaging, selling and reputation-building content formats." },
    { title: "Copy & meaning", desc: "Posts that hold attention, explain value and lead to action." },
    { title: "Stories & short-form", desc: "Regular audience touchpoints through short, dynamic formats." },
  ],
};
const CONTENT_ICONS = [CalendarRange, MessageCircleQuestion, PenSquare, PlaySquare];

const MANAGEMENT_TEXT = {
  ru: [
    { title: "Производство контента", desc: "Подготавливаем тексты, визуалы и материалы для стабильного присутствия бренда в соцсетях." },
    { title: "Публикация и ведение", desc: "Размещаем контент, сопровождаем активности и поддерживаем единый темп коммуникации." },
    { title: "Аналитика и рост", desc: "Отслеживаем охваты, вовлечение и динамику подписчиков, корректируя стратегию по данным." },
  ],
  en: [
    { title: "Content production", desc: "Copy, visuals and assets for a steady brand presence in social media." },
    { title: "Publishing & management", desc: "We post content, manage activity and keep a consistent communication pace." },
    { title: "Analytics & growth", desc: "Tracking reach, engagement and follower growth, adjusting strategy on data." },
  ],
};
const MANAGEMENT_ICONS = [PenSquare, Megaphone, ChartColumnIncreasing];

const PRICING_TEXT = {
  ru: [
    { label: "Запуск с упаковкой", value: "Быстрый старт для новых или неоформленных аккаунтов." },
    { label: "Долгосрочное ведение", value: "Системный рост бренда через регулярный контент и аналитику." },
    { label: "Индивидуальный расчёт", value: "Стоимость зависит от объёма контента, количества площадок и глубины сопровождения." },
  ],
  en: [
    { label: "Launch with branding", value: "Fast start for new or unbranded accounts." },
    { label: "Long-term management", value: "Systemic brand growth through regular content and analytics." },
    { label: "Custom quote", value: "Pricing depends on content volume, number of platforms and depth of support." },
  ],
};
const PRICING_ICONS = [ShieldCheck, Clock3, TrendingUp];

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
  const { lang } = useT();
  const isEn = lang === "en";
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const packagingItems = PACKAGING_TEXT[lang].map((it, i) => ({ ...it, icon: PACKAGING_ICONS[i] }));
  const contentItems = CONTENT_TEXT[lang].map((it, i) => ({ ...it, icon: CONTENT_ICONS[i] }));
  const managementItems = MANAGEMENT_TEXT[lang].map((it, i) => ({ ...it, icon: MANAGEMENT_ICONS[i] }));
  const pricingItems = PRICING_TEXT[lang].map((it, i) => ({ ...it, icon: PRICING_ICONS[i] }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      toast.error(isEn ? "Please accept the privacy policy to continue" : "Необходимо дать согласие на обработку персональных данных");
      return;
    }
    setConsentError(false);
    setLoading(true);
    logConsent("smm");
    setTimeout(() => {
      setLoading(false);
      toast.success(isEn ? "Request sent! We'll get back to you within 24 hours." : "Заявка отправлена! Мы свяжемся с вами в течение 24 часов.");
      (e.target as HTMLFormElement).reset();
      setConsent(false);
    }, 800);
  };

  return (
    <Layout>
      <SEO
        title={isEn ? "SMM — social media promotion · HulkWork Studio" : "SMM-продвижение в соцсетях — HulkWork Studio"}
        description={isEn
          ? "Social media promotion: content strategy, design, management, targeted ads. Growth in engagement and sales through social networks."
          : "SMM-продвижение в VK, Telegram, Дзен: контент-стратегия, дизайн, ведение, таргетированная реклама. Рост вовлечённости и продаж через социальные сети."}
        keywords={isEn ? "SMM, social media marketing, content marketing, Instagram, Telegram, VK" : "SMM, продвижение в соцсетях, ВКонтакте, Telegram, контент-маркетинг"}
        jsonLd={[
          serviceJsonLd,
          buildBreadcrumbJsonLd([
            { name: isEn ? "Services" : "Услуги", url: "/" },
            { name: isEn ? "SMM" : "SMM продвижение", url: "/services/smm" },
          ]),
        ]}
      />
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-20 md:py-28">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
              {isEn ? "SMM: turning social media into a channel of trust and sales" : "SMM-продвижение: превращаем соцсети в канал доверия и продаж"}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {isEn
                ? "We brand your accounts, create content, run your channels and build a systemic communication with the audience so social media works for awareness, loyalty and leads."
                : "Упаковываем бренд, создаём контент, ведём площадки и выстраиваем системную коммуникацию с аудиторией, чтобы соцсети работали на узнаваемость, лояльность и заявки."}
            </p>
            <Button size="lg" className="mt-8 font-heading font-semibold" asChild>
              <a href="#cta-form">{isEn ? "Discuss an SMM strategy" : "Обсудить SMM-стратегию"}</a>
            </Button>
            <div className="mt-4 flex justify-center md:justify-start">
              <QuizCTAButton
                source="smm_page_hero"
                track="marketing"
                label={isEn ? "Take the 3-min quiz" : "Пройти опрос за 3 минуты"}
                size="lg"
                variant="secondary"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <img src={smmHero} alt={isEn ? "SMM with social-media visuals and reactions" : "SMM продвижение с визуалом соцсетей и реакций"} className="w-full max-w-lg rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">{isEn ? "Branding that makes a brand visible" : "Упаковка, которая делает бренд заметным"}</h2>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
            <img src={smmDesign} alt={isEn ? "Profile design and branding for social media" : "Оформление и дизайн профиля для соцсетей"} className="w-full rounded-xl" />
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
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">{isEn ? "A content plan built for growth" : "Контент-план, который работает на рост"}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            {isEn
              ? "Instead of chaotic posting, we build a content system where every piece supports a shared brand goal."
              : "Вместо хаотичных публикаций мы строим контентную систему, где каждая единица поддерживает общую цель бренда."}
          </p>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
            <img src={smmContentPlan} alt={isEn ? "Content plan and rubrics for social media" : "Контент-план и контентные рубрики для соцсетей"} className="w-full rounded-xl" />
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
            <h2 className="font-heading text-2xl font-bold md:text-3xl">{isEn ? "Social-media management without chaos" : "Ведение и управление соцсетями без хаоса"}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {isEn
                ? "We handle the day-to-day: from preparing posts and scheduling to tracking effectiveness. Social media stops being chaotic and becomes a clear, managed system."
                : "Мы берём на себя регулярное ведение аккаунтов: от подготовки публикаций и очередности выхода до контроля эффективности. Соцсети перестают быть стихийным каналом и становятся понятной управляемой системой."}
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
            <img src={smmManagement} alt={isEn ? "Social-media management and analytics" : "Процесс ведения соцсетей и аналитики"} className="w-full max-w-xl rounded-xl" />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div className="flex justify-center md:order-2">
            <img src={smmLaunch} alt={isEn ? "Fast launch vs. systemic SMM growth" : "Быстрый запуск против системного роста в SMM"} className="w-full max-w-xl rounded-xl" />
          </div>
          <div className="md:order-1">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">{isEn ? "Fast launch or sustainable growth — picking the right scenario" : "Быстрый запуск или устойчивый рост — выбираем правильный сценарий"}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {isEn
                ? "Some projects need a fast start and account branding, others — long-term deep work. We pick a promotion model that fits your current stage, team resources and business goals."
                : "Для одних проектов важен быстрый старт и упаковка площадок, для других — глубокая работа на дистанции. Мы подбираем модель продвижения под ваш текущий этап, ресурс команды и цели бизнеса."}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {isEn
                ? "The result: not just posts, but a managed marketing system that scales with your brand."
                : "В результате вы получаете не просто публикации, а управляемую маркетинговую систему, которая масштабируется вместе с брендом."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">{isEn ? "Clear SMM support pricing" : "Понятная стоимость SMM-сопровождения"}</h2>
          <p className="mt-3 text-center text-muted-foreground">
            {isEn ? "We tailor the offer to scope of work, number of platforms and required production level." : "Формируем предложение под объём задач, количество площадок и нужный уровень продакшна."}
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
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">{isEn ? "Ready to build a strong social presence?" : "Готовы выстроить сильное присутствие в соцсетях?"}</h2>
          <p className="mt-3 text-primary-foreground/80">
            {isEn ? "Send a request — we'll discuss your brand, platforms, content format and put together a suitable promotion scenario." : "Оставьте заявку — обсудим ваш бренд, площадки, формат контента и соберём подходящий сценарий продвижения."}
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input placeholder={isEn ? "Your name" : "Ваше имя"} name="name" required className="bg-primary-foreground" />
            <Input placeholder={isEn ? "Project or account link" : "Ссылка на проект или аккаунт"} name="project" required className="bg-primary-foreground" />
            <Input placeholder={isEn ? "Email or Telegram" : "Email или Telegram"} name="contact" required className="bg-primary-foreground" />
            <Textarea placeholder={isEn ? "Briefly describe the task" : "Кратко опишите задачу"} name="description" required className="min-h-[110px] bg-primary-foreground" />
            <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
            <Button type="submit" size="lg" variant="secondary" className="w-full font-heading font-semibold" disabled={loading}>
              {loading ? (isEn ? "Sending..." : "Отправка...") : (isEn ? "Get an SMM strategy" : "Получить SMM-стратегию")}
            </Button>
          </form>
        </div>
      </section>
      <MarketingInviteBanner />
    </Layout>
  );
};

export default SmmPage;
