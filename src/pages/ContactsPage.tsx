import { useState } from "react";
import { Copy, Check, Send, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import contactsHero from "@/assets/contacts_hero.png";
import contactsMessengers from "@/assets/contacts_messengers.png";
import contactsLegal from "@/assets/contacts_legal.png";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { logConsent } from "@/lib/consent";
import { toast } from "sonner";

/* ───── Hero ───── */
const HeroSection = () => (
  <section className="relative overflow-hidden bg-[#1A0A2E] py-20 md:py-28">
    <div className="container relative z-10 grid items-center gap-10 md:grid-cols-2">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white md:text-5xl leading-tight">
          Всегда на связи.<br />Всегда готовы.
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/70 leading-relaxed">
          Мы не прячемся за автоответчиками. Напишите прямо сейчас — и уже сегодня начнём создавать ваш шедевр.
        </p>
        <p className="mt-3 max-w-xl text-sm text-white/50 leading-relaxed">
          В мире цифровых технологий скорость решает всё. Команда HulkWork Studio работает без выходных и часовых поясов.
          У вас есть идея, вопрос или готовое техническое задание? Мы ответим, подскажем лучшее решение и немедленно приступим к работе.
        </p>
      </div>
      <div className="flex justify-center">
        <img src={contactsHero} alt="HulkWork Studio — всегда онлайн" className="w-full max-w-lg rounded-2xl" />
      </div>
    </div>
    <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
  </section>
);

/* ───── Messengers ───── */
const MessengersSection = () => (
  <section className="container mx-auto px-4 py-16 md:py-20">
    <div className="mb-10 text-center">
      <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Написать нам прямо сейчас</h2>
      <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
        Самый быстрый способ начать — написать напрямую. Мы отвечаем в мессенджерах в течение нескольких минут.
      </p>
    </div>

    <div className="mx-auto max-w-4xl">
      <img src={contactsMessengers} alt="Telegram и ВКонтакте" className="mx-auto mb-10 w-full max-w-xl rounded-2xl" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Telegram */}
        <div className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">Telegram</h3>
              <span className="flex items-center gap-1.5 text-xs text-green-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Сейчас онлайн
              </span>
            </div>
          </div>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
            Быстрее всего мы отвечаем именно здесь. Обсуждение проектов, быстрые вопросы, старт работы — всё начинается с одного сообщения.
          </p>
          <a href="https://t.me/MalHulk" target="_blank" rel="noopener noreferrer">
            <Button className="w-full">Написать в Telegram</Button>
          </a>
        </div>

        {/* VK */}
        <div className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">ВКонтакте</h3>
              <span className="flex items-center gap-1.5 text-xs text-green-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Отвечаем в течение часа
              </span>
            </div>
          </div>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
            Официальное сообщество студии. Здесь публикуются кейсы, новости и обновления. Свяжитесь с нами через личные сообщения.
          </p>
          <a href="https://vk.ru/visfursa" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full">Написать ВКонтакте</Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ───── Contact Form ───── */
const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      toast.error("Необходимо дать согласие на обработку персональных данных");
      return;
    }
    setConsentError(false);
    setLoading(true);
    logConsent("contacts_form");
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setConsent(false);
      setTimeout(() => setSubmitted(false), 4000);
    }, 800);
  };

  return (
    <section className="bg-secondary/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Начать проект</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Предпочитаете описать задачу подробно? Заполните короткую форму — мы свяжемся с вами в течение нескольких часов.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl space-y-5">
          <input
            type="text"
            required
            placeholder="Как вас зовут?"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="text"
            required
            placeholder="@username или email@mail.ru"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <textarea
            rows={4}
            placeholder="Что будем создавать? Расскажите о проекте..."
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
          <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
          <Button type="submit" className="w-full" size="lg" disabled={loading || submitted}>
            {submitted ? (
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                Получили! Скоро ответим 🚀
              </span>
            ) : loading ? "Отправляем…" : "Отправить заявку"}
          </Button>
        </form>
      </div>
    </section>
  );
};

/* ───── Legal / Requisites ───── */
const CopyField = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-0">
      <div className="min-w-0">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-medium text-foreground">{value}</span>
      </div>
      <button onClick={copy} className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" title="Скопировать">
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
};

const LegalSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Юридическая информация</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Мы работаем официально, прозрачно и предоставляем все необходимые закрывающие документы для вашего бизнеса: договор, акт выполненных работ, счёт-фактуру.
            </p>
            <button
              onClick={() => setOpen(!open)}
              className="mt-5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              {open ? "Скрыть реквизиты ▲" : "Показать реквизиты ▼"}
            </button>
          </div>
          <div className="flex justify-center">
            <img src={contactsLegal} alt="Юридическая информация" className="w-full max-w-sm rounded-2xl" />
          </div>
        </div>

        {open && (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-heading text-lg font-bold text-foreground">Реквизиты ИП</h3>
              <CopyField label="Наименование" value="ИП Фурса Наталия Николаевна" />
              <CopyField label="ИНН" value="910201714510" />
              <CopyField label="ОГРНИП" value="322911200005052" />
              <CopyField label="Юридический адрес" value="г. Симферополь, ул. Кечкеметская д. 94-А, оф. 11" />
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-heading text-lg font-bold text-foreground">Банковские реквизиты</h3>
              <CopyField label="Банк" value="ВТБ (ПАО)" />
              <CopyField label="Расчётный счёт" value="40802810324780002560" />
              <CopyField label="Корреспондентский счёт" value="30101810145250000411" />
              <CopyField label="БИК" value="044525411" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ───── Page ───── */
const ContactsPage = () => (
  <Layout>
    <SEO
      title="Контакты HulkWork Studio — связаться с нами"
      description="Свяжитесь с HulkWork Studio: телефон, email, мессенджеры, форма обратной связи. Адрес: г. Симферополь, ул. Кечкеметская, 94-А. Отвечаем в течение часа."
      jsonLd={buildBreadcrumbJsonLd([{ name: "Контакты", url: "/contacts" }])}
    />
    <HeroSection />
    <MessengersSection />
    <ContactForm />
    <LegalSection />
  </Layout>
);

export default ContactsPage;
