import { FormEvent, useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import {
  ExternalLink,
  Github,
  Rocket,
  Shield,
  Send,
  MessageCircle,
} from "lucide-react";

import portfolioHero from "@/assets/portfolio_hero.png";
import portfolioNew from "@/assets/portfolio_new.png";
import portfolioClassic from "@/assets/portfolio_classic.png";
import portfolioBot from "@/assets/portfolio_bot.png";
import portfolioSmm from "@/assets/portfolio_smm.png";

/* ---------- data ---------- */

const newProjects = [
  { name: "PayCross", desc: "Международное платёжное решение со сложной архитектурой безопасности", link: "paycross.tech" },
  { name: "HulkWork", desc: "Инновационная биржа фриланса нового поколения", link: "hulkwork.ru" },
  { name: "EventClick", desc: "Современный сайт агентства о путешествиях с удобной навигацией", link: "eventclick.ru" },
  { name: "Kvanteks", desc: "Масштабный магазин электроники с интеграцией складских баз", link: "kvanteks.ru" },
  { name: "Танец Души", desc: "Атмосферный проект: Прогулки по Питеру", link: "tanec-dushi.ru" },
  { name: "Акклиматизация", desc: "Портал для любителей путешествий по России", link: "akklimatizaciya.ru" },
];

const classicProjects = [
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
];

const smmProjects = [
  { name: "Timell", vk: "https://vk.ru/vk_timell", tg: "https://t.me/TG_Timell" },
  { name: "SeverClick", vk: "https://vk.ru/severclick", tg: "https://t.me/severclick" },
  { name: "MVP GameZone", vk: "https://vk.ru/mvpgamezone", tg: "" },
];

const serviceOptions = ["Сайт", "SEO", "ПФ", "SMM"];

/* ---------- component ---------- */

const PortfolioPage = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [site, setSite] = useState("");
  const [service, setService] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      toast.error("Пожалуйста, заполните имя и контакт для связи");
      return;
    }
    if (!consent) {
      setConsentError(true);
      toast.error("Необходимо дать согласие на обработку персональных данных");
      return;
    }
    setConsentError(false);
    logConsent("portfolio");
    toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setName(""); setContact(""); setSite(""); setService(""); setConsent(false);
  };

  return (
    <Layout>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-[#1A0A2E] py-20 md:py-28">
        <div className="container relative z-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white md:text-5xl leading-tight">
              Наша гордость.<br />Ваша уверенность.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/70 leading-relaxed">
              С 2017 года мы создаём цифровые продукты, которые не просто существуют в сети, а приносят реальную прибыль своим владельцам. В нашем портфолио — десятки успешных проектов: от элегантных визиток до сложнейших платёжных решений и инновационных бирж.
            </p>
          </div>
          <div className="flex justify-center">
            <img src={portfolioHero} alt="Портфолио HulkWork Studio" className="w-full max-w-md rounded-2xl" />
          </div>
        </div>
        {/* decorative glow */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      </section>

      {/* ===== Block 2: New projects 2025-2026 ===== */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
            <img src={portfolioNew} alt="Инновации 2025-2026" className="mx-auto w-full max-w-xs" />
            <div>
              <Badge variant="secondary" className="mb-3">2025 — 2026</Badge>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">Эпоха ИИ и сложных интеграций</h2>
              <p className="mt-3 text-muted-foreground">
                Последние годы стали временем технологического прорыва. Мы внедряем искусственный интеллект, создаём высоконагруженные международные сервисы и инновационные платформы.
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
                    <Badge variant="outline" className="mt-3 w-fit border-primary/30 text-primary"><Rocket className="mr-1 h-3 w-3" />Новый</Badge>
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
              <h2 className="font-heading text-2xl font-bold md:text-3xl">Проверенные временем решения</h2>
              <p className="mt-3 text-muted-foreground">
                Эти проекты работают годами, выдерживая проверку временем, обновлениями поисковых систем и растущим трафиком. От корпоративных сайтов до киберспортивных порталов.
              </p>
            </div>
            <img src={portfolioClassic} alt="Классические проекты" className="mx-auto w-full max-w-xs" />
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
            <img src={portfolioBot} alt="Open Source бот ПФ" className="mx-auto w-full max-w-md rounded-2xl" />
            <div>
              <Badge className="mb-3 bg-green-600/20 text-green-400 hover:bg-green-600/30">Open Source</Badge>
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                Бот поведенческих факторов: Наш код открыт
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Мы придерживаемся правила: <span className="font-semibold text-white">не бывает открытий без экспериментов</span>. Наша гордость — собственная разработка для эмуляции поведенческих факторов. Мы настолько уверены в её качестве и безопасности, что выложили ядро алгоритма в публичный доступ.
              </p>
              <p className="mt-3 text-white/60 text-sm">
                Если вы умеете сами управлять кодом — мы не запрещаем использование нашего программного обеспечения. Изучайте, тестируйте, убеждайтесь в нашей экспертности.
              </p>
              <a
                href="https://github.com/AxHulk/pf-bot-traffic"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex"
              >
                <Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black">
                  <Github className="mr-2 h-4 w-4" />
                  Открыть на GitHub
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
            <img src={portfolioSmm} alt="SMM кейсы" className="mx-auto w-full max-w-xs" />
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">Живые сообщества и лояльная аудитория</h2>
              <p className="mt-3 text-muted-foreground">
                Создание сайта — это только начало. Мы умеем собирать, удерживать и монетизировать аудиторию в социальных сетях.
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
                      <MessageCircle className="h-4 w-4" /> ВКонтакте
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
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Ваш проект должен быть в этом списке</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Мы показали вам, на что способны. Теперь ваша очередь сделать шаг навстречу технологиям, которые выведут ваш бизнес на новый уровень.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-md gap-4 text-left">
            <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email или Telegram для связи" value={contact} onChange={(e) => setContact(e.target.value)} />
            <Input placeholder="Ссылка на ваш текущий сайт (если есть)" value={site} onChange={(e) => setSite(e.target.value)} />
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Какая услуга вас интересует?</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <Button type="submit" size="lg" className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              Стать успешным кейсом
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioPage;
