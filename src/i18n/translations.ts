import { useLanguage, Lang } from "./LanguageContext";

type Dict = Record<string, string>;
type Translations = Record<string, Record<Lang, string>>;

/**
 * Flat dictionary of all translation strings used across the site.
 * Keys are stable identifiers grouped by namespace (header.*, footer.*, home.*, ...).
 */
export const translations: Translations = {
  // ===== Header =====
  "header.services": { ru: "Услуги", en: "Services" },
  "header.menu": { ru: "Меню", en: "Menu" },
  "header.portfolio": { ru: "Портфолио", en: "Portfolio" },
  "header.blog": { ru: "Блог", en: "Blog" },
  "header.about": { ru: "О нас", en: "About" },
  "header.contacts": { ru: "Контакты", en: "Contacts" },
  "header.service.webDev": { ru: "Создание сайтов", en: "Web Development" },
  "header.service.behavioral": { ru: "Поведенческие факторы", en: "Behavioral Factors" },
  "header.service.seo": { ru: "SEO-продвижение", en: "SEO" },
  "header.service.smm": { ru: "SMM-продвижение", en: "SMM" },

  // ===== Footer =====
  "footer.about": {
    ru: "Индивидуальный предприниматель Фурса Наталия Николаевна",
    en: "HulkWork Studio — digital agency for web development, SEO and SMM.",
  },
  "footer.services": { ru: "Услуги", en: "Services" },
  "footer.legal": { ru: "Документы", en: "Legal" },
  "footer.resources": { ru: "Ресурсы", en: "Resources" },
  "footer.contacts": { ru: "Контакты", en: "Contacts" },
  "footer.offer": { ru: "Публичная оферта", en: "Public offer" },
  "footer.privacy": { ru: "Политика конфиденциальности", en: "Privacy policy" },
  "footer.terms": { ru: "Оплата, возврат и условия услуг", en: "Payment & refund policy" },
  "footer.serviceSeo": { ru: "SEO аналитика", en: "SEO" },
  "footer.serviceSmm": { ru: "SMM продвижение", en: "SMM" },
  "footer.copyright": {
    ru: "ИП Фурса Наталия Николаевна. Все права защищены.",
    en: "HulkWork Studio. All rights reserved.",
  },

  // ===== Home — Hero =====
  "home.hero.title": {
    ru: "Цифровые шедевры, созданные для лидерства.",
    en: "Digital masterpieces, engineered for leadership.",
  },
  "home.hero.subtitle": {
    ru: "Мы не просто пишем код. Мы проектируем логику, имитируем поведение и выводим бизнес в топ. От концепции до готового продукта — за 72 часа.",
    en: "We don't just write code. We design logic, simulate user behavior, and push businesses to the top. From concept to finished product — in 72 hours.",
  },
  "home.hero.ctaPrimary": { ru: "Начать проект", en: "Start a project" },
  "home.hero.ctaTelegram": { ru: "Написать в Telegram", en: "Message on Telegram" },

  // ===== Home — Services =====
  "home.services.title": { ru: "Что мы создаём", en: "What we build" },
  "home.services.web.title": { ru: "Создание сайтов", en: "Web development" },
  "home.services.web.desc": {
    ru: "Современные технологии, ИИ-интеграции (ChatGPT, Claude, Manus, Grok), любые базы данных, магазины, личные кабинеты и безупречная логика пути клиента.",
    en: "Modern tech, AI integrations (ChatGPT, Claude, Manus, Grok), any database, stores, dashboards and flawless customer journey logic.",
  },
  "home.services.web.cta": { ru: "Подробнее об услуге →", en: "Learn more →" },
  "home.services.behavioral.title": { ru: "Поведенческие факторы", en: "Behavioral factors" },
  "home.services.behavioral.desc": {
    ru: "Уникальная технология имитации поведенческих факторов на собственном коде. Ежедневная работа, высокие нагрузки, полное прохождение проверок GA и Метрики.",
    en: "Proprietary in-house tech for behavioral factor simulation. Daily work at high loads with full GA and Yandex Metrica validation.",
  },
  "home.services.behavioral.cta": { ru: "Узнать как это работает →", en: "See how it works →" },
  "home.services.seo.title": { ru: "SEO Аналитика и настройка", en: "SEO Analytics & setup" },
  "home.services.seo.desc": {
    ru: "Технический аудит, написание уникальных SEO-статей, подготовка аккаунтов для Яндекс Директ и РСЯ. Комплексный подход к органическому росту.",
    en: "Technical audit, unique SEO articles, ad-account setup. A complete approach to organic growth.",
  },
  "home.services.seo.cta": { ru: "Изучить подход →", en: "Explore the approach →" },
  "home.services.smm.title": { ru: "SMM Продвижение", en: "SMM" },
  "home.services.smm.desc": {
    ru: "Покупка групп ВКонтакте и Telegram с историей, профессиональное оформление, контент-план и ведение. Ваш бренд — живой и узнаваемый.",
    en: "Aged Telegram & VK communities, professional branding, content plan and management. Your brand — alive and recognizable.",
  },
  "home.services.smm.cta": { ru: "Посмотреть пакеты →", en: "See packages →" },
  "home.services.priceFromHours": { ru: "от {price} · от 5 часов", en: "from {price} · from 5 hrs" },
  "home.services.priceMonth": { ru: "от {price}/месяц", en: "from {price}/month" },
  "home.services.priceRequest": { ru: "по запросу", en: "on request" },
  "home.services.priceTwoMonths": { ru: "от {price} за 2 месяца", en: "from {price} per 2 months" },

  // ===== Home — Approach =====
  "home.approach.title": {
    ru: "Платите за результат, а не за наши расходы.",
    en: "Pay for results — not for our overhead.",
  },
  "home.approach.p1": {
    ru: "Уникальность нашей бизнес-модели — максимальная клиентоориентированность. Вам не нужно оплачивать аренду офиса или кофе-брейки менеджеров. Вы платите только за услуги и время того специалиста, который нужен вашему проекту.",
    en: "Our model is built around the client. You don't pay for office rent or managers' coffee breaks — only for the specialist your project actually needs.",
  },
  "home.approach.p2": {
    ru: "Благодаря автоматизации рутины и глубокому взаимодействию с технологиями, мы способны создать полноценный ресурс с логотипом, брендбуком и логикой всего за сутки.",
    en: "Thanks to deep automation and tight tech integration, we can deliver a full product — logo, brand book and logic — in 24 hours.",
  },
  "home.approach.cta": { ru: "Познакомиться с командой", en: "Meet the team" },

  // ===== Home — Portfolio =====
  "home.portfolio.title": { ru: "Наша гордость. Ваша уверенность.", en: "Our pride. Your confidence." },
  "home.portfolio.viewAll": { ru: "Смотреть все работы", en: "View all projects" },
  "home.portfolio.paycross.cat": { ru: "Платёжный сервис / Веб", en: "Payment service / Web" },
  "home.portfolio.paycross.desc": {
    ru: "Мультивалютная платёжная система с интеграцией криптовалют и фиатных шлюзов.",
    en: "Multi-currency payment system with crypto and fiat gateway integrations.",
  },
  "home.portfolio.hulkwork.cat": { ru: "Сайт-магазин услуг / Веб", en: "Service marketplace / Web" },
  "home.portfolio.hulkwork.desc": {
    ru: "Корпоративный сайт студии с блогом, портфолио и системой заявок.",
    en: "Corporate studio website with blog, portfolio and lead system.",
  },
  "home.portfolio.botpf.title": { ru: "Бот ПФ (Open Source)", en: "Behavioral Bot (Open Source)" },
  "home.portfolio.botpf.cat": { ru: "Поведенческие факторы", en: "Behavioral factors" },
  "home.portfolio.botpf.desc": {
    ru: "Автоматизация накрутки поведенческих факторов на собственном коде.",
    en: "Open-source automation for behavioral factor simulation.",
  },
  "home.portfolio.kvanteks.cat": { ru: "Интернет-магазин / Веб", en: "E-commerce / Web" },
  "home.portfolio.kvanteks.desc": {
    ru: "Масштабный магазин электроники с интеграцией складских баз.",
    en: "Large-scale electronics store with warehouse-database integration.",
  },
  "home.portfolio.smm.title": { ru: "SMM ВКонтакте", en: "VK SMM" },
  "home.portfolio.smm.cat": { ru: "Упаковка и ведение", en: "Branding & management" },
  "home.portfolio.smm.desc": {
    ru: "Полная упаковка и контент-стратегия для группы ВКонтакте с нуля.",
    en: "Complete branding and content strategy for a VK community from scratch.",
  },

  // ===== Home — Blog (RU only, kept for completeness) =====
  // ===== Home — CTA =====
  "home.cta.title": { ru: "Готовы создать шедевр?", en: "Ready to build something great?" },
  "home.cta.formIntro": {
    ru: "Выберите услугу — и заполните короткую форму или ответьте на пару вопросов. Мы свяжемся с вами в ближайшее время.",
    en: "Pick a service — then fill out a short form or answer a few questions. We'll get back to you shortly.",
  },
  "home.cta.service.website": { ru: "Создать сайт", en: "Build a site" },
  "home.cta.service.seo": { ru: "SEO", en: "SEO" },
  "home.cta.service.behavioral": { ru: "Поведенческие факторы", en: "Behavioral factors" },
  "home.cta.placeholder.name": { ru: "Ваше имя", en: "Your name" },
  "home.cta.placeholder.contact": { ru: "Telegram или Email", en: "Telegram or email" },
  "home.cta.placeholder.task": { ru: "Кратко о задаче", en: "Briefly describe your task" },
  "home.cta.submit": { ru: "Отправить заявку", en: "Send request" },
  "home.cta.submitting": { ru: "Отправка...", en: "Sending..." },
  "home.cta.seo.title": { ru: "SEO-продвижение в Яндекс и Google", en: "SEO promotion in Google & Yandex" },
  "home.cta.seo.desc": {
    ru: "Ответьте на 12 коротких вопросов — мы подготовим персональную стратегию под вашу нишу, бюджет и темп. Менеджер свяжется в течение 12 часов.",
    en: "Answer 12 short questions — we'll prepare a personal strategy for your niche, budget and pace. A manager will reply within 12 hours.",
  },
  "home.cta.behavioral.title": { ru: "Поведенческие факторы (Яндекс)", en: "Behavioral factors (Yandex)" },
  "home.cta.behavioral.desc": {
    ru: "Турбо-режим вывода в ТОП за 1–3 месяца. Ответьте на 12 вопросов — рассчитаем персональное предложение под вашу нишу.",
    en: "Turbo path to TOP in 1–3 months. Answer 12 questions — we'll calculate a personal offer for your niche.",
  },
  "home.cta.openQuiz": { ru: "Пройти опросник", en: "Take the quiz" },
  "home.cta.directMessage": {
    ru: "Или напишите нам напрямую. Мы отвечаем за 5 минут и готовы обсудить проект прямо сейчас.",
    en: "Or message us directly. We reply within 5 minutes and are ready to discuss your project now.",
  },

  // ===== Toasts / common =====
  "toast.consentRequired": {
    ru: "Необходимо дать согласие на обработку персональных данных",
    en: "Please accept the privacy policy to continue",
  },
  "toast.leadSuccess": {
    ru: "Заявка отправлена! Мы свяжемся с вами в ближайшее время.",
    en: "Request sent! We'll get back to you shortly.",
  },
  "toast.leadError": {
    ru: "Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.",
    en: "Failed to send the request. Please try again or message us on Telegram.",
  },

  // ===== Consent checkbox =====
  "consent.text": {
    ru: "Отправляя форму, вы соглашаетесь с обработкой персональных данных согласно ",
    en: "By submitting this form you agree to data processing per our ",
  },
  "consent.policy": { ru: "Политики конфиденциальности", en: "Privacy Policy" },

  // ===== Language switcher =====
  "lang.switch": { ru: "Язык", en: "Language" },
};

const FALLBACK: Lang = "ru";

export function translate(key: string, lang: Lang, vars?: Dict): string {
  const entry = translations[key];
  if (!entry) {
    if (import.meta.env.DEV) console.warn(`[i18n] missing key: ${key}`);
    return key;
  }
  let str = entry[lang] ?? entry[FALLBACK] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, v);
    }
  }
  return str;
}

export function useT() {
  const { lang, lp, switchTo } = useLanguage();
  const t = (key: string, vars?: Dict) => translate(key, lang, vars);
  return { t, lang, lp, switchTo };
}
