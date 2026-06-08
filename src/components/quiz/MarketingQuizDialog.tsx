import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, X, AlertCircle, Heart } from "lucide-react";
import { toast } from "sonner";
import { useQuiz } from "./QuizContext";
import { supabase } from "@/integrations/supabase/client";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { sendClientConfirmation } from "@/lib/clientEmail";
import { logConsent } from "@/lib/consent";
import { useLanguage } from "@/i18n/LanguageContext";

type Channel = "telegram" | "whatsapp" | "vk" | "email";

interface MState {
  goal: string; goalOther: string;
  result6_12: string;
  benchmarks: string; benchmarksLocal: string;
  has: string[];
  clientsPerMonth: string;
  avgCheck: string;
  margin: string;
  scaleReady: string;
  teamSize: string;
  salesHandler: string;
  budget: string;
  payback: string;
  budgetType: string;
  cooperation: string;
  meetingFreq: string;
  commsChannel: string;
  critical: string[];
  channels: string[];
  constraints: string; constraintsOther: string;
  deadline: string;
  prevAgency: string;
  contactName: string; channel: Channel | ""; channelValue: string;
}

const initialState: MState = {
  goal: "", goalOther: "",
  result6_12: "",
  benchmarks: "", benchmarksLocal: "",
  has: [],
  clientsPerMonth: "", avgCheck: "", margin: "", scaleReady: "",
  teamSize: "", salesHandler: "",
  budget: "", payback: "", budgetType: "",
  cooperation: "", meetingFreq: "", commsChannel: "",
  critical: [], channels: [],
  constraints: "", constraintsOther: "",
  deadline: "", prevAgency: "",
  contactName: "", channel: "", channelValue: "",
};

type Opt = { v: string; label: string };

const goalOptionsRu: Opt[] = [
  { v: "launch", label: "Запустить новый бизнес / продукт с нуля" },
  { v: "grow_sales", label: "Увеличить продажи существующего бизнеса" },
  { v: "awareness", label: "Улучшить узнаваемость бренда" },
  { v: "leader", label: "Занять лидирующую позицию в нише" },
  { v: "other", label: "Другое" },
];
const goalOptionsEn: Opt[] = [
  { v: "launch", label: "Launch a new business / product from scratch" },
  { v: "grow_sales", label: "Grow sales of an existing business" },
  { v: "awareness", label: "Improve brand awareness" },
  { v: "leader", label: "Take a leading position in the niche" },
  { v: "other", label: "Other" },
];

const result6_12Ru: Opt[] = [
  { v: "first_sales", label: "Первые продажи / клиенты" },
  { v: "x2_3", label: "Увеличение продаж в 2-3 раза" },
  { v: "x5", label: "Увеличение продаж в 5+ раз" },
  { v: "leader", label: "Стать лидером рынка в своей нише" },
  { v: "skip", label: "Затрудняюсь ответить / пропустить" },
];
const result6_12En: Opt[] = [
  { v: "first_sales", label: "First sales / clients" },
  { v: "x2_3", label: "Sales growth 2–3×" },
  { v: "x5", label: "Sales growth 5×+" },
  { v: "leader", label: "Become the market leader in the niche" },
  { v: "skip", label: "Hard to say / skip" },
];

const benchmarksRu: Opt[] = [
  { v: "federal", label: "Вкусно и точка, Яндекс, Сбербанк (крупные федеральные)" },
  { v: "local", label: "Успешные локальные конкуренты" },
  { v: "other_industry", label: "Компании из других отраслей (Apple, Netflix и т.п.)" },
  { v: "consult", label: "Не знаю, нужна консультация" },
];
const benchmarksEn: Opt[] = [
  { v: "federal", label: "Large national companies (McDonald's, Google, etc.)" },
  { v: "local", label: "Successful local competitors" },
  { v: "other_industry", label: "Companies from other industries (Apple, Netflix, etc.)" },
  { v: "consult", label: "Don't know, need consultation" },
];

const hasRu: Opt[] = [
  { v: "product", label: "Готовый продукт / услуга" },
  { v: "site", label: "Работающий сайт" },
  { v: "social", label: "Активные соцсети" },
  { v: "clients", label: "База текущих клиентов" },
  { v: "sales_team", label: "Команда продаж" },
  { v: "idea", label: "Ничего — только идея" },
];
const hasEn: Opt[] = [
  { v: "product", label: "Finished product / service" },
  { v: "site", label: "Working website" },
  { v: "social", label: "Active social channels" },
  { v: "clients", label: "Existing customer base" },
  { v: "sales_team", label: "Sales team" },
  { v: "idea", label: "Nothing — just an idea" },
];

const clientsRu: Opt[] = [
  { v: "0", label: "Нет клиентов (запуск)" },
  { v: "1_5", label: "1–5 клиентов" },
  { v: "5_20", label: "5–20 клиентов" },
  { v: "20_50", label: "20–50 клиентов" },
  { v: "50plus", label: "50+ клиентов" },
];
const clientsEn: Opt[] = [
  { v: "0", label: "No clients (launch)" },
  { v: "1_5", label: "1–5 clients" },
  { v: "5_20", label: "5–20 clients" },
  { v: "20_50", label: "20–50 clients" },
  { v: "50plus", label: "50+ clients" },
];

const checkRu: Opt[] = [
  { v: "lt5", label: "До 5 000 ₽" },
  { v: "5_25", label: "5 000 – 25 000 ₽" },
  { v: "25_100", label: "25 000 – 100 000 ₽" },
  { v: "100_500", label: "100 000 – 500 000 ₽" },
  { v: "gt500", label: "Свыше 500 000 ₽" },
  { v: "unknown", label: "Не знаю точно" },
];
const checkEn: Opt[] = [
  { v: "lt5", label: "Up to $60" },
  { v: "5_25", label: "$60 – $300" },
  { v: "25_100", label: "$300 – $1,200" },
  { v: "100_500", label: "$1,200 – $6,000" },
  { v: "gt500", label: "Over $6,000" },
  { v: "unknown", label: "Not sure" },
];

const marginRu: Opt[] = [
  { v: "lt20", label: "До 20%" }, { v: "20_40", label: "20–40%" },
  { v: "40_60", label: "40–60%" }, { v: "gt60", label: "Свыше 60%" },
  { v: "unknown", label: "Не знаю" },
];
const marginEn: Opt[] = [
  { v: "lt20", label: "Up to 20%" }, { v: "20_40", label: "20–40%" },
  { v: "40_60", label: "40–60%" }, { v: "gt60", label: "Over 60%" },
  { v: "unknown", label: "Don't know" },
];

const scaleRu: Opt[] = [
  { v: "yes", label: "Да, без проблем" },
  { v: "need_hire", label: "Справимся, но нужно нанять людей" },
  { v: "need_change", label: "Нет, нужно менять процессы" },
  { v: "no", label: "Нет, нет такой готовности" },
  { v: "unknown", label: "Затрудняюсь ответить" },
];
const scaleEn: Opt[] = [
  { v: "yes", label: "Yes, no problem" },
  { v: "need_hire", label: "We'll cope, but need to hire" },
  { v: "need_change", label: "No, we need to change processes" },
  { v: "no", label: "No, we are not ready" },
  { v: "unknown", label: "Hard to say" },
];

const teamRu: Opt[] = [
  { v: "solo", label: "Я один(а)" }, { v: "2_3", label: "2–3 человека" },
  { v: "4_10", label: "4–10 человек" }, { v: "10plus", label: "10+ человек" },
];
const teamEn: Opt[] = [
  { v: "solo", label: "Just me" }, { v: "2_3", label: "2–3 people" },
  { v: "4_10", label: "4–10 people" }, { v: "10plus", label: "10+ people" },
];

const salesHandlerRu: Opt[] = [
  { v: "self", label: "Я сам(а)" },
  { v: "one_person", label: "Один человек в команде" },
  { v: "department", label: "Специальный отдел продаж" },
  { v: "auto", label: "Автоматизированная система" },
];
const salesHandlerEn: Opt[] = [
  { v: "self", label: "Myself" },
  { v: "one_person", label: "One person on the team" },
  { v: "department", label: "Dedicated sales department" },
  { v: "auto", label: "Automated system" },
];

const budgetRu: Opt[] = [
  { v: "lt50", label: "До 50 000 ₽" },
  { v: "50_150", label: "50 000 – 150 000 ₽" },
  { v: "150_300", label: "150 000 – 300 000 ₽" },
  { v: "300_500", label: "300 000 – 500 000 ₽" },
  { v: "gt500", label: "Свыше 500 000 ₽" },
  { v: "discuss", label: "Обсуждаемо, готов ответить после аналитики рынка" },
];
const budgetEn: Opt[] = [
  { v: "lt50", label: "Up to $600" },
  { v: "50_150", label: "$600 – $1,800" },
  { v: "150_300", label: "$1,800 – $3,500" },
  { v: "300_500", label: "$3,500 – $6,000" },
  { v: "gt500", label: "Over $6,000" },
  { v: "discuss", label: "Open to discuss after market analysis" },
];

const paybackRu: Opt[] = [
  { v: "first", label: "Окупаемость с первой продажи (быстрый результат)" },
  { v: "long", label: "Готов(а) инвестировать на привлечение, зарабатывать на повторных покупках" },
  { v: "consult", label: "Не знаю, нужна консультация" },
];
const paybackEn: Opt[] = [
  { v: "first", label: "Payback from first sale (fast result)" },
  { v: "long", label: "Ready to invest in acquisition, earn on repeat purchases" },
  { v: "consult", label: "Don't know, need consultation" },
];

const budgetTypeRu: Opt[] = [
  { v: "fixed", label: "Фиксированная статья расходов" },
  { v: "results", label: "Зависит от результатов" },
  { v: "tbd", label: "Еще не определили" },
];
const budgetTypeEn: Opt[] = [
  { v: "fixed", label: "Fixed expense line" },
  { v: "results", label: "Depends on results" },
  { v: "tbd", label: "Not yet decided" },
];

const cooperationRu: Opt[] = [
  { v: "turnkey", label: "«Сделайте всё под ключ, я смотрю отчеты»" },
  { v: "involved", label: "«Я участвую в каждом решении»" },
  { v: "advisory", label: "«Даёте рекомендации, я решаю»" },
  { v: "consult", label: "«Не знаю, нужна консультация»" },
];
const cooperationEn: Opt[] = [
  { v: "turnkey", label: "\"Do everything turnkey, I'll review reports\"" },
  { v: "involved", label: "\"I'm involved in every decision\"" },
  { v: "advisory", label: "\"You advise, I decide\"" },
  { v: "consult", label: "\"Don't know, need consultation\"" },
];

const meetingFreqRu: Opt[] = [
  { v: "weekly", label: "Еженедельно" }, { v: "biweekly", label: "Раз в две недели" },
  { v: "monthly", label: "Раз в месяц" }, { v: "ondemand", label: "По необходимости" },
];
const meetingFreqEn: Opt[] = [
  { v: "weekly", label: "Weekly" }, { v: "biweekly", label: "Bi-weekly" },
  { v: "monthly", label: "Monthly" }, { v: "ondemand", label: "As needed" },
];

const commsChannelRu: Opt[] = [
  { v: "call", label: "Звонок / Google Meet / Яндекс.Телемост / Zoom" },
  { v: "messenger", label: "Telegram / WhatsApp" },
  { v: "email", label: "Email" },
  { v: "any", label: "Не важно" },
];
const commsChannelEn: Opt[] = [
  { v: "call", label: "Call / Google Meet / Zoom" },
  { v: "messenger", label: "Telegram / WhatsApp" },
  { v: "email", label: "Email" },
  { v: "any", label: "No preference" },
];

const criticalRu: Opt[] = [
  { v: "speed", label: "Быстрый результат" },
  { v: "cheap", label: "Низкая стоимость" },
  { v: "quality", label: "Качество и долгосрочный результат" },
  { v: "transparency", label: "Полная прозрачность процесса" },
  { v: "min_time", label: "Минимум моего времени на координацию" },
  { v: "innovation", label: "Инновационные подходы" },
];
const criticalEn: Opt[] = [
  { v: "speed", label: "Fast result" },
  { v: "cheap", label: "Low cost" },
  { v: "quality", label: "Quality and long-term result" },
  { v: "transparency", label: "Full process transparency" },
  { v: "min_time", label: "Minimum coordination time from me" },
  { v: "innovation", label: "Innovative approaches" },
];

const channelsRu: Opt[] = [
  { v: "context_ads", label: "Контекстная реклама (Яндекс, Google)" },
  { v: "social", label: "Социальные сети (Instagram, VK, TikTok)" },
  { v: "seo", label: "SEO (органический поиск)" },
  { v: "email_sms", label: "Email / SMS рассылки" },
  { v: "content", label: "Контент-маркетинг (блог, видео)" },
  { v: "trust", label: "Не знаю, готов доверить решение HulkWork Studio" },
];
const channelsEn: Opt[] = [
  { v: "context_ads", label: "Paid search (Google, Yandex)" },
  { v: "social", label: "Social media (Instagram, TikTok, VK)" },
  { v: "seo", label: "SEO (organic search)" },
  { v: "email_sms", label: "Email / SMS campaigns" },
  { v: "content", label: "Content marketing (blog, video)" },
  { v: "trust", label: "Don't know — happy to trust HulkWork Studio" },
];

const constraintsRu: Opt[] = [
  { v: "no", label: "Нет" },
  { v: "channels", label: "Не можем работать с определёнными каналами" },
  { v: "tech", label: "Есть технические ограничения" },
  { v: "other", label: "Другое" },
];
const constraintsEn: Opt[] = [
  { v: "no", label: "No" },
  { v: "channels", label: "Can't work with certain channels" },
  { v: "tech", label: "There are technical limitations" },
  { v: "other", label: "Other" },
];

const deadlineRu: Opt[] = [
  { v: "urgent", label: "Срочно (в течение месяца)" },
  { v: "2_3m", label: "В течение 2–3 месяцев" },
  { v: "6m", label: "В течение 6 месяцев" },
  { v: "no_rush", label: "Нет спешки" },
];
const deadlineEn: Opt[] = [
  { v: "urgent", label: "Urgent (within a month)" },
  { v: "2_3m", label: "Within 2–3 months" },
  { v: "6m", label: "Within 6 months" },
  { v: "no_rush", label: "No rush" },
];

const prevAgencyRu: Opt[] = [
  { v: "good", label: "Да, был успешный опыт" },
  { v: "bad", label: "Да, был неудачный опыт" },
  { v: "first", label: "Нет, первый раз" },
];
const prevAgencyEn: Opt[] = [
  { v: "good", label: "Yes, successful experience" },
  { v: "bad", label: "Yes, unsuccessful experience" },
  { v: "first", label: "No, first time" },
];

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

const TOTAL_STEPS = 22;

const findLabel = (opts: Opt[], v: string) => opts.find((o) => o.v === v)?.label || "—";

const MarketingQuizDialog = () => {
  const { open, closeQuiz, source, track } = useQuiz();
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const isOpen = open && track === "marketing";

  const goalOptions = isEn ? goalOptionsEn : goalOptionsRu;
  const result6_12Options = isEn ? result6_12En : result6_12Ru;
  const benchmarksOptions = isEn ? benchmarksEn : benchmarksRu;
  const hasOptions = isEn ? hasEn : hasRu;
  const clientsOptions = isEn ? clientsEn : clientsRu;
  const checkOptions = isEn ? checkEn : checkRu;
  const marginOptions = isEn ? marginEn : marginRu;
  const scaleOptions = isEn ? scaleEn : scaleRu;
  const teamOptions = isEn ? teamEn : teamRu;
  const salesHandlerOptions = isEn ? salesHandlerEn : salesHandlerRu;
  const budgetOptions = isEn ? budgetEn : budgetRu;
  const paybackOptions = isEn ? paybackEn : paybackRu;
  const budgetTypeOptions = isEn ? budgetTypeEn : budgetTypeRu;
  const cooperationOptions = isEn ? cooperationEn : cooperationRu;
  const meetingFreqOptions = isEn ? meetingFreqEn : meetingFreqRu;
  const commsChannelOptions = isEn ? commsChannelEn : commsChannelRu;
  const criticalOptions = isEn ? criticalEn : criticalRu;
  const channelsOptions = isEn ? channelsEn : channelsRu;
  const constraintsOptions = isEn ? constraintsEn : constraintsRu;
  const deadlineOptions = isEn ? deadlineEn : deadlineRu;
  const prevAgencyOptions = isEn ? prevAgencyEn : prevAgencyRu;
  const channelMask = isEn ? channelMaskEn : channelMaskRu;

  const contactSchemas: Record<Channel, z.ZodTypeAny> = {
    telegram: z.string().trim().min(3).max(80).refine(
      (v) => /^@?[a-zA-Z0-9_]{4,32}$/.test(v) || /^\+?\d[\d\s\-()]{7,20}$/.test(v),
      isEn ? "Enter @username or phone in international format" : "Введите @username или номер в формате +7…"
    ),
    whatsapp: z.string().trim().min(7).max(30).refine(
      (v) => /^\+?\d[\d\s\-()]{7,20}$/.test(v),
      isEn ? "Phone in international format" : "Номер в формате +7 999 123-45-67"
    ),
    vk: z.string().trim().min(3).max(150).refine(
      (v) => /vk\.com\//i.test(v) || /^[a-zA-Z0-9_.]{3,}$/.test(v),
      isEn ? "Link like https://vk.com/username or your ID" : "Ссылка вида https://vk.com/username или ваш ID"
    ),
    email: z.string().trim().email(isEn ? "Enter a valid email" : "Введите корректный email").max(200),
  };

  const [step, setStep] = useState(1);
  const [state, setState] = useState<MState>(initialState);
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

  const update = <K extends keyof MState>(key: K, value: MState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    if (stepError) setStepError(null);
  };

  const toggleArr = (key: "has" | "critical" | "channels", v: string, max?: number) => {
    setState((s) => {
      const arr = s[key];
      if (arr.includes(v)) return { ...s, [key]: arr.filter((x) => x !== v) };
      if (max && arr.length >= max) return s;
      return { ...s, [key]: [...arr, v] };
    });
    if (stepError) setStepError(null);
  };

  const T = {
    chooseGoal: isEn ? "Choose a main goal." : "Выберите главную цель.",
    describeGoal: isEn ? "Describe your goal." : "Опишите вашу цель.",
    chooseResult: isEn ? "Choose the expected result." : "Выберите ожидаемый результат.",
    chooseOption: isEn ? "Choose an option." : "Выберите вариант.",
    chooseAtLeastOne: isEn ? "Choose at least one option." : "Выберите хотя бы один вариант.",
    nameLocal: isEn ? "Name your local competitors." : "Укажите имена локальных конкурентов.",
    chooseBudget: isEn ? "Choose a budget." : "Выберите бюджет.",
    noMoreThan3: isEn ? "No more than 3 options." : "Не больше 3 вариантов.",
    chooseChannel: isEn ? "Choose at least one channel." : "Выберите хотя бы один канал.",
    describeConstraint: isEn ? "Describe the constraint." : "Опишите ограничение.",
    enterName: isEn ? "Enter your name." : "Укажите ваше имя.",
    chooseContact: isEn ? "Choose a contact channel." : "Выберите удобный канал связи.",
    checkContact: isEn ? "Check contact details." : "Проверьте контактные данные.",
    consentReq: isEn ? "Consent to personal data processing is required." : "Необходимо согласие на обработку персональных данных.",
  };

  const validateStep = (): string | null => {
    switch (step) {
      case 1:
        if (!state.goal) return T.chooseGoal;
        if (state.goal === "other" && state.goalOther.trim().length < 3) return T.describeGoal;
        return null;
      case 2: return state.result6_12 ? null : T.chooseResult;
      case 3:
        if (!state.benchmarks) return T.chooseOption;
        if (state.benchmarks === "local" && state.benchmarksLocal.trim().length < 2) return T.nameLocal;
        return null;
      case 4: return state.has.length === 0 ? T.chooseAtLeastOne : null;
      case 5: return state.clientsPerMonth ? null : T.chooseOption;
      case 6: return state.avgCheck ? null : T.chooseOption;
      case 7: return state.margin ? null : T.chooseOption;
      case 8: return state.scaleReady ? null : T.chooseOption;
      case 9: return state.teamSize ? null : T.chooseOption;
      case 10: return state.salesHandler ? null : T.chooseOption;
      case 11: return state.budget ? null : T.chooseBudget;
      case 12: return state.payback ? null : T.chooseOption;
      case 13: return state.budgetType ? null : T.chooseOption;
      case 14: return state.cooperation ? null : T.chooseOption;
      case 15: return state.meetingFreq ? null : T.chooseOption;
      case 16: return state.commsChannel ? null : T.chooseOption;
      case 17:
        if (state.critical.length === 0) return T.chooseAtLeastOne;
        if (state.critical.length > 3) return T.noMoreThan3;
        return null;
      case 18: return state.channels.length === 0 ? T.chooseChannel : null;
      case 19:
        if (!state.constraints) return T.chooseOption;
        if (state.constraints === "other" && state.constraintsOther.trim().length < 3) return T.describeConstraint;
        return null;
      case 20: return state.deadline ? null : T.chooseOption;
      case 21: return state.prevAgency ? null : T.chooseOption;
      case 22: {
        if (state.contactName.trim().length < 2) return T.enterName;
        if (!state.channel) return T.chooseContact;
        const r = contactSchemas[state.channel].safeParse(state.channelValue);
        if (!r.success) return r.error.issues[0]?.message || T.checkContact;
        if (!consent) { setConsentError(true); return T.consentReq; }
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

  const submit = async () => {
    const err = validateStep();
    if (err) { setStepError(err); toast.error(err); return; }
    setStepError(null);
    setSubmitting(true);
    try {
      const otherLabel = isEn ? "Other" : "Другое";
      const localLabel = isEn ? "Local competitors" : "Локальные конкуренты";
      const answersHuman = {
        goal: state.goal === "other" ? `${otherLabel}: ${state.goalOther}` : findLabel(goalOptions, state.goal),
        result6_12: findLabel(result6_12Options, state.result6_12),
        benchmarks: state.benchmarks === "local"
          ? `${localLabel}: ${state.benchmarksLocal}`
          : findLabel(benchmarksOptions, state.benchmarks),
        has: state.has.map((v) => findLabel(hasOptions, v)),
        clientsPerMonth: findLabel(clientsOptions, state.clientsPerMonth),
        avgCheck: findLabel(checkOptions, state.avgCheck),
        margin: findLabel(marginOptions, state.margin),
        scaleReady: findLabel(scaleOptions, state.scaleReady),
        teamSize: findLabel(teamOptions, state.teamSize),
        salesHandler: findLabel(salesHandlerOptions, state.salesHandler),
        budget: findLabel(budgetOptions, state.budget),
        payback: findLabel(paybackOptions, state.payback),
        budgetType: findLabel(budgetTypeOptions, state.budgetType),
        cooperation: findLabel(cooperationOptions, state.cooperation),
        meetingFreq: findLabel(meetingFreqOptions, state.meetingFreq),
        commsChannel: findLabel(commsChannelOptions, state.commsChannel),
        critical: state.critical.map((v) => findLabel(criticalOptions, v)),
        channels: state.channels.map((v) => findLabel(channelsOptions, v)),
        constraints: state.constraints === "other"
          ? `${otherLabel}: ${state.constraintsOther}`
          : findLabel(constraintsOptions, state.constraints),
        deadline: findLabel(deadlineOptions, state.deadline),
        prevAgency: findLabel(prevAgencyOptions, state.prevAgency),
      };

      const { error } = await (supabase.from("quiz_submissions") as any).insert({
        answers: { ...state, humanReadable: answersHuman, track: "marketing", source, lang },
        contact_name: state.contactName,
        contact_channel: state.channel || "unknown",
        contact_value: state.channelValue,
        estimated_price_usd: 0, estimated_days: 0,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });
      if (error) throw error;
      logConsent("marketing_quiz_submission");

      try {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "lead-notification",
            recipientEmail: "Prezidenthulk@gmail.com",
            idempotencyKey: `marketing-quiz-${crypto.randomUUID()}`,
            templateData: {
              source: "marketing_quiz_submission",
              name: state.contactName,
              contact: state.channelValue,
              contactChannel: state.channel,
              pageUrl: typeof window !== "undefined" ? window.location.href : "",
              submittedAt: new Date().toLocaleString(isEn ? "en-US" : "ru-RU"),
              quizAnswers: answersHuman,
              formLang: lang,
            },
          },
        });
      } catch (e) { console.warn("marketing lead notification failed", e); }
      await sendClientConfirmation({
        contact: state.channelValue,
        name: state.contactName,
        lang,
        source: "marketing_quiz_submission",
        track: "smm",
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
        <DialogTitle className="sr-only">{isEn ? "Marketing & SMM quiz" : "Опросник по маркетингу и SMM"}</DialogTitle>
        <DialogDescription className="sr-only">
          {isEn ? "Answer 22 quick questions — a manager will reach out within 12 hours." : "Ответьте на 22 коротких вопроса — менеджер свяжется с вами в течение 12 часов."}
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
                <StepWrap title={isEn ? "What is your main goal?" : "Какова ваша главная цель?"}>
                  <OptionList options={goalOptions} value={state.goal} onChange={(v) => update("goal", v)} />
                  {state.goal === "other" && (
                    <Input className="mt-3" placeholder={isEn ? "Describe your goal" : "Опишите вашу цель"}
                      value={state.goalOther} onChange={(e) => update("goalOther", e.target.value)} maxLength={300} />
                  )}
                </StepWrap>
              )}
              {step === 2 && (
                <StepWrap title={isEn ? "What result do you expect in 6–12 months?" : "На какой результат вы рассчитываете за 6–12 месяцев?"}>
                  <OptionList options={result6_12Options} value={state.result6_12} onChange={(v) => update("result6_12", v)} />
                </StepWrap>
              )}
              {step === 3 && (
                <StepWrap title={isEn ? "Which companies do you take as examples?" : "Какие компании вы берёте за пример?"}>
                  <OptionList options={benchmarksOptions} value={state.benchmarks} onChange={(v) => update("benchmarks", v)} />
                  {state.benchmarks === "local" && (
                    <Input className="mt-3" placeholder={isEn ? "Name 1–3 local competitors" : "Назовите 1–3 локальных конкурента"}
                      value={state.benchmarksLocal} onChange={(e) => update("benchmarksLocal", e.target.value)} maxLength={300} />
                  )}
                </StepWrap>
              )}
              {step === 4 && (
                <StepWrap title={isEn ? "What do you already have?" : "Что у вас уже готово?"} subtitle={isEn ? "Choose several options." : "Можно выбрать несколько вариантов."}>
                  <CheckList options={hasOptions} values={state.has} onToggle={(v) => toggleArr("has", v)} />
                  {state.has.includes("idea") && (
                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">
                      <Heart className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{isEn ? "Great — we can help! The most interesting projects start from an idea, and we know how to bring them to market." : "Отлично — мы можем помочь! С идеи начинаются самые интересные проекты, и мы умеем выводить их на рынок."}</span>
                    </div>
                  )}
                </StepWrap>
              )}
              {step === 5 && (<StepWrap title={isEn ? "How many clients / sales do you have per month now?" : "Сколько клиентов / продаж у вас сейчас в месяц?"}>
                <OptionList options={clientsOptions} value={state.clientsPerMonth} onChange={(v) => update("clientsPerMonth", v)} /></StepWrap>)}
              {step === 6 && (<StepWrap title={isEn ? "Average check / one sale amount?" : "Средний чек / сумма одной продажи?"}>
                <OptionList options={checkOptions} value={state.avgCheck} onChange={(v) => update("avgCheck", v)} /></StepWrap>)}
              {step === 7 && (<StepWrap title={isEn ? "Margin (profit per sale)?" : "Маржинальность (прибыль на одной продаже)?"}>
                <OptionList options={marginOptions} value={state.margin} onChange={(v) => update("margin", v)} /></StepWrap>)}
              {step === 8 && (<StepWrap title={isEn ? "If tomorrow you get 10× more leads — can your business handle it?" : "Если завтра приходит в 10 раз больше заявок — ваш бизнес справится?"}>
                <OptionList options={scaleOptions} value={state.scaleReady} onChange={(v) => update("scaleReady", v)} /></StepWrap>)}
              {step === 9 && (<StepWrap title={isEn ? "How many people in your team?" : "Сколько человек в вашей команде?"}>
                <OptionList options={teamOptions} value={state.teamSize} onChange={(v) => update("teamSize", v)} /></StepWrap>)}
              {step === 10 && (<StepWrap title={isEn ? "Who handles leads / sales?" : "Кто обрабатывает заявки / продажи?"}>
                <OptionList options={salesHandlerOptions} value={state.salesHandler} onChange={(v) => update("salesHandler", v)} /></StepWrap>)}
              {step === 11 && (<StepWrap title={isEn ? "Monthly marketing budget for the first 2–3 months?" : "Какой ежемесячный бюджет вы готовы выделить на маркетинг в первые 2–3 месяца?"}>
                <OptionList options={budgetOptions} value={state.budget} onChange={(v) => update("budget", v)} /></StepWrap>)}
              {step === 12 && (<StepWrap title={isEn ? "How do you think about payback?" : "Как вы рассчитываете окупаемость?"}>
                <OptionList options={paybackOptions} value={state.payback} onChange={(v) => update("payback", v)} /></StepWrap>)}
              {step === 13 && (<StepWrap title={isEn ? "Marketing budget for you is:" : "Бюджет на маркетинг для вас — это:"}>
                <OptionList options={budgetTypeOptions} value={state.budgetType} onChange={(v) => update("budgetType", v)} /></StepWrap>)}
              {step === 14 && (<StepWrap title={isEn ? "How do you see cooperation?" : "Как вы видите сотрудничество?"}>
                <OptionList options={cooperationOptions} value={state.cooperation} onChange={(v) => update("cooperation", v)} /></StepWrap>)}
              {step === 15 && (<StepWrap title={isEn ? "How often are you ready to meet / sync?" : "Как часто вы готовы встречаться / общаться?"}>
                <OptionList options={meetingFreqOptions} value={state.meetingFreq} onChange={(v) => update("meetingFreq", v)} /></StepWrap>)}
              {step === 16 && (<StepWrap title={isEn ? "How do you prefer to communicate?" : "Как вам удобнее общаться?"}>
                <OptionList options={commsChannelOptions} value={state.commsChannel} onChange={(v) => update("commsChannel", v)} /></StepWrap>)}
              {step === 17 && (
                <StepWrap title={isEn ? "What is critical for you?" : "Что для вас критично?"} subtitle={isEn ? `Choose up to 3 options (${state.critical.length}/3).` : `Выберите до 3 вариантов (${state.critical.length}/3).`}>
                  <CheckList options={criticalOptions} values={state.critical} onToggle={(v) => toggleArr("critical", v, 3)} />
                </StepWrap>
              )}
              {step === 18 && (
                <StepWrap title={isEn ? "Which marketing channels interest you?" : "Какие каналы маркетинга вас интересуют?"} subtitle={isEn ? "Choose several." : "Можно выбрать несколько."}>
                  <CheckList options={channelsOptions} values={state.channels} onToggle={(v) => toggleArr("channels", v)} />
                </StepWrap>
              )}
              {step === 19 && (
                <StepWrap title={isEn ? "Do you have specific limitations?" : "Есть ли у вас конкретные ограничения?"}>
                  <OptionList options={constraintsOptions} value={state.constraints} onChange={(v) => update("constraints", v)} />
                  {state.constraints === "other" && (
                    <Textarea className="mt-3" placeholder={isEn ? "Describe the limitation" : "Опишите ограничение"}
                      value={state.constraintsOther} onChange={(e) => update("constraintsOther", e.target.value)} maxLength={500} />
                  )}
                </StepWrap>
              )}
              {step === 20 && (<StepWrap title={isEn ? "When do you need a result?" : "Когда вам нужен результат?"}>
                <OptionList options={deadlineOptions} value={state.deadline} onChange={(v) => update("deadline", v)} /></StepWrap>)}
              {step === 21 && (<StepWrap title={isEn ? "Have you worked with marketing agencies before?" : "Был ли у вас опыт работы с маркетинговыми агентствами?"}>
                <OptionList options={prevAgencyOptions} value={state.prevAgency} onChange={(v) => update("prevAgency", v)} /></StepWrap>)}

              {step === 22 && (
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

const OptionList = ({ options, value, onChange }: { options: Opt[]; value: string; onChange: (v: string) => void }) => (
  <div className="grid gap-2">
    {options.map((o) => (
      <Button key={o.v} type="button" variant={value === o.v ? "default" : "outline"}
        className="justify-start whitespace-normal text-left h-auto py-3"
        onClick={() => onChange(o.v)}>
        {o.label}
      </Button>
    ))}
  </div>
);

const CheckList = ({ options, values, onToggle }: { options: Opt[]; values: string[]; onToggle: (v: string) => void }) => (
  <div className="grid gap-2">
    {options.map((o) => {
      const sel = values.includes(o.v);
      return (
        <Button key={o.v} type="button" variant={sel ? "default" : "outline"}
          className="justify-start whitespace-normal text-left h-auto py-3"
          onClick={() => onToggle(o.v)}>
          <span className={`mr-2 inline-flex h-4 w-4 items-center justify-center rounded border ${sel ? "border-primary-foreground bg-primary-foreground/20" : "border-muted-foreground/40"}`}>
            {sel && <CheckCircle2 className="h-3 w-3" />}
          </span>
          {o.label}
        </Button>
      );
    })}
  </div>
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
          Marketing is always an individual strategy: exact conditions and channels depend on your niche, resources, and goals.
          So instead of "universal" answers, we will prepare a personal proposal for your business.
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Within the next <strong>12 hours</strong> a personal manager will reach out and suggest the best promotion scenario.
        </p>
        <div className="mt-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/30 p-5 text-left text-sm text-muted-foreground">
          <p><strong>What's next:</strong> we'll study your project, competitors, and audience, run a preliminary audit, and come back with a transparent plan — no hidden conditions.</p>
        </div>
      </>
    ) : (
      <>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Маркетинг — это всегда индивидуальная стратегия: точные условия и каналы зависят от вашей ниши, ресурсов и целей. Поэтому, чтобы не давать «универсальных» ответов, мы подготовим персональное предложение под ваш бизнес.
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          В течение ближайших <strong>12 часов</strong> с вами свяжется персональный менеджер и предложит оптимальный сценарий продвижения.
        </p>
        <div className="mt-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/30 p-5 text-left text-sm text-muted-foreground">
          <p><strong>Что дальше:</strong> мы изучим ваш проект, конкурентов и аудиторию, проведём предварительный аудит и придём с прозрачным планом — без скрытых условий.</p>
        </div>
      </>
    )}
    <Button onClick={onClose} className="mt-6 w-full font-heading" size="lg">{isEn ? "Close" : "Закрыть"}</Button>
  </div>
);

export default MarketingQuizDialog;