import { FormEvent, useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { toast } from "sonner";
import {
  ExternalLink,
  Github,
  Rocket,
  Shield,
  Send,
  MessageCircle,
} from "lucide-react";
import { useT } from "@/i18n/translations";

import portfolioHero from "@/assets/portfolio_hero.png";
import portfolioNew from "@/assets/portfolio_new.png";
import portfolioClassic from "@/assets/portfolio_classic.png";
import portfolioBot from "@/assets/portfolio_bot.png";
import portfolioSmm from "@/assets/portfolio_smm.png";

/* ---------- data ---------- */

const NEW_PROJECTS = {
  ru: [
    { name: "PayCross", desc: "Международное платёжное решение со сложной архитектурой безопасности", link: "paycross.tech" },
    { name: "HulkWork", desc: "Инновационная биржа фриланса нового поколения", link: "hulkwork.ru" },
    { name: "EventClick", desc: "Современный сайт агентства о путешествиях с удобной навигацией", link: "eventclick.ru" },
    { name: "Kvanteks", desc: "Масштабный магазин электроники с интеграцией складских баз", link: "kvanteks.ru" },
    { name: "Танец Души", desc: "Атмосферный проект: Прогулки по Питеру", link: "tanec-dushi.ru" },
    { name: "Акклиматизация", desc: "Портал для любителей путешествий по России", link: "akklimatizaciya.ru" },
  ],
  en: [
    { name: "PayCross", desc: "International payment solution with a complex security architecture", link: "paycross.tech" },
    { name: "HulkWork", desc: "Next-generation freelance marketplace", link: "hulkwork.ru" },
    { name: "EventClick", desc: "Modern travel agency website with convenient navigation", link: "eventclick.ru" },
    { name: "Kvanteks", desc: "Large-scale electronics store with warehouse integration", link: "kvanteks.ru" },
    { name: "Tanec Dushi", desc: "Atmospheric project: walks around St. Petersburg", link: "tanec-dushi.ru" },
    { name: "Akklimatizaciya", desc: "Portal for travelers across Russia", link: "akklimatizaciya.ru" },
  ],
};

const CLASSIC_PROJECTS = {
  ru: [
    { name: "Good-Vill", desc: "Агентство продажи домов с элегантным премиальным дизайном", link: "good-vill.ru" },
    { name: "G1Fit", desc: "Современный фитнес-центр с онлайн записью и расписанием", link: "g1fit.ru" },
    { name: "P-Park", desc: "Элитный отель с интегрированной системой бронирования", link: "ppark.ru" },
    { name: "Sheer", desc: "Корпоративный сайт профессиональной веб-студии", link: "sheer.ru" },
    { name: "Стокманн (Симферополь)", desc: "Магазин одежды с обширным структурированным каталогом", link: "simferopol.stockmann.ru" },
    { name: "FoxRent", desc: "Удобный и быстрый сервис аренды автомобилей", link: "foxrent.site" },
    { name: "CyberX Center", desc: "Стильный сайт современного компьютерного клуба", link: "cyberx-center.ru" },
    { name: "Darvin Eda", desc: "Высоконагруженный сервис доставки еды", link: "darvin-eda.ru" },
    { name: "SuperPet", desc: "Магазин еды для животных со сложным калькулятором рациона", link: "superpet.ru/calculator/" },
    { name: "ФКС РК", desc: "Официальный сайт киберспортивной федерации", link: "фкс-рк.рф" },
  ],
  en: [
    { name: "Good-Vill", desc: "House-sales agency with an elegant premium design", link: "good-vill.ru" },
    { name: "G1Fit", desc: "Modern fitness center with online booking and scheduling", link: "g1fit.ru" },
    { name: "P-Park", desc: "Premium hotel with integrated booking system", link: "ppark.ru" },
    { name: "Sheer", desc: "Corporate website for a professional web studio", link: "sheer.ru" },
    { name: "Stockmann (Simferopol)", desc: "Apparel store with a vast structured catalog", link: "simferopol.stockmann.ru" },
    { name: "FoxRent", desc: "Convenient and fast car-rental service", link: "foxrent.site" },
    { name: "CyberX Center", desc: "Stylish website for a modern computer club", link: "cyberx-center.ru" },
    { name: "Darvin Eda", desc: "High-load food delivery service", link: "darvin-eda.ru" },
    { name: "SuperPet", desc: "Pet food store with a complex meal calculator", link: "superpet.ru/calculator/" },
    { name: "FKS RK", desc: "Official esports federation website", link: "фкс-рк.рф" },
  ],
};

const smmProjects = [
  { name: "Timell", vk: "https://vk.ru/vk_timell", tg: "https://t.me/TG_Timell" },
  { name: "SeverClick", vk: "https://vk.ru/severclick", tg: "https://t.me/severclick" },
  { name: "MVP GameZone", vk: "https://vk.ru/mvpgamezone", tg: "" },
];

/* ---------- component ---------- */

const PortfolioPage = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  const newProjects = NEW_PROJECTS[lang];
  const classicProjects = CLASSIC_PROJECTS[lang];
  const serviceOptions = isEn ? ["Website", "SEO", "Behavioral", "SMM"] : ["Сайт", "SEO", "ПФ", "SMM"];
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [site, setSite] = useState("");
  const [service, setService] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      toast.error(isEn ? "Please fill in your name and contact" : "Пожалуйста, заполните имя и контакт для связи");
      return;
    }
    if (!consent) {
      setConsentError(true);
      toast.error(isEn ? "Please accept the privacy policy to continue" : "Необходимо дать согласие на обработку персональных данных");
      return;
    }
    setConsentError(false);
    logConsent("portfolio");
    toast.success(isEn ? "Thank you! We'll be in touch shortly." : "Спасибо! Мы свяжемся с вами в ближайшее время.");
    setName(""); setContact(""); setSite(""); setService(""); setConsent(false);
  };

  return (
    <Layout>
      <SEO
        title={isEn ? "Portfolio — HulkWork Studio works" : "Портфолио HulkWork Studio — наши работы"}
        description={isEn
          ? "Cases and projects by HulkWork Studio: websites, e-commerce, landings, SMM projects and payment systems. Links to live domains."
          : "Кейсы и реализованные проекты HulkWork Studio: сайты, интернет-магазины, лендинги, SMM-проекты и платёжные системы. Ссылки на работающие домены."}
        jsonLd={buildBreadcrumbJsonLd([{ name: isEn ? "Portfolio" : "Портфолио", url: "/portfolio" }])}
      />
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-[#1A0A2E] py-20 md:py-28">
        <div className="container relative z-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white md:text-5xl leading-tight">
              {isEn ? <>Our pride.<br />Your confidence.</> : <>Наша гордость.<br />Ваша уверенность.</>}
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/70 leading-relaxed">
              {isEn
                ? "Since 2017 we've been building digital products that don't just exist online but bring real profit to their owners. Our portfolio: dozens of successful projects from elegant business cards to complex payment solutions and innovative marketplaces."
                : "С 2017 года мы создаём цифровые продукты, которые не просто существуют в сети, а приносят реальную прибыль своим владельцам. В нашем портфолио — десятки успешных проектов: от элегантных визиток до сложнейших платёжных решений и инновационных бирж."}
            </p>
          </div>
          <div className="flex justify-center">
            <img src={portfolioHero} alt={isEn ? "HulkWork Studio portfolio" : "Портфолио HulkWork Studio"} className="w-full max-w-md rounded-2xl" />
          </div>
        </div>
        {/* decorative glow */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      </section>

      {/* ===== Block 2: New projects 2025-2026 ===== */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
            <img src={portfolioNew} alt={isEn ? "Innovations 2025-2026" : "Инновации 2025-2026"} className="mx-auto w-full max-w-xs" />
            <div>
              <Badge variant="secondary" className="mb-3">2025 — 2026</Badge>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">{isEn ? "The era of AI and complex integrations" : "Эпоха ИИ и сложных интеграций"}</h2>
              <p className="mt-3 text-muted-foreground">
                {isEn
                  ? "Recent years have been a time of technological breakthroughs. We integrate AI, build high-load international services and innovative platforms."
                  : "Последние годы стали временем технологического прорыва. Мы внедряем искусственный интеллект, создаём высоконагруженные международные сервисы и инновационные платформы."}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newProjects.map((p) => (
              <a
                key={p.name}
                href={p.link ? `https://${p.link}` : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="group flex h-full flex-col transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold">{p.name}</h3>
                      {p.link && (
                        <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                      )}
                    </div>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                    <Badge variant="outline" className="mt-3 w-fit border-primary/30 text-primary"><Rocket className="mr-1 h-3 w-3" />{isEn ? "New" : "Новый"}</Badge>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Block 3: Classic projects 2017-2024 ===== */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-[2fr_1fr]">
            <div>
              <Badge variant="secondary" className="mb-3">2017 — 2024</Badge>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">{isEn ? "Solutions proven by time" : "Проверенные временем решения"}</h2>
              <p className="mt-3 text-muted-foreground">
                {isEn
                  ? "These projects have run for years, surviving time, search-engine updates and growing traffic. From corporate sites to esports portals."
                  : "Эти проекты работают годами, выдерживая проверку временем, обновлениями поисковых систем и растущим трафиком. От корпоративных сайтов до киберспортивных порталов."}
              </p>
            </div>
            <img src={portfolioClassic} alt={isEn ? "Classic projects" : "Классические проекты"} className="mx-auto w-full max-w-xs" />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classicProjects.map((p) => (
              <Card key={p.name} className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold">{p.name}</h3>
                    {p.link && (
                      <a href={`https://${p.link}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Block 4: Open Source Bot ===== */}
      <section className="relative overflow-hidden bg-[#1A0A2E] py-16 md:py-24">
        <div className="container relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <img src={portfolioBot} alt={isEn ? "Open Source behavioral bot" : "Open Source бот ПФ"} className="mx-auto w-full max-w-md rounded-2xl" />
            <div>
              <Badge className="mb-3 bg-green-600/20 text-green-400 hover:bg-green-600/30">Open Source</Badge>
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                {isEn ? "Behavioral-factor bot: our code is open" : "Бот поведенческих факторов: Наш код открыт"}
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                {isEn
                  ? <>We follow a rule: <span className="font-semibold text-white">no discoveries without experiments</span>. Our pride is the in-house tech for behavioral-factor emulation. We're so confident in its quality and safety that we published the algorithm core in the open.</>
                  : <>Мы придерживаемся правила: <span className="font-semibold text-white">не бывает открытий без экспериментов</span>. Наша гордость — собственная разработка для эмуляции поведенческих факторов. Мы настолько уверены в её качестве и безопасности, что выложили ядро алгоритма в публичный доступ.</>}
              </p>
              <p className="mt-3 text-white/60 text-sm">
                {isEn
                  ? "If you can manage the code yourself — we don't forbid using our software. Study it, test it, see our expertise."
                  : "Если вы умеете сами управлять кодом — мы не запрещаем использование нашего программного обеспечения. Изучайте, тестируйте, убеждайтесь в нашей экспертности."}
              </p>
              <a
                href="https://github.com/AxHulk/pf-bot-traffic"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex"
              >
                <Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black">
                  <Github className="mr-2 h-4 w-4" />
                  {isEn ? "Open on GitHub" : "Открыть на GitHub"}
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      </section>

      {/* ===== Block 5: SMM ===== */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
            <img src={portfolioSmm} alt={isEn ? "SMM cases" : "SMM кейсы"} className="mx-auto w-full max-w-xs" />
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">{isEn ? "Living communities and loyal audiences" : "Живые сообщества и лояльная аудитория"}</h2>
              <p className="mt-3 text-muted-foreground">
                {isEn
                  ? "Building a website is only the start. We know how to gather, retain and monetize audiences in social media."
                  : "Создание сайта — это только начало. Мы умеем собирать, удерживать и монетизировать аудиторию в социальных сетях."}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {smmProjects.map((p) => (
              <Card key={p.name} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-5">
                  <h3 className="font-heading text-lg font-semibold">{p.name}</h3>
                  <div className="mt-3 flex flex-col gap-2">
                    <a href={p.vk} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                      <MessageCircle className="h-4 w-4" /> {isEn ? "VK" : "ВКонтакте"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {p.tg && (
                      <a href={p.tg} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                        <Send className="h-4 w-4" /> Telegram
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Block 6: CTA ===== */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">{isEn ? "Your project belongs on this list" : "Ваш проект должен быть в этом списке"}</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            {isEn
              ? "We've shown what we're capable of. Now it's your turn to step toward technology that takes your business to the next level."
              : "Мы показали вам, на что способны. Теперь ваша очередь сделать шаг навстречу технологиям, которые выведут ваш бизнес на новый уровень."}
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-md gap-4 text-left">
            <Input placeholder={isEn ? "Your name" : "Ваше имя"} value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder={isEn ? "Email or Telegram" : "Email или Telegram для связи"} value={contact} onChange={(e) => setContact(e.target.value)} />
            <Input placeholder={isEn ? "Link to your current site (if any)" : "Ссылка на ваш текущий сайт (если есть)"} value={site} onChange={(e) => setSite(e.target.value)} />
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">{isEn ? "Which service interests you?" : "Какая услуга вас интересует?"}</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
            <Button type="submit" size="lg" className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              {isEn ? "Become a success case" : "Стать успешным кейсом"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioPage;
