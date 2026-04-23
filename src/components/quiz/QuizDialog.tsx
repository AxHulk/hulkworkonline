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
import { logConsent } from "@/lib/consent";

type GoalKey =
  | "sales"
  | "leads"
  | "info"
  | "community"
  | "support"
  | "other";

type Stage = "idea" | "plan" | "running" | "other";
type LegalForm = "ИП" | "ООО" | "Самозанятый" | "ОАО" | "ЗАО" | "Физлицо";
type Channel = "telegram" | "whatsapp" | "vk";
type ExternalService = "CRM" | "Аналитика" | "Складская программа" | "1С" | "Сервис рассылок" | "Другое";

interface CompetitorRef {
  name: string;
  url: string;
}

interface SiteRef {
  url: string;
  comment: string;
}

interface QuizState {
  // 1
  idea: string;
  // 2
  goal: GoalKey | "";
  goalOther: string;
  // 3
  hasName: "yes" | "no" | "";
  projectName: string;
  // 4
  hasDomain: "yes" | "no" | "";
  domain: string;
  // 5
  stage: Stage | "";
  stageOther: string;
  // 6
  knowsAudience: "yes" | "no" | "";
  // 7
  knowsCompetitors: "yes" | "no" | "";
  competitors: CompetitorRef[];
  // 8 (зависит от 7)
  competitorsLikes: string;
  // 9
  inspirationSites: SiteRef[];
  // 10
  hasBranding: "yes" | "no" | "";
  // 11
  legalForm: LegalForm | "";
  // 12
  usesExternal: "yes" | "no" | "";
  externalServices: Record<ExternalService, { selected: boolean; details: string }>;
  // 13
  needsAccount: "yes" | "no" | "unknown" | "";
  accountFunctions: string;
  // 14
  contactName: string;
  channel: Channel | "";
  channelValue: string;
  // 15
  bigIdeaShared: "yes" | "no" | "";
  bigIdea: string;
}

const initialState: QuizState = {
  idea: "",
  goal: "",
  goalOther: "",
  hasName: "",
  projectName: "",
  hasDomain: "",
  domain: "",
  stage: "",
  stageOther: "",
  knowsAudience: "",
  knowsCompetitors: "",
  competitors: [{ name: "", url: "" }],
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
  needsAccount: "",
  accountFunctions: "",
  contactName: "",
  channel: "",
  channelValue: "",
  bigIdeaShared: "",
  bigIdea: "",
};

const goalLabels: Record<GoalKey, string> = {
  sales: "Увеличение продаж",
  leads: "Привлечение новых клиентов",
  info: "Информирование",
  community: "Создание сообщества",
  support: "Поддержка существующих клиентов",
  other: "Другое",
};

function calcOffer(s: QuizState) {
  const hasExternal = s.usesExternal === "yes";
  const hasAccount = s.needsAccount === "yes";
  if (hasExternal && hasAccount) return { price: 700, days: 6 };
  if (hasExternal && !hasAccount) return { price: 600, days: 5 };
  return { price: 500, days: 4 };
}

const channelMask: Record<Channel, { placeholder: string; label: string }> = {
  telegram: { placeholder: "@username или +7...", label: "Telegram" },
  whatsapp: { placeholder: "+7 999 123-45-67", label: "WhatsApp" },
  vk: { placeholder: "https://vk.com/username", label: "VKонтакте" },
};

const contactSchema = z.object({
  contactName: z.string().trim().min(2, "Укажите имя").max(80),
  channel: z.enum(["telegram", "whatsapp", "vk"]),
  channelValue: z.string().trim().min(3, "Укажите контакт").max(200),
});

/**
 * Normalize a user-typed URL: trim, prepend https:// when no protocol is present.
 * Returns empty string if input is empty/whitespace.
 */
const normalizeUrl = (raw: string): string => {
  const v = (raw || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  // Strip leading "//" if user pasted a protocol-relative URL
  return "https://" + v.replace(/^\/+/, "");
};

const QuizDialog = () => {
  const { open, closeQuiz, source } = useQuiz();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<QuizState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  // Calculate visible step list dynamically (skip 8 if competitors=no)
  const totalSteps = 15;
  const showStep8 = state.knowsCompetitors === "yes";

  const offer = useMemo(() => calcOffer(state), [state]);

  const reset = () => {
    setStep(1);
    setState(initialState);
    setDone(false);
    setConsent(false);
    setConsentError(false);
  };

  const handleClose = () => {
    closeQuiz();
    setTimeout(reset, 300);
  };

  const goNext = () => {
    const err = validateStep();
    if (err) {
      setStepError(err);
      toast.error(err);
      return;
    }
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

  /**
   * Returns an error message string when current step is invalid, or null when OK.
   */
  const validateStep = (): string | null => {
    switch (step) {
      case 1:
        if (state.idea.trim().length < 5) return "Опишите идею проекта (минимум 5 символов).";
        return null;
      case 2:
        if (!state.goal) return "Выберите основную цель сайта из списка.";
        if (state.goal === "other" && state.goalOther.trim().length < 2)
          return "Кратко опишите вашу цель в поле «Другое».";
        return null;
      case 3:
        if (!state.hasName) return "Выберите «Да» или «Нет».";
        if (state.hasName === "yes" && !state.projectName.trim())
          return "Укажите название проекта.";
        return null;
      case 4:
        if (!state.hasDomain) return "Выберите «Да» или «Нет».";
        if (state.hasDomain === "yes" && state.domain.trim().length < 3)
          return "Введите ваш домен (например, example.ru).";
        return null;
      case 5:
        if (!state.stage) return "Выберите стадию проекта.";
        if (state.stage === "other" && state.stageOther.trim().length < 2)
          return "Опишите стадию в поле «Другое».";
        return null;
      case 6:
        if (!state.knowsAudience) return "Выберите «Да» или «Нет».";
        return null;
      case 7:
        if (!state.knowsCompetitors) return "Выберите «Да» или «Нет».";
        if (
          state.knowsCompetitors === "yes" &&
          !state.competitors.some((c) => c.name.trim() || c.url.trim())
        )
          return "Укажите хотя бы одного конкурента — название или ссылку.";
        return null;
      case 8:
        if (state.competitorsLikes.trim().length < 5)
          return "Опишите, что нравится или не нравится у конкурентов (минимум 5 символов).";
        return null;
      case 9:
        if (!state.inspirationSites.some((s) => s.url.trim().length > 3))
          return "Добавьте хотя бы одну ссылку на сайт-вдохновение.";
        return null;
      case 10:
        if (!state.hasBranding) return "Выберите «Да» или «Нет».";
        return null;
      case 11:
        if (!state.legalForm) return "Выберите вашу юридическую форму.";
        return null;
      case 12:
        if (!state.usesExternal) return "Выберите «Да» или «Нет».";
        if (
          state.usesExternal === "yes" &&
          !Object.values(state.externalServices).some((e) => e.selected)
        )
          return "Отметьте хотя бы один используемый сервис.";
        return null;
      case 13:
        if (!state.needsAccount) return "Выберите один из вариантов.";
        if (state.needsAccount === "yes" && state.accountFunctions.trim().length < 5)
          return "Опишите, какой функционал нужен в личном кабинете.";
        return null;
      case 14: {
        const r = contactSchema.safeParse({
          contactName: state.contactName,
          channel: state.channel,
          channelValue: state.channelValue,
        });
        if (!r.success) {
          const first = r.error.issues[0];
          if (first.path[0] === "contactName") return "Укажите ваше имя (минимум 2 символа).";
          if (first.path[0] === "channel") return "Выберите канал связи: Telegram, WhatsApp или ВКонтакте.";
          if (first.path[0] === "channelValue") return "Укажите контакт для выбранного канала.";
          return first.message;
        }
        if (!consent) {
          setConsentError(true);
          return "Необходимо согласие на обработку персональных данных.";
        }
        return null;
      }
      case 15:
        if (!state.bigIdeaShared) return "Выберите «Пропустить» или «Рассказать».";
        if (state.bigIdeaShared === "yes" && state.bigIdea.trim().length < 5)
          return "Опишите вашу идею (минимум 5 символов) или нажмите «Пропустить».";
        return null;
      default:
        return null;
    }
  };

  const submit = async () => {
    const err = validateStep();
    if (err) {
      setStepError(err);
      toast.error(err);
      return;
    }
    setStepError(null);
    setSubmitting(true);
    try {
      const { price, days } = offer;
      // Normalize URLs (add https:// when missing) before persisting
      const normalizedState = {
        ...state,
        competitors: state.competitors.map((c) => ({
          name: c.name.trim(),
          url: normalizeUrl(c.url),
        })),
        inspirationSites: state.inspirationSites.map((s) => ({
          url: normalizeUrl(s.url),
          comment: s.comment.trim(),
        })),
      };
      const { error } = await (supabase.from("quiz_submissions") as any).insert({
        answers: { ...normalizedState, source },
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
      setDone(true);
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">Опросник «Бросить вызов» — узнайте цену и срок</DialogTitle>
        <DialogDescription className="sr-only">
          Ответьте на 15 коротких вопросов и узнайте ориентировочную цену и срок разработки сайта.
        </DialogDescription>

        {!done ? (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 border-b bg-background/95 px-6 py-4 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Шаг {step} из {totalSteps}
                </div>
                <button onClick={handleClose} className="rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label="Закрыть">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Progress value={(step / totalSteps) * 100} className="mt-3 h-1.5" />
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {step === 1 && (
                <StepWrap title="Расскажите об идее" subtitle="Опишите проект или бизнес одной–двумя фразами.">
                  <Textarea
                    placeholder='Например: "продаю самолёты" или "хочу открыть магазин одежды онлайн"'
                    value={state.idea}
                    onChange={(e) => update("idea", e.target.value)}
                    rows={4}
                    maxLength={500}
                  />
                </StepWrap>
              )}

              {step === 2 && (
                <StepWrap title="Какова основная цель сайта?">
                  <Select value={state.goal} onValueChange={(v) => update("goal", v as GoalKey)}>
                    <SelectTrigger><SelectValue placeholder="Выберите цель" /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(goalLabels) as GoalKey[]).map((g) => (
                        <SelectItem key={g} value={g}>{goalLabels[g]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {state.goal === "other" && (
                    <Input
                      placeholder="Опишите цель"
                      value={state.goalOther}
                      onChange={(e) => update("goalOther", e.target.value)}
                      className="mt-3"
                      maxLength={200}
                    />
                  )}
                </StepWrap>
              )}

              {step === 3 && (
                <StepWrap title="Есть ли название у проекта?">
                  <YesNo value={state.hasName} onChange={(v) => update("hasName", v)} />
                  {state.hasName === "yes" && (
                    <div className="mt-4 space-y-2">
                      <Label>Какое название у вашего сайта/проекта?</Label>
                      <Input
                        placeholder="Например: HulkWork"
                        value={state.projectName}
                        onChange={(e) => update("projectName", e.target.value)}
                        maxLength={120}
                      />
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 4 && (
                <StepWrap title="Есть ли зарегистрированный домен?">
                  <YesNo value={state.hasDomain} onChange={(v) => update("hasDomain", v)} />
                  {state.hasDomain === "yes" && (
                    <div className="mt-4 space-y-2">
                      <Label>Напишите свой домен</Label>
                      <Input
                        placeholder="example.ru"
                        value={state.domain}
                        onChange={(e) => update("domain", e.target.value)}
                        maxLength={120}
                      />
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 5 && (
                <StepWrap title="На какой стадии проект?">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {([
                      ["idea", "Идея"],
                      ["plan", "Бизнес-план"],
                      ["running", "Работающий бизнес"],
                      ["other", "Другое"],
                    ] as const).map(([k, l]) => (
                      <Button
                        key={k}
                        type="button"
                        variant={state.stage === k ? "default" : "outline"}
                        onClick={() => update("stage", k)}
                        className="h-auto py-3 text-xs sm:text-sm"
                      >
                        {l}
                      </Button>
                    ))}
                  </div>
                  {state.stage === "other" && (
                    <Input
                      placeholder="Опишите стадию"
                      value={state.stageOther}
                      onChange={(e) => update("stageOther", e.target.value)}
                      className="mt-3"
                      maxLength={200}
                    />
                  )}
                </StepWrap>
              )}

              {step === 6 && (
                <StepWrap title="Знаете ли вы свою целевую аудиторию?">
                  <YesNo value={state.knowsAudience} onChange={(v) => update("knowsAudience", v)} />
                  {state.knowsAudience === "yes" && (
                    <p className="mt-4 rounded-lg bg-accent/40 p-3 text-sm text-accent-foreground">
                      Отлично — менеджер будет готов к деталям.
                    </p>
                  )}
                </StepWrap>
              )}

              {step === 7 && (
                <StepWrap title="Знаете ли вы конкурентов в нише?">
                  <YesNo value={state.knowsCompetitors} onChange={(v) => update("knowsCompetitors", v)} />
                  {state.knowsCompetitors === "yes" && (
                    <div className="mt-4 space-y-3">
                      <Label>Названия и/или ссылки на их сайты</Label>
                      {state.competitors.map((c, i) => (
                        <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                          <Input
                            placeholder="Название компании"
                            value={c.name}
                            onChange={(e) => {
                              const arr = [...state.competitors];
                              arr[i] = { ...arr[i], name: e.target.value };
                              update("competitors", arr);
                            }}
                            maxLength={120}
                          />
                          <Input
                            placeholder="https://..."
                            value={c.url}
                            onChange={(e) => {
                              const arr = [...state.competitors];
                              arr[i] = { ...arr[i], url: e.target.value };
                              update("competitors", arr);
                            }}
                            maxLength={300}
                          />
                          {state.competitors.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => update("competitors", state.competitors.filter((_, idx) => idx !== i))}
                              aria-label="Удалить"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => update("competitors", [...state.competitors, { name: "", url: "" }])}
                      >
                        <Plus className="mr-2 h-3.5 w-3.5" /> Добавить ещё
                      </Button>
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 8 && showStep8 && (
                <StepWrap
                  title="Что нравится / не нравится у конкурентов?"
                  subtitle="Какие фишки или элементы хотите видеть на своём сайте — или, наоборот, избежать."
                >
                  <Textarea
                    rows={6}
                    maxLength={2000}
                    value={state.competitorsLikes}
                    onChange={(e) => update("competitorsLikes", e.target.value)}
                    placeholder="До 2000 символов"
                  />
                  <p className="mt-1 text-right text-xs text-muted-foreground">{state.competitorsLikes.length}/2000</p>
                </StepWrap>
              )}

              {step === 9 && (
                <StepWrap
                  title="Какие сайты нравятся как вдохновение?"
                  subtitle="Не обязательно из вашей ниши — главное, что цепляет дизайн или удобство."
                >
                  <div className="space-y-3">
                    {state.inspirationSites.map((s, i) => (
                      <div key={i} className="space-y-2 rounded-lg border p-3">
                        <div className="flex items-start gap-2">
                          <Input
                            placeholder="https://..."
                            value={s.url}
                            onChange={(e) => {
                              const arr = [...state.inspirationSites];
                              arr[i] = { ...arr[i], url: e.target.value };
                              update("inspirationSites", arr);
                            }}
                            maxLength={300}
                          />
                          {state.inspirationSites.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => update("inspirationSites", state.inspirationSites.filter((_, idx) => idx !== i))}
                              aria-label="Удалить"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <Textarea
                          placeholder="Что именно нравится?"
                          rows={2}
                          value={s.comment}
                          onChange={(e) => {
                            const arr = [...state.inspirationSites];
                            arr[i] = { ...arr[i], comment: e.target.value };
                            update("inspirationSites", arr);
                          }}
                          maxLength={500}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => update("inspirationSites", [...state.inspirationSites, { url: "", comment: "" }])}
                    >
                      <Plus className="mr-2 h-3.5 w-3.5" /> Добавить пример
                    </Button>
                  </div>
                </StepWrap>
              )}

              {step === 10 && (
                <StepWrap title="Есть ли фирменный стиль, логотип, брендбук?">
                  <YesNo value={state.hasBranding} onChange={(v) => update("hasBranding", v)} />
                  {state.hasBranding === "yes" && (
                    <p className="mt-4 rounded-lg bg-accent/40 p-3 text-sm text-accent-foreground">
                      Отлично — менеджер уже освобождает место для них.
                    </p>
                  )}
                  {state.hasBranding === "no" && (
                    <p className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                      Этот пункт не влияет на цену — мы можем создать стиль с нуля в рамках проекта.
                    </p>
                  )}
                </StepWrap>
              )}

              {step === 11 && (
                <StepWrap
                  title="Юридическая форма"
                  subtitle="Это важно для интеграции платёжных систем и юридических аспектов сайта."
                >
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {(["ИП", "ООО", "Самозанятый", "ОАО", "ЗАО", "Физлицо"] as LegalForm[]).map((l) => (
                      <Button
                        key={l}
                        type="button"
                        variant={state.legalForm === l ? "default" : "outline"}
                        onClick={() => update("legalForm", l)}
                        className="h-auto py-3 text-xs sm:text-sm"
                      >
                        {l === "Физлицо" ? "Я — обычный человек" : l}
                      </Button>
                    ))}
                  </div>
                </StepWrap>
              )}

              {step === 12 && (
                <StepWrap title="Используете внешние сервисы в работе?" subtitle="CRM, аналитика, складские, 1С, рассылки и т. д.">
                  <YesNo value={state.usesExternal} onChange={(v) => update("usesExternal", v)} />
                  {state.usesExternal === "yes" && (
                    <div className="mt-4 space-y-2">
                      <Label>Какие?</Label>
                      {(Object.keys(state.externalServices) as ExternalService[]).map((key) => {
                        const item = state.externalServices[key];
                        return (
                          <div key={key} className="rounded-lg border p-3">
                            <label className="flex items-center gap-2 text-sm">
                              <Checkbox
                                checked={item.selected}
                                onCheckedChange={(v) =>
                                  update("externalServices", {
                                    ...state.externalServices,
                                    [key]: { ...item, selected: !!v },
                                  })
                                }
                              />
                              {key}
                            </label>
                            {item.selected && (
                              <Input
                                className="mt-2"
                                placeholder="Уточните название/сервис"
                                value={item.details}
                                onChange={(e) =>
                                  update("externalServices", {
                                    ...state.externalServices,
                                    [key]: { ...item, details: e.target.value },
                                  })
                                }
                                maxLength={200}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 13 && (
                <StepWrap title="Нужен ли личный кабинет для пользователей?">
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      ["yes", "Да"],
                      ["no", "Нет"],
                      ["unknown", "Не знаю"],
                    ] as const).map(([k, l]) => (
                      <Button
                        key={k}
                        type="button"
                        variant={state.needsAccount === k ? "default" : "outline"}
                        onClick={() => update("needsAccount", k)}
                      >
                        {l}
                      </Button>
                    ))}
                  </div>
                  {state.needsAccount === "yes" && (
                    <div className="mt-4 space-y-2">
                      <Label>Какой функционал должен быть в личном кабинете?</Label>
                      <Textarea
                        rows={4}
                        maxLength={1500}
                        placeholder="Что должен видеть и делать пользователь?"
                        value={state.accountFunctions}
                        onChange={(e) => update("accountFunctions", e.target.value)}
                      />
                    </div>
                  )}
                </StepWrap>
              )}

              {step === 14 && (
                <StepWrap title="Как с вами связаться?">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Ваше имя</Label>
                      <Input
                        value={state.contactName}
                        onChange={(e) => update("contactName", e.target.value)}
                        placeholder="Имя"
                        maxLength={80}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Канал связи</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["telegram", "whatsapp", "vk"] as Channel[]).map((c) => (
                          <Button
                            key={c}
                            type="button"
                            variant={state.channel === c ? "default" : "outline"}
                            onClick={() => { update("channel", c); update("channelValue", ""); }}
                          >
                            {channelMask[c].label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    {state.channel && (
                      <div className="space-y-2">
                        <Label>{channelMask[state.channel].label}</Label>
                        <Input
                          placeholder={channelMask[state.channel].placeholder}
                          value={state.channelValue}
                          onChange={(e) => update("channelValue", e.target.value)}
                          maxLength={200}
                        />
                      </div>
                    )}
                    <ConsentCheckbox
                      checked={consent}
                      onChange={(v) => { setConsent(v); if (v) setConsentError(false); }}
                      error={consentError}
                    />
                  </div>
                </StepWrap>
              )}

              {step === 15 && (
                <StepWrap
                  title="Если бы не было ограничений…"
                  subtitle="Что хотели бы видеть на сайте? Самые смелые идеи и фишки. Мы можем почти всё."
                >
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={state.bigIdeaShared === "no" ? "default" : "outline"}
                      onClick={() => { update("bigIdeaShared", "no"); update("bigIdea", ""); }}
                    >
                      Пропустить
                    </Button>
                    <Button
                      type="button"
                      variant={state.bigIdeaShared === "yes" ? "default" : "outline"}
                      onClick={() => update("bigIdeaShared", "yes")}
                    >
                      Рассказать
                    </Button>
                  </div>
                  {state.bigIdeaShared === "yes" && (
                    <Textarea
                      className="mt-3"
                      rows={6}
                      maxLength={2000}
                      placeholder="До 2000 символов"
                      value={state.bigIdea}
                      onChange={(e) => update("bigIdea", e.target.value)}
                    />
                  )}
                </StepWrap>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 z-10 border-t bg-background/95 px-6 py-4 backdrop-blur">
              {stepError && (
                <div
                  role="alert"
                  className="mb-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{stepError}</span>
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={goPrev}
                  disabled={step === 1 || submitting}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </Button>
                {step < totalSteps ? (
                  <Button type="button" onClick={goNext} className="gap-2 font-heading">
                    Дальше <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="gap-2 font-heading"
                  >
                    {submitting ? "Отправляем…" : "Узнать цену и срок"}
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <ResultScreen
            offer={offer}
            hasExternal={state.usesExternal === "yes"}
            hasAccount={state.needsAccount === "yes"}
            onClose={handleClose}
          />
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

const YesNo = ({ value, onChange }: { value: "yes" | "no" | ""; onChange: (v: "yes" | "no") => void }) => (
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant={value === "yes" ? "default" : "outline"} onClick={() => onChange("yes")}>
      Да
    </Button>
    <Button type="button" variant={value === "no" ? "default" : "outline"} onClick={() => onChange("no")}>
      Нет
    </Button>
  </div>
);

const ResultScreen = ({
  offer,
  hasExternal,
  hasAccount,
  onClose,
}: {
  offer: { price: number; days: number };
  hasExternal: boolean;
  hasAccount: boolean;
  onClose: () => void;
}) => (
  <div className="px-6 py-10 text-center">
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
      <CheckCircle2 className="h-8 w-8" />
    </div>
    <h3 className="font-heading text-2xl font-bold">Спасибо! Заявка принята.</h3>
    <p className="mt-2 text-muted-foreground">
      Мы свяжемся с вами в ближайшее время. А вот предварительная оценка:
    </p>

    <div className="mt-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/30 p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Цена</p>
          <p className="font-heading text-3xl font-extrabold text-primary">${offer.price}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Срок</p>
          <p className="font-heading text-3xl font-extrabold text-primary">{offer.days} {offer.days === 1 ? "день" : offer.days < 5 ? "дня" : "дней"}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {hasAccount && hasExternal && "С учётом личного кабинета и интеграции внешних сервисов."}
        {!hasAccount && hasExternal && "С учётом интеграции внешних сервисов."}
        {!hasExternal && !hasAccount && "Базовый сайт без личного кабинета и внешних интеграций."}
      </p>
    </div>

    <div className="mt-5 space-y-2 text-left text-xs text-muted-foreground">
      <p>
        <strong>Важно:</strong> цена может незначительно измениться после модерации — строго по согласованию,
        если мы увидим, какими функциями или технологиями можно улучшить ваш ресурс.
      </p>
      <p>В цену уже включён <strong>хостинг на год</strong>. Стоимость домена не входит.</p>
      <p>Срок отсчитывается с момента получения полной информации по проекту.</p>
    </div>

    <Button onClick={onClose} className="mt-6 w-full font-heading" size="lg">
      Закрыть
    </Button>
  </div>
);

export default QuizDialog;