import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles, CheckCircle2, X, AlertCircle, SkipForward } from "lucide-react";
import { toast } from "sonner";
import { useQuiz } from "./QuizContext";
import { supabase } from "@/integrations/supabase/client";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { sendClientConfirmation } from "@/lib/clientEmail";
import { logConsent } from "@/lib/consent";
import { useLanguage } from "@/i18n/LanguageContext";

type Goal = "sales_flagship" | "new_region" | "brand_awareness" | "beat_competitor" | "other";
type ContentParticipation = "expert" | "writer" | "media" | "no";
type DevSupport = "have" | "turnkey" | "";
type Flexibility = "yes" | "no" | "discuss" | "";
type Pace = "sprint" | "marathon" | "test" | "";
type Budget = "lt50" | "50_100" | "100_300" | "gt300" | "";
type Turbo = "yes" | "no" | "discuss" | "";
type Channel = "telegram" | "whatsapp" | "vk" | "email";

interface UrlEntry { url: string }
interface KeywordEntry { value: string }

interface SeoState {
  siteUrl: string;
  goal: Goal | ""; goalOther: string;
  competitors: UrlEntry[]; competitorsSkipped: boolean;
  keywords: KeywordEntry[];
  prevExperience: string;
  contentParticipation: ContentParticipation[];
  devSupport: DevSupport;
  flexibility: Flexibility;
  pace: Pace;
  budget: Budget;
  turbo: Turbo;
  contactName: string; channel: Channel | ""; channelValue: string;
}

const initialState: SeoState = {
  siteUrl: "",
  goal: "", goalOther: "",
  competitors: [{ url: "" }], competitorsSkipped: false,
  keywords: [{ value: "" }],
  prevExperience: "",
  contentParticipation: [],
  devSupport: "", flexibility: "", pace: "", budget: "", turbo: "",
  contactName: "", channel: "", channelValue: "",
};

const goalLabelsRu: Record<Goal, string> = {
  sales_flagship: "Увеличить продажи флагманского продукта",
  new_region: "Выйти в новый регион",
  brand_awareness: "Повысить узнаваемость бренда",
  beat_competitor: "Обойти конкретного конкурента",
  other: "Другое",
};
const goalLabelsEn: Record<Goal, string> = {
  sales_flagship: "Increase sales of the flagship product",
  new_region: "Enter a new region",
  brand_awareness: "Increase brand awareness",
  beat_competitor: "Outrank a specific competitor",
  other: "Other",
};

const contentLabelsRu: Record<ContentParticipation, string> = {
  expert: "Давать экспертные комментарии",
  writer: "Писать статьи",
  media: "Предоставлять фото/видео продукта",
  no: "Нет",
};
const contentLabelsEn: Record<ContentParticipation, string> = {
  expert: "Provide expert commentary",
  writer: "Write articles",
  media: "Provide product photos/videos",
  no: "No",
};

type PaceCard = { title: string; desc: string };
const paceLabelsRu: Record<Exclude<Pace, "">, PaceCard> = {
  sprint: { title: "Агрессивный рост (Спринт)", desc: "Максимальное вложение ресурсов для быстрого захвата доли рынка. Подходит для амбициозных целей и высококонкурентных ниш." },
  marathon: { title: "Планомерное развитие (Марафон)", desc: "Постепенный, стабильный рост с фокусом на окупаемость каждого этапа. Подходит для средних ниш или ограниченных ресурсов." },
  test: { title: "Тестовый формат", desc: "Начать с малого (например, с одного раздела), посмотреть на результаты и масштабировать." },
};
const paceLabelsEn: Record<Exclude<Pace, "">, PaceCard> = {
  sprint: { title: "Aggressive growth (Sprint)", desc: "Maximum resource investment to quickly capture market share. Suits ambitious goals and highly competitive niches." },
  marathon: { title: "Steady development (Marathon)", desc: "Gradual, stable growth focused on the payback of each stage. Suits mid-tier niches or limited resources." },
  test: { title: "Pilot format", desc: "Start small (e.g. with one section), look at the results, and scale." },
};

const budgetLabelsRu: Record<Exclude<Budget, "">, string> = {
  lt50: "До 50 000 ₽",
  "50_100": "50 000 – 100 000 ₽",
  "100_300": "100 000 – 300 000 ₽",
  gt300: "Более 300 000 ₽ (готов обсуждать индивидуальные условия)",
};
const budgetLabelsEn: Record<Exclude<Budget, "">, string> = {
  lt50: "Up to $600",
  "50_100": "$600 – $1,200",
  "100_300": "$1,200 – $3,500",
  gt300: "Over $3,500 (open to custom terms)",
};

const channelMaskRu: Record<Channel, { placeholder: string; label: string }> = {
  telegram: { placeholder: "@username или +7 999 123-45-67", label: "Telegram" },
  whatsapp: { placeholder: "+7 999 123-45-67", label: "WhatsApp" },
  vk: { placeholder: "https://vk.com/username", label: "ВКонтакте" },
  email: { placeholder: "name@example.com", label: "Email" },
};
const channelMaskEn: Record<Channel, { placeholder: string; label: string }> = {
  telegram: { placeholder: "@username or phone", label: "Telegram" },
  whatsapp: { placeholder: "+1 555 123-4567", label: "WhatsApp" },
  vk: { placeholder: "https://vk.com/username", label: "VK" },
  email: { placeholder: "name@example.com", label: "Email" },
};

const normalizeUrl = (raw: string): string => {
  const v = (raw || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return "https://" + v.replace(/^\/+/, "");
};

const TOTAL_STEPS = 12;

const SeoQuizDialog = () => {
  const { open, closeQuiz, source, track } = useQuiz();
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const isOpen = open && track === "seo";

  const goalLabels = isEn ? goalLabelsEn : goalLabelsRu;
  const contentLabels = isEn ? contentLabelsEn : contentLabelsRu;
  const paceLabels = isEn ? paceLabelsEn : paceLabelsRu;
  const budgetLabels = isEn ? budgetLabelsEn : budgetLabelsRu;
  const channelMask = isEn ? channelMaskEn : channelMaskRu;

  const contactSchemas: Record<Channel, z.ZodTypeAny> = {
    telegram: z.string().trim().min(3, isEn ? "Enter Telegram (@username or phone)" : "Укажите Telegram (@username или номер телефона)").max(80)
      .refine((v) => /^@?[a-zA-Z0-9_]{4,32}$/.test(v) || /^\+?\d[\d\s\-()]{7,20}$/.test(v),
        isEn ? "Enter @username or phone in international format" : "Введите @username или номер в формате +7…"),
    whatsapp: z.string().trim().min(7, isEn ? "Enter WhatsApp number" : "Укажите номер WhatsApp").max(30)
      .refine((v) => /^\+?\d[\d\s\-()]{7,20}$/.test(v), isEn ? "Phone in international format" : "Номер в формате +7 999 123-45-67"),
    vk: z.string().trim().min(3, isEn ? "Enter VK link or short name" : "Укажите ссылку или короткое имя ВК").max(150)
      .refine((v) => /vk\.com\//i.test(v) || /^[a-zA-Z0-9_.]{3,}$/.test(v),
        isEn ? "Link like https://vk.com/username or your ID" : "Ссылка вида https://vk.com/username или ваш ID"),
    email: z.string().trim().email(isEn ? "Enter a valid email" : "Введите корректный email").max(200),
  };

  const [step, setStep] = useState(1);
  const [state, setState] = useState<SeoState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const reset = () => {
    setStep(1); setState(initialState); setDone(false);
    setConsent(false); setConsentError(false); setStepError(null);
  };
  const handleClose = () => { closeQuiz(); setTimeout(reset, 300); };

  const update = <K extends keyof SeoState>(key: K, value: SeoState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    if (stepError) setStepError(null);
  };

  const T = {
    chooseOption: isEn ? "Choose an option." : "Выберите вариант.",
    needConsent: isEn ? "Consent to personal data processing is required." : "Необходимо согласие на обработку персональных данных.",
  };

  const validateStep = (): string | null => {
    switch (step) {
      case 1: {
        const v = state.siteUrl.trim();
        if (v.length < 4) return isEn ? "Paste a link to your website." : "Вставьте ссылку на ваш сайт.";
        const norm = normalizeUrl(v);
        try {
          const u = new URL(norm);
          if (!u.hostname.includes(".")) return isEn ? "The link looks invalid." : "Похоже, ссылка введена некорректно.";
        } catch { return isEn ? "The link looks invalid." : "Похоже, ссылка введена некорректно."; }
        return null;
      }
      case 2:
        if (!state.goal) return isEn ? "Choose the main business goal." : "Выберите главную бизнес-задачу.";
        if (state.goal === "other" && state.goalOther.trim().length < 3) return isEn ? "Describe your goal in \"Other\"." : "Опишите вашу задачу в поле «Другое».";
        return null;
      case 3: return null;
      case 4:
        if (!state.keywords.some((k) => k.value.trim().length >= 2))
          return isEn ? "Add at least one key query or topic." : "Добавьте хотя бы один ключевой запрос или направление.";
        return null;
      case 5: return null;
      case 6:
        if (state.contentParticipation.length === 0)
          return isEn ? "Choose at least one option (or \"No\")." : "Выберите хотя бы один вариант (или «Нет»).";
        return null;
      case 7: if (!state.devSupport) return T.chooseOption; return null;
      case 8: if (!state.flexibility) return T.chooseOption; return null;
      case 9: if (!state.pace) return isEn ? "Choose a suitable work pace." : "Выберите подходящий темп работы."; return null;
      case 10: if (!state.budget) return isEn ? "Choose an approximate budget." : "Выберите ориентировочный бюджет."; return null;
      case 11: if (!state.turbo) return T.chooseOption; return null;
      case 12: {
        if (state.contactName.trim().length < 2) return isEn ? "Enter your name." : "Укажите ваше имя.";
        if (!state.channel) return isEn ? "Choose a contact channel." : "Выберите удобный канал связи.";
        const schema = contactSchemas[state.channel];
        const r = schema.safeParse(state.channelValue);
        if (!r.success) return r.error.issues[0]?.message || (isEn ? "Check contact details." : "Проверьте контактные данные.");
        if (!consent) { setConsentError(true); return T.needConsent; }
        return null;
      }
      default: return null;
    }
  };

  const goNext = () => {
    const err = validateStep();
    if (err) { setStepError(err); toast.error(err); return; }
    setStepError(null);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };
  const goPrev = () => { setStepError(null); setStep((s) => Math.max(s - 1, 1)); };

  const skipStep = () => {
    if (step === 3) {
      setState((s) => ({ ...s, competitorsSkipped: true, competitors: [{ url: "" }] }));
      setStepError(null); setStep((s) => s + 1); return;
    }
    if (step === 5) {
      setState((s) => ({ ...s, prevExperience: "" }));
      setStepError(null); setStep((s) => s + 1); return;
    }
  };

  const submit = async () => {
    const err = validateStep();
    if (err) { setStepError(err); toast.error(err); return; }
    setStepError(null);
    setSubmitting(true);
    try {
      const normalized = {
        ...state,
        siteUrl: normalizeUrl(state.siteUrl),
        competitors: state.competitorsSkipped
          ? []
          : state.competitors.map((c) => ({ url: normalizeUrl(c.url) })).filter((c) => c.url.length > 0),
        keywords: state.keywords.map((k) => k.value.trim()).filter(Boolean),
      };
      const { error } = await (supabase.from("quiz_submissions") as any).insert({
        answers: { ...normalized, track: "seo", source, lang },
        contact_name: state.contactName,
        contact_channel: state.channel || "unknown",
        contact_value: state.channelValue,
        estimated_price_usd: 0, estimated_days: 0,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });
      if (error) throw error;
      logConsent("seo_quiz_submission");
      try {
        const skippedLabel = isEn ? "Skipped" : "Пропущено";
        const otherLabel = isEn ? "Other" : "Другое";
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "lead-notification",
            recipientEmail: "Prezidenthulk@gmail.com",
            idempotencyKey: `seo-quiz-${crypto.randomUUID()}`,
            templateData: {
              source: "seo_quiz_submission",
              name: state.contactName,
              contact: state.channelValue,
              contactChannel: state.channel,
              pageUrl: typeof window !== "undefined" ? window.location.href : "",
              submittedAt: new Date().toLocaleString(isEn ? "en-US" : "ru-RU"),
              formLang: lang,
              quizAnswers: {
                siteUrl: normalized.siteUrl,
                goal: state.goal === "other" ? `${otherLabel}: ${state.goalOther}` : goalLabels[state.goal as Goal],
                competitors: normalized.competitors.length ? normalized.competitors.map((c) => c.url) : skippedLabel,
                keywords: normalized.keywords,
                prevExperience: state.prevExperience || "—",
                contentParticipation: state.contentParticipation.map((c) => contentLabels[c]),
                devSupport: state.devSupport === "have"
                  ? (isEn ? "Has own tech specialist" : "Есть свой технический специалист")
                  : (isEn ? "Wants turnkey" : "Нужно «под ключ»"),
                flexibility: state.flexibility === "yes" ? (isEn ? "Yes" : "Да")
                  : state.flexibility === "no" ? (isEn ? "No" : "Нет")
                  : (isEn ? "Open to discussion" : "Обсуждаемо"),
                pace: paceLabels[state.pace as Exclude<Pace, "">]?.title,
                budget: budgetLabels[state.budget as Exclude<Budget, "">],
                turbo: state.turbo === "yes"
                  ? (isEn ? "Yes, interested in turbo mode (behavioral factors)" : "Да, интересен турбо-режим (поведенческие факторы)")
                  : state.turbo === "no" ? (isEn ? "No" : "Нет")
                  : (isEn ? "Open to discussion" : "Готов обсудить"),
              },
            },
          },
        });
      } catch (e) { console.warn("seo lead notification failed", e); }
      await sendClientConfirmation({
        contact: state.channelValue,
        name: state.contactName,
        lang,
        source: "seo_quiz_submission",
        track: "seo",
      });
      setDone(true);
    } catch (e) {
      console.error(e);
      toast.error(isEn ? "Failed to send the request. Try again or message us on Telegram." : "Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.");
    } finally { setSubmitting(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">{isEn ? "SEO & behavioral factors quiz" : "Опросник по SEO и поведенческим факторам"}</DialogTitle>
        <DialogDescription className="sr-only">
          {isEn ? "Answer 12 quick questions — a manager will get back to you within 12 hours." : "Ответьте на 12 коротких вопросов — менеджер свяжется с вами в течение 12 часов."}
        </DialogDescription>

        {!done ? (
          <>
            <div className="sticky top-0 z-10 border-b bg-background/95 px-6 py-4 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {isEn ? `Step ${step} of ${TOTAL_STEPS}` : `Шаг ${step} из ${TOTAL_STEPS}`}
                </div>
                <button onClick={handleClose} className="rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label={isEn ? "Close" : "Закрыть"}>
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Progress value={(step / TOTAL_STEPS) * 100} className="mt-3 h-1.5" />
            </div>

            <div className="px-6 py-6">
              {step === 1 && (
                <StepWrap title={isEn ? "Paste a link to your website" : "Вставьте ссылку на ваш сайт"}>
                  <Input
                    placeholder={isEn ? "example.com or https://example.com" : "example.ru или https://example.ru"}
                    value={state.siteUrl}
                    onChange={(e) => update("siteUrl", e.target.value)}
                    onBlur={() => { if (state.siteUrl.trim()) update("siteUrl", normalizeUrl(state.siteUrl)); }}
                    inputMode="url"
                    maxLength={300}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {isEn ? "If protocol is missing we'll add https:// for you" : "Если протокол не указан — мы сами добавим https://"}
                  </p>
                </StepWrap>
              )}

              {step === 2 && (
                <StepWrap title={isEn ? "What main business goal do you want to achieve with the site in the next 6–12 months?" : "Какую главную бизнес-задачу вы хотите решить с помощью сайта в ближайшие полгода-год?"}>
                  <div className="grid gap-2">
                    {(Object.keys(goalLabels) as Goal[]).map((g) => (
                      <Button key={g} type="button" variant={state.goal === g ? "default" : "outline"} className="justify-start whitespace-normal text-left h-auto py-3" onClick={() => update("goal", g)}>
                        {goalLabels[g]}
                      </Button>
                    ))}
                  </div>
                  {state.goal === "other" && (
                    <Input className="mt-3" placeholder={isEn ? "Describe your goal" : "Опишите вашу задачу"} value={state.goalOther} onChange={(e) => update("goalOther", e.target.value)} maxLength={300} />
                  )}
                </StepWrap>
              )}

              {step === 3 && (
                <StepWrap title={isEn ? "Who are your main competitors?" : "Кто ваши главные конкуренты?"} subtitle={isEn ? "Whom do you look up to, and whom do you consider weaker but ranking higher? 2–3 links help — this step can be skipped." : "На кого вы равняетесь, а кого считаете слабее, но они выше в поиске? Ссылки на 2–3 сайта помогут — но шаг можно пропустить."}>
                  <div className="space-y-3">
                    {state.competitors.map((c, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Input
                          placeholder={isEn ? `Competitor site ${i + 1}` : `Сайт конкурента ${i + 1}`}
                          value={c.url}
                          onChange={(e) => {
                            const next = [...state.competitors];
                            next[i] = { url: e.target.value };
                            update("competitors", next);
                            if (state.competitorsSkipped) update("competitorsSkipped", false);
                          }}
                          onBlur={() => {
                            if (c.url.trim()) {
                              const next = [...state.competitors];
                              next[i] = { url: normalizeUrl(c.url) };
                              update("competitors", next);
                            }
                          }}
                          inputMode="url"
                          maxLength={300}
                        />
                        {state.competitors.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => {
                            const next = state.competitors.filter((_, idx) => idx !== i);
                            update("competitors", next.length ? next : [{ url: "" }]);
                          }} aria-label={isEn ? "Remove" : "Удалить"}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="gap-2"
                      onClick={() => update("competitors", [...state.competitors, { url: "" }])}
                      disabled={state.competitors.length >= 6}>
                      <Plus className="h-4 w-4" /> {isEn ? "Add another" : "Добавить ещё"}
                    </Button>
                  </div>
                </StepWrap>
              )}

              {step === 4 && (
                <StepWrap title={isEn ? "Which keywords or topics are most important to rank for?" : "По каким ключевым фразам или направлениям вам важнее всего быть в топе?"} subtitle={isEn ? "Even if queries are extremely competitive — we want to understand priorities." : "Даже если запросы «дико конкурентные» — нам важно понимать приоритеты."}>
                  <div className="space-y-3">
                    {state.keywords.map((k, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Input
                          placeholder={isEn ? `Key query or topic ${i + 1}` : `Ключевой запрос или направление ${i + 1}`}
                          value={k.value}
                          onChange={(e) => { const next = [...state.keywords]; next[i] = { value: e.target.value }; update("keywords", next); }}
                          maxLength={200}
                        />
                        {state.keywords.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => {
                            const next = state.keywords.filter((_, idx) => idx !== i);
                            update("keywords", next.length ? next : [{ value: "" }]);
                          }} aria-label={isEn ? "Remove" : "Удалить"}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="gap-2"
                      onClick={() => update("keywords", [...state.keywords, { value: "" }])}
                      disabled={state.keywords.length >= 15}>
                      <Plus className="h-4 w-4" /> {isEn ? "Add query" : "Добавить запрос"}
                    </Button>
                  </div>
                </StepWrap>
              )}

              {step === 5 && (
                <StepWrap title={isEn ? "Have you had previous attempts to promote the site?" : "Были ли у вас ранее попытки продвижения сайта?"} subtitle={isEn ? "What worked, and what went wrong? It helps us avoid past mistakes." : "Что понравилось, а что пошло не так? Это поможет нам избежать прошлых ошибок и понять ваш опыт."}>
                  <Textarea rows={8} maxLength={2000}
                    placeholder={isEn ? "Up to 2000 characters. Skip if no experience." : "До 2000 символов. Можно пропустить, если не было опыта."}
                    value={state.prevExperience}
                    onChange={(e) => update("prevExperience", e.target.value)}
                  />
                  <p className="mt-2 text-right text-xs text-muted-foreground">{state.prevExperience.length} / 2000</p>
                </StepWrap>
              )}

              {step === 6 && (
                <StepWrap title={isEn ? "Are you or your team ready to participate in content creation?" : "Готовы ли вы или ваша команда участвовать в процессе создания контента?"} subtitle={isEn ? "You can pick several options." : "Можно выбрать несколько вариантов."}>
                  <div className="grid gap-2">
                    {(Object.keys(contentLabels) as ContentParticipation[]).map((c) => {
                      const checked = state.contentParticipation.includes(c);
                      return (
                        <button key={c} type="button"
                          onClick={() => {
                            let next: ContentParticipation[];
                            if (c === "no") next = checked ? [] : ["no"];
                            else {
                              const without = state.contentParticipation.filter((x) => x !== "no");
                              next = checked ? without.filter((x) => x !== c) : [...without, c];
                            }
                            update("contentParticipation", next);
                          }}
                          className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition ${checked ? "border-primary bg-primary/5" : "border-input hover:border-primary/50"}`}>
                          <Checkbox checked={checked} className="mt-0.5 pointer-events-none" />
                          <span className="text-sm">{contentLabels[c]}</span>
                        </button>
                      );
                    })}
                  </div>
                </StepWrap>
              )}

              {step === 7 && (
                <StepWrap title={isEn ? "Do you have a developer or tech specialist who can quickly apply changes per our spec?" : "Есть ли у вас программист или технический специалист, который может оперативно вносить правки на сайт по нашему ТЗ?"}>
                  <div className="grid gap-2">
                    <OptionButton selected={state.devSupport === "have"} onClick={() => update("devSupport", "have")}
                      title={isEn ? "Yes" : "Да"} desc={isEn ? "We have our own developer/team to apply changes." : "У нас есть свой разработчик/команда, которая внесёт правки."} />
                    <OptionButton selected={state.devSupport === "turnkey"} onClick={() => update("devSupport", "turnkey")}
                      title={isEn ? "No — need turnkey" : 'Нет — нужно "под ключ"'} desc={isEn ? "Happy to delegate technical changes to HulkWork Studio." : "Готовы доверить технические правки HulkWork Studio."} />
                  </div>
                </StepWrap>
              )}

              {step === 8 && (
                <StepWrap title={isEn ? "Are you ready to change the site structure or design if search engine algorithms require it?" : "Готовы ли вы менять структуру или дизайн сайта, если этого потребуют алгоритмы поисковиков для достижения топа?"}>
                  <div className="grid grid-cols-3 gap-2">
                    {(["yes", "no", "discuss"] as const).map((k) => (
                      <Button key={k} type="button" variant={state.flexibility === k ? "default" : "outline"} onClick={() => update("flexibility", k)}>
                        {isEn ? (k === "yes" ? "Yes" : k === "no" ? "No" : "Open") : (k === "yes" ? "Да" : k === "no" ? "Нет" : "Обсуждаемо")}
                      </Button>
                    ))}
                  </div>
                </StepWrap>
              )}

              {step === 9 && (
                <StepWrap title={isEn ? "Which pace works best for you?" : "Какой темп работы вам ближе?"} subtitle={isEn ? "In competitive niches SEO often requires not just optimization but also investment in content, links, usability." : "В конкурентных нишах SEO часто требует не только оптимизации, но и инвестиций в контент, ссылки, юзабилити."}>
                  <div className="grid gap-2">
                    {(Object.keys(paceLabels) as Exclude<Pace, "">[]).map((p) => (
                      <OptionButton key={p} selected={state.pace === p} onClick={() => update("pace", p)}
                        title={paceLabels[p].title} desc={paceLabels[p].desc} />
                    ))}
                  </div>
                </StepWrap>
              )}

              {step === 10 && (
                <StepWrap title={isEn ? "Give a sense of comfortable monthly investment range in marketing/SEO" : "Сориентируйте, пожалуйста, по комфортным рамкам ежемесячных инвестиций в маркетинг/SEO"} subtitle={isEn ? "It helps us cut off strategies that don't fit your project's economics." : "Это поможет сразу отсечь стратегии, которые не вписываются в экономику вашего проекта."}>
                  <div className="grid gap-2">
                    {(Object.keys(budgetLabels) as Exclude<Budget, "">[]).map((b) => (
                      <Button key={b} type="button" variant={state.budget === b ? "default" : "outline"}
                        className="justify-start whitespace-normal text-left h-auto py-3"
                        onClick={() => update("budget", b)}>
                        {budgetLabels[b]}
                      </Button>
                    ))}
                  </div>
                </StepWrap>
              )}

              {step === 11 && (
                <StepWrap title={isEn ? "Turbo mode: behavioral factors" : "Турбо-режим: поведенческие факторы"} subtitle={isEn ? "We have our own development that lets us legally accelerate reaching the TOP via behavioral factors (simulated real-user actions). Results in 1–3 months instead of 9–12." : "У нас есть собственная разработка, которая позволяет легально ускорить выход в ТОП за счёт работы с поведенческими факторами (имитация действий реальных пользователей). Это даёт результаты не через 9–12 месяцев, а через 1–3."}>
                  <div className="grid grid-cols-3 gap-2">
                    {(["yes", "no", "discuss"] as const).map((k) => (
                      <Button key={k} type="button" variant={state.turbo === k ? "default" : "outline"} onClick={() => update("turbo", k)}>
                        {isEn ? (k === "yes" ? "Yes" : k === "no" ? "No" : "Open to discuss") : (k === "yes" ? "Да" : k === "no" ? "Нет" : "Готов обсудить")}
                      </Button>
                    ))}
                  </div>
                </StepWrap>
              )}

              {step === 12 && (
                <StepWrap title={isEn ? "How can we reach you?" : "Как с вами связаться?"}>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>{isEn ? "Your name" : "Ваше имя"}</Label>
                      <Input value={state.contactName} onChange={(e) => update("contactName", e.target.value)} placeholder={isEn ? "Name" : "Имя"} maxLength={80} />
                    </div>
                    <div className="space-y-2">
                      <Label>{isEn ? "Contact channel" : "Канал связи"}</Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {(["telegram", "whatsapp", "vk", "email"] as Channel[]).map((c) => (
                          <Button key={c} type="button" variant={state.channel === c ? "default" : "outline"}
                            onClick={() => { update("channel", c); update("channelValue", ""); }}>
                            {channelMask[c].label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {state.channel && (
                      <div className="space-y-2">
                        <Label>{channelMask[state.channel].label}</Label>
                        <Input placeholder={channelMask[state.channel].placeholder}
                          value={state.channelValue}
                          onChange={(e) => update("channelValue", e.target.value)}
                          inputMode={state.channel === "whatsapp" ? "tel" : state.channel === "email" ? "email" : "text"}
                          maxLength={200} />
                      </div>
                    )}
                    <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
                  </div>
                </StepWrap>
              )}
            </div>

            <div className="sticky bottom-0 z-10 border-t bg-background/95 px-6 py-4 backdrop-blur">
              {stepError && (
                <div role="alert" className="mb-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{stepError}</span>
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <Button type="button" variant="ghost" onClick={goPrev} disabled={step === 1 || submitting} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> {isEn ? "Back" : "Назад"}
                </Button>
                <div className="flex items-center gap-2">
                  {(step === 3 || step === 5) && (
                    <Button type="button" variant="ghost" size="sm" onClick={skipStep} className="gap-1 text-muted-foreground hover:text-foreground">
                      <SkipForward className="h-3.5 w-3.5" /> {isEn ? "Skip" : "Пропустить"}
                    </Button>
                  )}
                  {step < TOTAL_STEPS ? (
                    <Button type="button" onClick={goNext} className="gap-2 font-heading">
                      {isEn ? "Next" : "Дальше"} <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="button" onClick={submit} disabled={submitting} className="gap-2 font-heading">
                      {submitting ? (isEn ? "Sending…" : "Отправляем…") : (isEn ? "Send request" : "Отправить заявку")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <FinalScreen onClose={handleClose} name={state.contactName} isEn={isEn} />
        )}
      </DialogContent>
    </Dialog>
  );
};

const StepWrap = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-heading text-lg font-bold sm:text-xl">{title}</h3>
    {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    <div className="mt-5">{children}</div>
  </div>
);

const OptionButton = ({ selected, onClick, title, desc }: { selected: boolean; onClick: () => void; title: string; desc: string }) => (
  <button type="button" onClick={onClick}
    className={`rounded-lg border px-4 py-3 text-left transition ${selected ? "border-primary bg-primary/5" : "border-input hover:border-primary/50"}`}>
    <div className="font-heading text-sm font-semibold">{title}</div>
    <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
  </button>
);

const FinalScreen = ({ onClose, name, isEn }: { onClose: () => void; name: string; isEn: boolean }) => (
  <div className="px-6 py-10 text-center">
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
      <CheckCircle2 className="h-8 w-8" />
    </div>
    <h3 className="font-heading text-2xl font-bold">
      {isEn
        ? (name ? `Thank you, ${name}!` : "Thank you!") + " Request received."
        : (name ? `Спасибо, ${name}!` : "Спасибо!") + " Заявка принята."}
    </h3>
    {isEn ? (
      <>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          SEO is always an individual strategy: exact timelines and cost depend on your niche, competitors, and goals.
          So instead of "universal" numbers that don't actually work, we will prepare a personal proposal.
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Within the next <strong>12 hours</strong> a personal manager will reach out and suggest an optimal strategy for your budget and pace.
        </p>
        <div className="mt-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/30 p-5 text-left text-sm text-muted-foreground">
          <p><strong>What's next:</strong> we'll study your site, competitors, and keywords, run a preliminary audit and come back with a transparent plan — no hidden conditions or upsells.</p>
        </div>
      </>
    ) : (
      <>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          SEO-продвижение — это всегда индивидуальная стратегия: точные сроки и стоимость зависят от ниши, конкурентов и ваших целей. Поэтому, чтобы не давать вам «универсальных» цифр, которые в реальности не работают, мы подготовим персональное предложение.
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          В течение ближайших <strong>12 часов</strong> с вами свяжется персональный менеджер и предложит оптимальную стратегию под ваш бюджет и темп.
        </p>
        <div className="mt-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/30 p-5 text-left text-sm text-muted-foreground">
          <p><strong>Что дальше:</strong> мы изучим ваш сайт, конкурентов и ключевые запросы, проведём предварительный аудит и придём с прозрачным планом — без скрытых условий и навязывания ненужных услуг.</p>
        </div>
      </>
    )}
    <Button onClick={onClose} className="mt-6 w-full font-heading" size="lg">{isEn ? "Close" : "Закрыть"}</Button>
  </div>
);

export default SeoQuizDialog;