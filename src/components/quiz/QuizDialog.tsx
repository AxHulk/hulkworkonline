import { useState, useMemo } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles, CheckCircle2, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useQuiz } from "./QuizContext";
import { supabase } from "@/integrations/supabase/client";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { sendClientConfirmation } from "@/lib/clientEmail";
import { formatPrice } from "@/lib/exchangeRate";
import { logConsent } from "@/lib/consent";
import { useLanguage } from "@/i18n/LanguageContext";

type GoalKey = "sales" | "leads" | "info" | "community" | "support" | "other";
type Stage = "idea" | "plan" | "running" | "other";
type LegalForm = "ИП" | "ООО" | "Самозанятый" | "ОАО" | "ЗАО" | "Физлицо";
type Channel = "telegram" | "whatsapp" | "vk";
type ExternalService = "CRM" | "Аналитика" | "Складская программа" | "1С" | "Сервис рассылок" | "Другое";

interface CompetitorRef { name: string; url: string; }
interface SiteRef { url: string; comment: string; }

interface QuizState {
  idea: string;
  goal: GoalKey | ""; goalOther: string;
  hasName: "yes" | "no" | ""; projectName: string;
  hasDomain: "yes" | "no" | ""; domain: string;
  stage: Stage | ""; stageOther: string;
  knowsAudience: "yes" | "no" | "";
  knowsCompetitors: "yes" | "no" | ""; competitors: CompetitorRef[];
  competitorsLikes: string;
  inspirationSites: SiteRef[];
  hasBranding: "yes" | "no" | "";
  legalForm: LegalForm | "";
  usesExternal: "yes" | "no" | "";
  externalServices: Record<ExternalService, { selected: boolean; details: string }>;
  needsAccount: "yes" | "no" | "unknown" | ""; accountFunctions: string;
  contactName: string; channel: Channel | ""; channelValue: string;
  bigIdeaShared: "yes" | "no" | ""; bigIdea: string;
}

const initialState: QuizState = {
  idea: "", goal: "", goalOther: "",
  hasName: "", projectName: "",
  hasDomain: "", domain: "",
  stage: "", stageOther: "",
  knowsAudience: "",
  knowsCompetitors: "", competitors: [{ name: "", url: "" }],
  competitorsLikes: "",
  inspirationSites: [{ url: "", comment: "" }],
  hasBranding: "",
  legalForm: "",
  usesExternal: "",
  externalServices: {
    CRM: { selected: false, details: "" },
    "Аналитика": { selected: false, details: "" },
    "Складская программа": { selected: false, details: "" },
    "1С": { selected: false, details: "" },
    "Сервис рассылок": { selected: false, details: "" },
    "Другое": { selected: false, details: "" },
  },
  needsAccount: "", accountFunctions: "",
  contactName: "", channel: "", channelValue: "",
  bigIdeaShared: "", bigIdea: "",
};

const goalLabelsRu: Record<GoalKey, string> = {
  sales: "Увеличение продаж",
  leads: "Привлечение новых клиентов",
  info: "Информирование",
  community: "Создание сообщества",
  support: "Поддержка существующих клиентов",
  other: "Другое",
};
const goalLabelsEn: Record<GoalKey, string> = {
  sales: "Increase sales",
  leads: "Acquire new clients",
  info: "Provide information",
  community: "Build a community",
  support: "Support existing clients",
  other: "Other",
};

const externalServiceLabelsEn: Record<ExternalService, string> = {
  "CRM": "CRM",
  "Аналитика": "Analytics",
  "Складская программа": "Inventory system",
  "1С": "1C / ERP",
  "Сервис рассылок": "Email/SMS service",
  "Другое": "Other",
};

function calcOffer(s: QuizState) {
  const hasExternal = s.usesExternal === "yes";
  const hasAccount = s.needsAccount === "yes";
  if (hasExternal && hasAccount) return { price: 700, days: 6 };
  if (hasExternal && !hasAccount) return { price: 600, days: 5 };
  return { price: 500, days: 4 };
}

const channelMaskRu: Record<Channel, { placeholder: string; label: string }> = {
  telegram: { placeholder: "@username или +7...", label: "Telegram" },
  whatsapp: { placeholder: "+7 999 123-45-67", label: "WhatsApp" },
  vk: { placeholder: "https://vk.com/username", label: "VKонтакте" },
};
const channelMaskEn: Record<Channel, { placeholder: string; label: string }> = {
  telegram: { placeholder: "@username or phone", label: "Telegram" },
  whatsapp: { placeholder: "+1 555 123-4567", label: "WhatsApp" },
  vk: { placeholder: "https://vk.com/username", label: "VK" },
};

const normalizeUrl = (raw: string): string => {
  const v = (raw || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return "https://" + v.replace(/^\/+/, "");
};

const QuizDialog = () => {
  const { open, closeQuiz, source, track } = useQuiz();
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const isOpen = open && track === "website";
  const [step, setStep] = useState(1);
  const [state, setState] = useState<QuizState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const goalLabels = isEn ? goalLabelsEn : goalLabelsRu;
  const channelMask = isEn ? channelMaskEn : channelMaskRu;

  const totalSteps = 15;
  const showStep8 = state.knowsCompetitors === "yes";
  const offer = useMemo(() => calcOffer(state), [state]);

  const reset = () => {
    setStep(1); setState(initialState); setDone(false); setConsent(false); setConsentError(false);
  };
  const handleClose = () => { closeQuiz(); setTimeout(reset, 300); };

  const contactSchema = z.object({
    contactName: z.string().trim().min(2, isEn ? "Enter your name" : "Укажите имя").max(80),
    channel: z.enum(["telegram", "whatsapp", "vk"]),
    channelValue: z.string().trim().min(3, isEn ? "Enter contact" : "Укажите контакт").max(200),
  });

  const goNext = () => {
    const err = validateStep();
    if (err) { setStepError(err); toast.error(err); return; }
    setStepError(null);
    let next = step + 1;
    if (next === 8 && !showStep8) next = 9;
    if (next > totalSteps) return;
    setStep(next);
  };
  const goPrev = () => {
    setStepError(null);
    let prev = step - 1;
    if (prev === 8 && !showStep8) prev = 7;
    if (prev < 1) return;
    setStep(prev);
  };

  const update = <K extends keyof QuizState>(key: K, value: QuizState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    if (stepError) setStepError(null);
  };

  const E = {
    yesNo: isEn ? "Choose Yes or No." : "Выберите «Да» или «Нет».",
    consentReq: isEn ? "Consent to personal data processing is required." : "Необходимо согласие на обработку персональных данных.",
  };

  const validateStep = (): string | null => {
    switch (step) {
      case 1:
        if (state.idea.trim().length < 5) return isEn ? "Describe your idea (min 5 characters)." : "Опишите идею проекта (минимум 5 символов).";
        return null;
      case 2:
        if (!state.goal) return isEn ? "Choose the main goal of the website." : "Выберите основную цель сайта из списка.";
        if (state.goal === "other" && state.goalOther.trim().length < 2) return isEn ? "Briefly describe your goal in the \"Other\" field." : "Кратко опишите вашу цель в поле «Другое».";
        return null;
      case 3:
        if (!state.hasName) return E.yesNo;
        if (state.hasName === "yes" && !state.projectName.trim()) return isEn ? "Enter the project name." : "Укажите название проекта.";
        return null;
      case 4:
        if (!state.hasDomain) return E.yesNo;
        if (state.hasDomain === "yes" && state.domain.trim().length < 3) return isEn ? "Enter your domain (e.g. example.com)." : "Введите ваш домен (например, example.ru).";
        return null;
      case 5:
        if (!state.stage) return isEn ? "Choose the project stage." : "Выберите стадию проекта.";
        if (state.stage === "other" && state.stageOther.trim().length < 2) return isEn ? "Describe the stage in the \"Other\" field." : "Опишите стадию в поле «Другое».";
        return null;
      case 6:
        if (!state.knowsAudience) return E.yesNo;
        return null;
      case 7:
        if (!state.knowsCompetitors) return E.yesNo;
        if (state.knowsCompetitors === "yes" && !state.competitors.some((c) => c.name.trim() || c.url.trim()))
          return isEn ? "Add at least one competitor — a name or a link." : "Укажите хотя бы одного конкурента — название или ссылку.";
        return null;
      case 8:
        if (state.competitorsLikes.trim().length < 5)
          return isEn ? "Describe what you like or dislike about competitors (min 5 characters)." : "Опишите, что нравится или не нравится у конкурентов (минимум 5 символов).";
        return null;
      case 9:
        if (!state.inspirationSites.some((s) => s.url.trim().length > 3))
          return isEn ? "Add at least one inspiration site link." : "Добавьте хотя бы одну ссылку на сайт-вдохновение.";
        return null;
      case 10:
        if (!state.hasBranding) return E.yesNo;
        return null;
      case 11:
        if (!state.legalForm) return isEn ? "Choose your legal form." : "Выберите вашу юридическую форму.";
        return null;
      case 12:
        if (!state.usesExternal) return E.yesNo;
        if (state.usesExternal === "yes" && !Object.values(state.externalServices).some((e) => e.selected))
          return isEn ? "Select at least one service you use." : "Отметьте хотя бы один используемый сервис.";
        return null;
      case 13:
        if (!state.needsAccount) return isEn ? "Choose one of the options." : "Выберите один из вариантов.";
        if (state.needsAccount === "yes" && state.accountFunctions.trim().length < 5)
          return isEn ? "Describe what features the user account needs." : "Опишите, какой функционал нужен в личном кабинете.";
        return null;
      case 14: {
        const r = contactSchema.safeParse({ contactName: state.contactName, channel: state.channel, channelValue: state.channelValue });
        if (!r.success) {
          const first = r.error.issues[0];
          if (first.path[0] === "contactName") return isEn ? "Enter your name (min 2 characters)." : "Укажите ваше имя (минимум 2 символа).";
          if (first.path[0] === "channel") return isEn ? "Choose a contact channel: Telegram, WhatsApp or VK." : "Выберите канал связи: Telegram, WhatsApp или ВКонтакте.";
          if (first.path[0] === "channelValue") return isEn ? "Enter contact for the selected channel." : "Укажите контакт для выбранного канала.";
          return first.message;
        }
        if (!consent) { setConsentError(true); return E.consentReq; }
        return null;
      }
      case 15:
        if (!state.bigIdeaShared) return isEn ? "Choose \"Skip\" or \"Share\"." : "Выберите «Пропустить» или «Рассказать».";
        if (state.bigIdeaShared === "yes" && state.bigIdea.trim().length < 5)
          return isEn ? "Describe your idea (min 5 characters) or press \"Skip\"." : "Опишите вашу идею (минимум 5 символов) или нажмите «Пропустить».";
        return null;
      default: return null;
    }
  };

  const submit = async () => {
    const err = validateStep();
    if (err) { setStepError(err); toast.error(err); return; }
    setStepError(null);
    setSubmitting(true);
    try {
      const { price, days } = offer;
      const normalizedState = {
        ...state,
        competitors: state.competitors.map((c) => ({ name: c.name.trim(), url: normalizeUrl(c.url) })),
        inspirationSites: state.inspirationSites.map((s) => ({ url: normalizeUrl(s.url), comment: s.comment.trim() })),
      };
      const { error } = await (supabase.from("quiz_submissions") as any).insert({
        answers: { ...normalizedState, source, lang },
        contact_name: state.contactName,
        contact_channel: state.channel || "unknown",
        contact_value: state.channelValue,
        estimated_price_usd: price,
        estimated_days: days,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });
      if (error) throw error;
      logConsent("quiz_submission");
      try {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "lead-notification",
            recipientEmail: "Prezidenthulk@gmail.com",
            idempotencyKey: `quiz-${crypto.randomUUID()}`,
            templateData: {
              source: "quiz_submission",
              name: state.contactName,
              contact: state.channelValue,
              contactChannel: state.channel,
              estimatedPriceUsd: price,
              estimatedDays: days,
              pageUrl: typeof window !== "undefined" ? window.location.href : "",
              submittedAt: new Date().toLocaleString(isEn ? "en-US" : "ru-RU"),
              quizAnswers: normalizedState,
              formLang: lang,
            },
          },
        });
      } catch (notifyErr) { console.warn("lead notification failed", notifyErr); }
      await sendClientConfirmation({
        contact: state.channelValue,
        name: state.contactName,
        lang,
        source: "quiz_submission",
        track: "web",
      });
      setDone(true);
    } catch (err) {
      console.error(err);
      toast.error(isEn ? "Failed to send the request. Please try again or message us on Telegram." : "Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.");
    } finally { setSubmitting(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">{isEn ? "\"Challenge the studio\" quiz — find out price and timeline" : "Опросник «Бросить вызов» — узнайте цену и срок"}</DialogTitle>
        <DialogDescription className="sr-only">
          {isEn ? "Answer 15 quick questions and learn the approximate price and timeline for your website." : "Ответьте на 15 коротких вопросов и узнайте ориентировочную цену и срок разработки сайта."}
        </DialogDescription>

        {!done ? (
          <>
            <div className="sticky top-0 z-10 border-b bg-background/95 px-6 py-4 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {isEn ? `Step ${step} of ${totalSteps}` : `Шаг ${step} из ${totalSteps}`}
                </div>
                <button onClick={handleClose} className="rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label={isEn ? "Close" : "Закрыть"}>
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Progress value={(step / totalSteps) * 100} className="mt-3 h-1.5" />
            </div>

            <div className="px-6 py-6">
              {step === 1 && (
                <StepWrap title={isEn ? "Tell us about your idea" : "Расскажите об идее"} subtitle={isEn ? "Describe the project or business in one or two sentences." : "Опишите проект или бизнес одной–двумя фразами."}>
                  <Textarea
                    placeholder={isEn ? 'For example: "I sell planes" or "I want to open an online clothing store"' : 'Например: "продаю самолёты" или "хочу открыть магазин одежды онлайн"'}
                    value={state.idea}
                    onChange={(e) => update("idea", e.target.value)}
                    rows={4}
                    maxLength={500}
                  />
                </StepWrap>
              )}

              {step === 2 && (
                <StepWrap title={isEn ? "What is the main goal of the website?" : "Какова основная цель сайта?"}>
                  <Select value={state.goal} onValueChange={(v) => update("goal", v as GoalKey)}>
                    <SelectTrigger><SelectValue placeholder={isEn ? "Choose a goal" : "Выберите цель"} /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(goalLabels) as GoalKey[]).map((g) => (
                        <SelectItem key={g} value={g}>{goalLabels[g]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {state.goal === "other" && (
                    <Input placeholder={isEn ? "Describe the goal" : "Опишите цель"} value={state.goalOther} onChange={(e) => update("goalOther", e.target.value)} className="mt-3" maxLength={200} />
                  )}
                </StepWrap>
              )}

              {step === 3 && (
                <StepWrap title={isEn ? "Does the project have a name?" : "Есть ли название у проекта?"}>
                  <YesNo value={state.hasName} onChange={(v) => update("hasName", v)} isEn={isEn} />
                  {state.hasName === "yes" && (
                    <div className="mt-4 space-y-2">
                      <Label>{isEn ? "What is the name of your site/project?" : "Какое название у вашего сайта/проекта?"}</Label>
                      <Input placeholder={isEn ? "For example: HulkWork" : "Например: HulkWork"} value={state.projectName} onChange={(e) => update("projectName", e.target.value)} maxLength={120} />
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 4 && (
                <StepWrap title={isEn ? "Do you have a registered domain?" : "Есть ли зарегистрированный домен?"}>
                  <YesNo value={state.hasDomain} onChange={(v) => update("hasDomain", v)} isEn={isEn} />
                  {state.hasDomain === "yes" && (
                    <div className="mt-4 space-y-2">
                      <Label>{isEn ? "Enter your domain" : "Напишите свой домен"}</Label>
                      <Input placeholder={isEn ? "example.com" : "example.ru"} value={state.domain} onChange={(e) => update("domain", e.target.value)} maxLength={120} />
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 5 && (
                <StepWrap title={isEn ? "What stage is the project at?" : "На какой стадии проект?"}>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {([
                      ["idea", isEn ? "Idea" : "Идея"],
                      ["plan", isEn ? "Business plan" : "Бизнес-план"],
                      ["running", isEn ? "Running business" : "Работающий бизнес"],
                      ["other", isEn ? "Other" : "Другое"],
                    ] as const).map(([k, l]) => (
                      <Button key={k} type="button" variant={state.stage === k ? "default" : "outline"} onClick={() => update("stage", k as Stage)} className="h-auto py-3 text-xs sm:text-sm">
                        {l}
                      </Button>
                    ))}
                  </div>
                  {state.stage === "other" && (
                    <Input placeholder={isEn ? "Describe the stage" : "Опишите стадию"} value={state.stageOther} onChange={(e) => update("stageOther", e.target.value)} className="mt-3" maxLength={200} />
                  )}
                </StepWrap>
              )}

              {step === 6 && (
                <StepWrap title={isEn ? "Do you know your target audience?" : "Знаете ли вы свою целевую аудиторию?"}>
                  <YesNo value={state.knowsAudience} onChange={(v) => update("knowsAudience", v)} isEn={isEn} />
                  {state.knowsAudience === "yes" && (
                    <p className="mt-4 rounded-lg bg-accent/40 p-3 text-sm text-accent-foreground">
                      {isEn ? "Great — the manager will be ready to discuss details." : "Отлично — менеджер будет готов к деталям."}
                    </p>
                  )}
                </StepWrap>
              )}

              {step === 7 && (
                <StepWrap title={isEn ? "Do you know your competitors in the niche?" : "Знаете ли вы конкурентов в нише?"}>
                  <YesNo value={state.knowsCompetitors} onChange={(v) => update("knowsCompetitors", v)} isEn={isEn} />
                  {state.knowsCompetitors === "yes" && (
                    <div className="mt-4 space-y-3">
                      <Label>{isEn ? "Names and/or links to their sites" : "Названия и/или ссылки на их сайты"}</Label>
                      {state.competitors.map((c, i) => (
                        <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                          <Input placeholder={isEn ? "Company name" : "Название компании"} value={c.name} onChange={(e) => { const arr = [...state.competitors]; arr[i] = { ...arr[i], name: e.target.value }; update("competitors", arr); }} maxLength={120} />
                          <Input placeholder="https://..." value={c.url} onChange={(e) => { const arr = [...state.competitors]; arr[i] = { ...arr[i], url: e.target.value }; update("competitors", arr); }} maxLength={300} />
                          {state.competitors.length > 1 && (
                            <Button type="button" variant="ghost" size="icon" onClick={() => update("competitors", state.competitors.filter((_, idx) => idx !== i))} aria-label={isEn ? "Remove" : "Удалить"}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={() => update("competitors", [...state.competitors, { name: "", url: "" }])}>
                        <Plus className="mr-2 h-3.5 w-3.5" /> {isEn ? "Add another" : "Добавить ещё"}
                      </Button>
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 8 && showStep8 && (
                <StepWrap title={isEn ? "What do you like / dislike about competitors?" : "Что нравится / не нравится у конкурентов?"} subtitle={isEn ? "Which features or elements would you like to see on your site — or avoid." : "Какие фишки или элементы хотите видеть на своём сайте — или, наоборот, избежать."}>
                  <Textarea rows={6} maxLength={2000} value={state.competitorsLikes} onChange={(e) => update("competitorsLikes", e.target.value)} placeholder={isEn ? "Up to 2000 characters" : "До 2000 символов"} />
                  <p className="mt-1 text-right text-xs text-muted-foreground">{state.competitorsLikes.length}/2000</p>
                </StepWrap>
              )}

              {step === 9 && (
                <StepWrap title={isEn ? "Which sites inspire you?" : "Какие сайты нравятся как вдохновение?"} subtitle={isEn ? "They don't have to be from your niche — what matters is what catches your eye." : "Не обязательно из вашей ниши — главное, что цепляет дизайн или удобство."}>
                  <div className="space-y-3">
                    {state.inspirationSites.map((s, i) => (
                      <div key={i} className="space-y-2 rounded-lg border p-3">
                        <div className="flex items-start gap-2">
                          <Input placeholder="https://..." value={s.url} onChange={(e) => { const arr = [...state.inspirationSites]; arr[i] = { ...arr[i], url: e.target.value }; update("inspirationSites", arr); }} maxLength={300} />
                          {state.inspirationSites.length > 1 && (
                            <Button type="button" variant="ghost" size="icon" onClick={() => update("inspirationSites", state.inspirationSites.filter((_, idx) => idx !== i))} aria-label={isEn ? "Remove" : "Удалить"}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <Textarea placeholder={isEn ? "What exactly do you like?" : "Что именно нравится?"} rows={2} value={s.comment} onChange={(e) => { const arr = [...state.inspirationSites]; arr[i] = { ...arr[i], comment: e.target.value }; update("inspirationSites", arr); }} maxLength={500} />
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => update("inspirationSites", [...state.inspirationSites, { url: "", comment: "" }])}>
                      <Plus className="mr-2 h-3.5 w-3.5" /> {isEn ? "Add example" : "Добавить пример"}
                    </Button>
                  </div>
                </StepWrap>
              )}

              {step === 10 && (
                <StepWrap title={isEn ? "Do you have brand identity, a logo, a brand book?" : "Есть ли фирменный стиль, логотип, брендбук?"}>
                  <YesNo value={state.hasBranding} onChange={(v) => update("hasBranding", v)} isEn={isEn} />
                  {state.hasBranding === "yes" && (
                    <p className="mt-4 rounded-lg bg-accent/40 p-3 text-sm text-accent-foreground">
                      {isEn ? "Great — the manager is already reserving space for them." : "Отлично — менеджер уже освобождает место для них."}
                    </p>
                  )}
                  {state.hasBranding === "no" && (
                    <p className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                      {isEn ? "This does not affect the price — we can create a brand from scratch as part of the project." : "Этот пункт не влияет на цену — мы можем создать стиль с нуля в рамках проекта."}
                    </p>
                  )}
                </StepWrap>
              )}

              {step === 11 && (
                <StepWrap title={isEn ? "Legal form" : "Юридическая форма"} subtitle={isEn ? "This matters for payment integrations and the site's legal aspects." : "Это важно для интеграции платёжных систем и юридических аспектов сайта."}>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {(["ИП", "ООО", "Самозанятый", "ОАО", "ЗАО", "Физлицо"] as LegalForm[]).map((l) => {
                      const labelEn: Record<LegalForm, string> = {
                        "ИП": "Sole proprietor",
                        "ООО": "LLC",
                        "Самозанятый": "Self-employed",
                        "ОАО": "OJSC",
                        "ЗАО": "CJSC",
                        "Физлицо": "I'm just an individual",
                      };
                      const label = isEn ? labelEn[l] : (l === "Физлицо" ? "Я — обычный человек" : l);
                      return (
                        <Button key={l} type="button" variant={state.legalForm === l ? "default" : "outline"} onClick={() => update("legalForm", l)} className="h-auto py-3 text-xs sm:text-sm">
                          {label}
                        </Button>
                      );
                    })}
                  </div>
                </StepWrap>
              )}

              {step === 12 && (
                <StepWrap title={isEn ? "Do you use external services in your work?" : "Используете внешние сервисы в работе?"} subtitle={isEn ? "CRM, analytics, inventory, ERP, mailing services, etc." : "CRM, аналитика, складские, 1С, рассылки и т. д."}>
                  <YesNo value={state.usesExternal} onChange={(v) => update("usesExternal", v)} isEn={isEn} />
                  {state.usesExternal === "yes" && (
                    <div className="mt-4 space-y-2">
                      <Label>{isEn ? "Which ones?" : "Какие?"}</Label>
                      {(Object.keys(state.externalServices) as ExternalService[]).map((key) => {
                        const item = state.externalServices[key];
                        const label = isEn ? externalServiceLabelsEn[key] : key;
                        return (
                          <div key={key} className="rounded-lg border p-3">
                            <label className="flex items-center gap-2 text-sm">
                              <Checkbox checked={item.selected} onCheckedChange={(v) => update("externalServices", { ...state.externalServices, [key]: { ...item, selected: !!v } })} />
                              {label}
                            </label>
                            {item.selected && (
                              <Input className="mt-2" placeholder={isEn ? "Specify the name/service" : "Уточните название/сервис"} value={item.details} onChange={(e) => update("externalServices", { ...state.externalServices, [key]: { ...item, details: e.target.value } })} maxLength={200} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 13 && (
                <StepWrap title={isEn ? "Do users need a personal account?" : "Нужен ли личный кабинет для пользователей?"}>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      ["yes", isEn ? "Yes" : "Да"],
                      ["no", isEn ? "No" : "Нет"],
                      ["unknown", isEn ? "Don't know" : "Не знаю"],
                    ] as const).map(([k, l]) => (
                      <Button key={k} type="button" variant={state.needsAccount === k ? "default" : "outline"} onClick={() => update("needsAccount", k as QuizState["needsAccount"])}>
                        {l}
                      </Button>
                    ))}
                  </div>
                  {state.needsAccount === "yes" && (
                    <div className="mt-4 space-y-2">
                      <Label>{isEn ? "What features should the personal account have?" : "Какой функционал должен быть в личном кабинете?"}</Label>
                      <Textarea rows={4} maxLength={1500} placeholder={isEn ? "What should the user see and do?" : "Что должен видеть и делать пользователь?"} value={state.accountFunctions} onChange={(e) => update("accountFunctions", e.target.value)} />
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 14 && (
                <StepWrap title={isEn ? "How can we reach you?" : "Как с вами связаться?"}>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>{isEn ? "Your name" : "Ваше имя"}</Label>
                      <Input value={state.contactName} onChange={(e) => update("contactName", e.target.value)} placeholder={isEn ? "Name" : "Имя"} maxLength={80} />
                    </div>
                    <div className="space-y-2">
                      <Label>{isEn ? "Contact channel" : "Канал связи"}</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["telegram", "whatsapp", "vk"] as Channel[]).map((c) => (
                          <Button key={c} type="button" variant={state.channel === c ? "default" : "outline"} onClick={() => { update("channel", c); update("channelValue", ""); }}>
                            {channelMask[c].label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {state.channel && (
                      <div className="space-y-2">
                        <Label>{channelMask[state.channel].label}</Label>
                        <Input placeholder={channelMask[state.channel].placeholder} value={state.channelValue} onChange={(e) => update("channelValue", e.target.value)} maxLength={200} />
                      </div>
                    )}
                    <ConsentCheckbox checked={consent} onChange={(v) => { setConsent(v); if (v) setConsentError(false); }} error={consentError} />
                  </div>
                </StepWrap>
              )}

              {step === 15 && (
                <StepWrap title={isEn ? "If there were no limits…" : "Если бы не было ограничений…"} subtitle={isEn ? "What would you like to see on the site? The boldest ideas. We can do almost anything." : "Что хотели бы видеть на сайте? Самые смелые идеи и фишки. Мы можем почти всё."}>
                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant={state.bigIdeaShared === "no" ? "default" : "outline"} onClick={() => { update("bigIdeaShared", "no"); update("bigIdea", ""); }}>
                      {isEn ? "Skip" : "Пропустить"}
                    </Button>
                    <Button type="button" variant={state.bigIdeaShared === "yes" ? "default" : "outline"} onClick={() => update("bigIdeaShared", "yes")}>
                      {isEn ? "Share" : "Рассказать"}
                    </Button>
                  </div>
                  {state.bigIdeaShared === "yes" && (
                    <Textarea className="mt-3" rows={6} maxLength={2000} placeholder={isEn ? "Up to 2000 characters" : "До 2000 символов"} value={state.bigIdea} onChange={(e) => update("bigIdea", e.target.value)} />
                  )}
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
                {step < totalSteps ? (
                  <Button type="button" onClick={goNext} className="gap-2 font-heading">
                    {isEn ? "Next" : "Дальше"} <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" onClick={submit} disabled={submitting} className="gap-2 font-heading">
                    {submitting ? (isEn ? "Sending…" : "Отправляем…") : (isEn ? "Get price and timeline" : "Узнать цену и срок")}
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <ResultScreen offer={offer} hasExternal={state.usesExternal === "yes"} hasAccount={state.needsAccount === "yes"} onClose={handleClose} isEn={isEn} />
        )}
      </DialogContent>
    </Dialog>
  );
};

const StepWrap = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-heading text-lg font-bold sm:text-xl">{title}</h3>
    {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    <div className="mt-5">{children}</div>
  </div>
);

const YesNo = ({ value, onChange, isEn }: { value: "yes" | "no" | ""; onChange: (v: "yes" | "no") => void; isEn: boolean }) => (
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant={value === "yes" ? "default" : "outline"} onClick={() => onChange("yes")}>
      {isEn ? "Yes" : "Да"}
    </Button>
    <Button type="button" variant={value === "no" ? "default" : "outline"} onClick={() => onChange("no")}>
      {isEn ? "No" : "Нет"}
    </Button>
  </div>
);

const ResultScreen = ({ offer, hasExternal, hasAccount, onClose, isEn }: {
  offer: { price: number; days: number }; hasExternal: boolean; hasAccount: boolean; onClose: () => void; isEn: boolean;
}) => {
  const dayLabel = isEn
    ? `${offer.days} ${offer.days === 1 ? "day" : "days"}`
    : `${offer.days} ${offer.days === 1 ? "день" : offer.days < 5 ? "дня" : "дней"}`;
  return (
    <div className="px-6 py-10 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h3 className="font-heading text-2xl font-bold">{isEn ? "Thank you! Request received." : "Спасибо! Заявка принята."}</h3>
      <p className="mt-2 text-muted-foreground">
        {isEn ? "We'll contact you shortly. Here is a preliminary estimate:" : "Мы свяжемся с вами в ближайшее время. А вот предварительная оценка:"}
      </p>

      <div className="mt-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/30 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{isEn ? "Price" : "Цена"}</p>
            <p className="font-heading text-3xl font-extrabold text-primary">{formatPrice(offer.price, isEn ? "en" : "ru")}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{isEn ? "Timeline" : "Срок"}</p>
            <p className="font-heading text-3xl font-extrabold text-primary">{dayLabel}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {isEn ? (
            <>
              {hasAccount && hasExternal && "Includes a personal account and integration of external services."}
              {!hasAccount && hasExternal && "Includes integration of external services."}
              {!hasExternal && !hasAccount && "Basic site without a personal account or external integrations."}
            </>
          ) : (
            <>
              {hasAccount && hasExternal && "С учётом личного кабинета и интеграции внешних сервисов."}
              {!hasAccount && hasExternal && "С учётом интеграции внешних сервисов."}
              {!hasExternal && !hasAccount && "Базовый сайт без личного кабинета и внешних интеграций."}
            </>
          )}
        </p>
      </div>

      <div className="mt-5 space-y-2 text-left text-xs text-muted-foreground">
        {isEn ? (
          <>
            <p><strong>Important:</strong> the price may change slightly after review — strictly by agreement, if we see how features or technologies could improve your project.</p>
            <p>The price already includes <strong>one year of hosting</strong>. Domain cost is not included.</p>
            <p>The timeline starts once we receive complete project information.</p>
          </>
        ) : (
          <>
            <p><strong>Важно:</strong> цена может незначительно измениться после модерации — строго по согласованию, если мы увидим, какими функциями или технологиями можно улучшить ваш ресурс.</p>
            <p>В цену уже включён <strong>хостинг на год</strong>. Стоимость домена не входит.</p>
            <p>Срок отсчитывается с момента получения полной информации по проекту.</p>
          </>
        )}
      </div>

      <Button onClick={onClose} className="mt-6 w-full font-heading" size="lg">
        {isEn ? "Close" : "Закрыть"}
      </Button>
    </div>
  );
};

export default QuizDialog;