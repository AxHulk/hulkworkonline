import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import QuizCTAButton from "@/components/quiz/QuizCTAButton";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { CITY_MAP, CityKey, CITY_SLUGS } from "@/data/cities";
import { CheckCircle2, MapPin, Rocket, Search } from "lucide-react";
import { useUsdRubRate, formatRub } from "@/lib/exchangeRate";
import tanecDushi1 from "@/assets/case-tanecdushi-1.png";
import tanecDushi2 from "@/assets/case-tanecdushi-2.png";
import tanecDushi3 from "@/assets/case-tanecdushi-3.png";
import fermerFedor1 from "@/assets/case-fermerfedor-1.png";
import fermerFedor2 from "@/assets/case-fermerfedor-2.png";
import fermerFedor3 from "@/assets/case-fermerfedor-3.png";
import designerCrimea1 from "@/assets/case-designer-crimea-1.png";
import designerCrimea2 from "@/assets/case-designer-crimea-2.png";
import designerCrimea3 from "@/assets/case-designer-crimea-3.png";
import lilBrazil1 from "@/assets/case-lilbrazil-barnaul-1.png";
import lilBrazil2 from "@/assets/case-lilbrazil-barnaul-2.png";
import lilBrazil3 from "@/assets/case-lilbrazil-barnaul-3.png";
import unikFood1 from "@/assets/case-unikfood-ekb-1.png";
import unikFood2 from "@/assets/case-unikfood-ekb-2.png";
import unikFood3 from "@/assets/case-unikfood-ekb-3.png";

interface CityCase {
  title: string;
  client: string;
  summary: string;
  highlights: string[];
  images: { src: string; alt: string }[];
}

const CITY_CASES: Partial<Record<`${ServiceKey}_${CityKey}`, CityCase>> = {
  "web-development_spb": {
    title: "Веб-платформа для туристического агентства «Танец Души»",
    client: "ИП Колесова, Санкт-Петербург",
    summary:
      "Разработали единую экосистему для авторского турагентства: продажа собственных прогулок по Петербургу, глобальный поиск туров через API ведущих туроператоров, защищённая корзина с платёжным шлюзом и SEO-оптимизированный блог о городе.",
    highlights: [
      "API-интеграции с ведущими туроператорами для сквозного поиска туров",
      "Собственная корзина и платёжный шлюз с поддержкой российских эквайрингов",
      "SEO-оптимизированный блог-журнал о Петербурге для органического трафика",
      "Адаптивная вёрстка под десктоп, планшет и мобильный — основной трафик с телефонов",
    ],
    images: [
      { src: tanecDushi1, alt: "Главная страница «Танец Души» — Петербург, который вы полюбите" },
      { src: tanecDushi3, alt: "Страница блога «Компас по скрытому Петербургу» с категориями" },
      { src: tanecDushi2, alt: "Блок «Свежее в блоге» — авторские заметки о Петербурге" },
    ],
  },
  "web-development_moskva": {
    title: "Веб-платформа для фермерского хозяйства «Фермер Фёдор»",
    client: "Фермерское хозяйство, поставки в Москву и Ярославль",
    summary:
      "Современная масштабируемая веб-платформа в сельскохозяйственном секторе: высокопроизводительное решение, объединяющее минималистичный дизайн с передовыми стандартами веб-разработки. Полный цикл создания веб-архитектуры с фокусом на скорость загрузки, уникальность интерфейса и адаптивную семантическую вёрстку.",
    highlights: [
      "Высокопроизводительная архитектура и оптимизация Core Web Vitals",
      "Каталог свежих продуктов с фильтрацией по категориям, сборщикам и регионам",
      "Карта зон доставки (Москва и МО, Ярославль и ЯО) с описанием логистики",
      "Адаптивная семантическая вёрстка под десктоп, ноутбук, планшет и мобильный",
    ],
    images: [
      { src: fermerFedor1, alt: "Главный экран «Фермер Фёдор» — Настоящее: продукты с именем и историей" },
      { src: fermerFedor2, alt: "Каталог свежих продуктов с фильтрами по категориям и регионам" },
      { src: fermerFedor3, alt: "Карта зон доставки «Фермер Фёдор»: Москва и МО, Ярославль и ЯО" },
    ],
  },
  "web-development_yaroslavl": {
    title: "Веб-платформа для фермерского хозяйства «Фермер Фёдор»",
    client: "Фермерское хозяйство, поставки в Москву и Ярославль",
    summary:
      "Современная масштабируемая веб-платформа в сельскохозяйственном секторе: высокопроизводительное решение, объединяющее минималистичный дизайн с передовыми стандартами веб-разработки. Полный цикл создания веб-архитектуры с фокусом на скорость загрузки, уникальность интерфейса и адаптивную семантическую вёрстку.",
    highlights: [
      "Высокопроизводительная архитектура и оптимизация Core Web Vitals",
      "Каталог свежих продуктов с фильтрацией по категориям, сборщикам и регионам",
      "Карта зон доставки (Москва и МО, Ярославль и ЯО) с описанием логистики",
      "Адаптивная семантическая вёрстка под десктоп, ноутбук, планшет и мобильный",
    ],
    images: [
      { src: fermerFedor1, alt: "Главный экран «Фермер Фёдор» — Настоящее: продукты с именем и историей" },
      { src: fermerFedor2, alt: "Каталог свежих продуктов с фильтрами по категориям и регионам" },
      { src: fermerFedor3, alt: "Карта зон доставки «Фермер Фёдор»: Москва и МО, Ярославль и ЯО" },
    ],
  },
  "web-development_crimea": {
    title: "Премиальный сайт-визитка и портфолио для дизайнера интерьеров",
    client: "Студия дизайна интерьеров, Симферополь и ЮБК",
    summary:
      "Премиальный сайт-визитка и портфолио для дизайнера интерьеров. Проект объединяет эстетику глянцевого журнала с мощными инструментами лидогенерации: сложная архитектура портфолио с вложенностью «объекты → комнаты», интерактивный многошаговый квиз для захвата заявок и кастомная дизайн-система, подчёркивающая премиальность услуг.",
    highlights: [
      "Эстетика глянцевого журнала: типографика, ритм и крупная фотография объектов",
      "Архитектура портфолио с вложенностью: объекты → комнаты → фотографии и описания",
      "Многошаговый квиз для расчёта стоимости и сроков — основной инструмент лидогенерации",
      "Кастомная дизайн-система и адаптив под десктоп, ноутбук, планшет и мобильный",
    ],
    images: [
      { src: designerCrimea1, alt: "Раздел «Портфолио» дизайнера интерьеров — карточки реализованных объектов" },
      { src: designerCrimea2, alt: "Блок «Мой подход» с фотографией и плавающим CTA на квиз" },
      { src: designerCrimea3, alt: "Тарифы услуг дизайна интерьера: Концептуальный, Стандартный, Премиум" },
    ],
  },
  "web-development_barnaul": {
    title: "Сайт для бар-ресторана «Lil Brazil» в Барнауле",
    client: "Бар-ресторан «Lil Brazil», Барнаул",
    summary:
      "Сайт для заведения сферы гостеприимства, где главное — атмосфера, вкус и эмоции. Задача: передать через экран запахи, звуки и настроение бара-ресторана, оставаясь цифровым продолжением интерьера. При этом эстетика не должна мешать функциональности — гость должен быстро посмотреть меню с аппетитными фотографиями и легко забронировать столик.",
    highlights: [
      "Баланс между визуальной насыщенностью и молниеносной скоростью загрузки на телефонах",
      "Афиша концертов и мероприятий с карточками артистов и быстрой покупкой билета",
      "Меню с крупными аппетитными фотографиями блюд и удобной категоризацией",
      "Бронирование столика «на ходу» — короткая форма, минимум полей, мобильный приоритет",
    ],
    images: [
      { src: lilBrazil1, alt: "Раздел «Концерты» бар-ресторана Lil Brazil — афиши и кнопки покупки билетов" },
      { src: lilBrazil2, alt: "Раздел «Наше меню» Lil Brazil — карточки категорий с фотографиями блюд" },
      { src: lilBrazil3, alt: "Раздел «Афиша» Lil Brazil — ближайшие мероприятия и бронирование" },
    ],
  },
  "web-development_ekaterinburg": {
    title: "Сайт сервиса доставки рационов правильного питания в Екатеринбурге",
    client: "Сервис доставки готовых рационов ПП, Екатеринбург",
    summary:
      "Современный сервис доставки готовых рационов правильного питания в Екатеринбурге. Ниша подписочной доставки еды — одна из самых конкурентных, поэтому сайт должен с первых секунд объяснять, почему заказывать стоит именно здесь, и максимально упрощать выбор: без калькуляторов БЖУ и долгих сравнений. Сайт стал персональным цифровым диетологом пользователя и инструментом удержания, мотивирующим возвращаться за новыми заказами.",
    highlights: [
      "Интерактивный калькулятор рациона: подбор калорийности и программы под цель клиента",
      "Динамическое меню на неделю с примерами блюд по дням — выбор как увлекательная игра",
      "Социальное доказательство: лента отзывов клиентов из VK с фото и упоминанием бренда",
      "Умный FAQ с категориями (оплата, доставка, питание, похудение, detox, кешбэк) и онлайн-чатом",
    ],
    images: [
      { src: unikFood1, alt: "Блок выбора рациона: стандартные и премиум, пример меню по дням недели" },
      { src: unikFood2, alt: "Раздел «Ваши отзывы» — лента публикаций клиентов из VK" },
      { src: unikFood3, alt: "Раздел «Часто задаваемые вопросы» с категориями и иконками" },
    ],
  },
};

type ServiceKey = "web-development" | "seo";

interface Props {
  service: ServiceKey;
}

const SERVICE_META: Record<ServiceKey, {
  title: (c: string) => string;
  h1: (c: string) => string;
  metaDesc: (c: string) => string;
  intro: (c: string) => string;
  ru: string;
  track: "website" | "seo";
  parentUrl: string;
  parentName: string;
  bullets: string[];
}> = {
  "web-development": {
    title: (c) => `Создание сайтов под ключ ${c} — HulkWork Studio`,
    h1: (c) => `Разработка сайтов под ключ ${c}: корпоративные сайты, лендинги и порталы`,
    metaDesc: (c) =>
      `Сделаем сайт для компании ${c}: лендинг, корпоративный сайт под ключ, интернет-магазин или портал. Фиксированная стоимость, сроки от 24 часов, поддержка после запуска.`,
    intro: (c) =>
      `HulkWork Studio — веб-агентство, которое разрабатывает сайты под ключ ${c} и по всей России. Мы берём проект целиком: концепция, дизайн, разработка, SEO-настройка, размещение на хостинге и сопровождение.`,
    ru: "Создание сайтов",
    track: "website",
    parentUrl: "/services/web-development",
    parentName: "Создание сайтов",
    bullets: [
      "Сделать сайт для компании или фирмы — от лендинга до сложного корпоративного портала",
      "Корпоративный сайт под ключ с интеграциями (1С, CRM, Telegram-бот, оплата)",
      "Создание корпоративного портала и личных кабинетов для сотрудников и дилеров",
      "Лендинг и реклама под ключ: связка сайт + Яндекс Директ + аналитика",
      "Проектирование сайтов любой сложности — от MVP до экосистемы продуктов",
    ],
  },
  seo: {
    title: (c) => `SEO-продвижение сайтов ${c} — HulkWork`,
    h1: (c) => `Комплексное SEO ${c}: вывод в топ Яндекса и Google`,
    metaDesc: (c) =>
      `SEO-продвижение сайтов ${c}: технический аудит, семантика, on-page оптимизация, контент и ссылочное. Прозрачные отчёты, рост трафика и заявок.`,
    intro: (c) =>
      `HulkWork Studio занимается комплексным SEO-продвижением ${c}: выводим коммерческие сайты в топ Яндекса и Google по целевым гео-запросам, увеличиваем поток лидов из органического поиска.`,
    ru: "SEO-продвижение",
    track: "seo",
    parentUrl: "/services/seo",
    parentName: "SEO-продвижение",
    bullets: [
      "Технический аудит сайта и устранение ошибок индексации",
      "Сбор семантического ядра под спрос конкретного региона",
      "On-page оптимизация: meta-теги, структура заголовков, перелинковка",
      "Написание уникальных SEO-статей под коммерческие и информационные запросы",
      "Подготовка кампаний в Яндекс Директ и РСЯ как ускоритель выхода в топ",
    ],
  },
};

const PRICING_WEB = [
  { type: "Лендинг под ключ", from: 500, days: "от 1 дня", desc: "Одностраничник для рекламы или продукта, форма захвата, аналитика, SEO-база" },
  { type: "Корпоративный сайт", from: 700, days: "от 5 дней", desc: "Многостраничный сайт с каталогом услуг, блогом, формами и интеграциями" },
  { type: "Интернет-магазин", from: 800, days: "от 10 дней", desc: "Каталог, корзина, оплата, личный кабинет, интеграция со складом и 1С" },
  { type: "Корпоративный портал", from: 1500, days: "от 14 дней", desc: "Закрытая среда для сотрудников/дилеров, роли, документы, чаты, отчёты" },
];

const ServiceCityPage = ({ service }: Props) => {
  const { city } = useParams<{ city: string }>();
  if (!city || !CITY_SLUGS.includes(city as CityKey)) {
    return <Navigate to="/404" replace />;
  }
  const data = CITY_MAP[city as CityKey];
  const meta = SERVICE_META[service];
  const url = `${SITE_URL}/services/${service}/${city}`;
  const cityCase = CITY_CASES[`${service}_${city as CityKey}` as keyof typeof CITY_CASES];
  const rate = useUsdRubRate();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: meta.ru,
    provider: { "@type": "Organization", name: "HulkWork Studio", url: SITE_URL },
    areaServed: {
      "@type": "City",
      name: data.nom,
      containedInPlace: { "@type": "AdministrativeArea", name: data.region },
    },
    url,
    description: meta.metaDesc(data.inLoc),
  };

  const faqs = service === "web-development"
    ? [
        { q: `Сколько стоит сделать сайт для компании ${data.inLoc}?`, a: `Стартовая цена лендинга — от ${formatRub(500, rate)}, корпоративного сайта под ключ — от ${formatRub(700, rate)}, интернет-магазина — от ${formatRub(800, rate)}, корпоративного портала — от ${formatRub(1500, rate)}. Точная стоимость рассчитывается после короткого брифа за 24 часа.` },
        { q: `За какой срок вы делаете корпоративный сайт под ключ?`, a: `Лендинг — от 1 рабочего дня, корпоративный сайт — от 5 дней, портал — от 2 недель. Сроки фиксируются в договоре и не сдвигаются по нашей вине.` },
        { q: `Вы работаете только ${data.inLoc} или удалённо?`, a: `Мы базируемся в Крыму (ИП Фурса Н.Н., Симферополь), но 95% работы ведётся удалённо. Клиенты из ${data.gen} получают тот же сервис: видеосозвоны, договор, акты, оплата с НДС или без — по запросу.` },
        { q: `Что входит в «сайт под ключ»?`, a: `Концепция и прототип, дизайн, вёрстка и фронтенд, бэкенд и БД, SEO-база (мета, sitemap, robots, schema), размещение на хостинге, домен, тестирование и обучение по управлению контентом.` },
        { q: `Делаете ли вы лендинг и рекламу под ключ?`, a: `Да. Связка лендинг + Яндекс Директ + РСЯ + сквозная аналитика — наш стандартный пакет для быстрого старта продаж ${data.inLoc}.` },
      ]
    : [
        { q: `Сколько стоит SEO-продвижение ${data.inLoc}?`, a: `Стоимость зависит от тематики и конкуренции. Базовый аудит и настройка — от ${formatRub(500, rate)}, ежемесячное сопровождение — от ${formatRub(400, rate)}/мес. Точная вилка определяется после анализа ниши ${data.inLoc}.` },
        { q: `За какой срок сайт выйдет в топ ${data.gen}?`, a: `Первые позиции по низкочастотным гео-запросам появляются на 2–3 месяце, по высокочастотным — на 4–8 месяцев. Регион ${data.nom}: ${data.marker}.` },
        { q: `Что входит в комплексное SEO?`, a: `Технический аудит, исправление ошибок, сбор семантики, on-page оптимизация, написание SEO-статей, наращивание ссылочного профиля, ежемесячные отчёты.` },
        { q: `Работаете ли вы с региональным продвижением?`, a: `Да, мы делаем региональное SEO для ${data.region}: настраиваем Яндекс Бизнес, привязываем сайт к региону в Вебмастере, работаем с локальными каталогами и отзывами.` },
        { q: `Можно ли заказать только аудит без сопровождения?`, a: `Да. Разовый SEO-аудит сайта — от ${formatRub(300, rate)}. Получите отчёт на 30+ страниц с приоритизированным списком работ.` },
      ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Layout>
      <SEO
        title={meta.title(data.inLoc)}
        description={meta.metaDesc(data.inLoc)}
        keywords={service === "web-development"
          ? `сайт под ключ ${data.nom}, сделать сайт ${data.inLoc}, корпоративный сайт ${data.nom}, разработка сайтов ${data.inLoc}, веб-агентство ${data.nom}`
          : `SEO ${data.nom}, продвижение ${data.gen}, продвижение сайта ${data.inLoc}, комплексное SEO ${data.nom}, оптимизация сайта ${data.inLoc}`}
        canonical={url}
        jsonLd={[
          serviceJsonLd,
          faqJsonLd,
          buildBreadcrumbJsonLd([
            { name: "Услуги", url: "/" },
            { name: meta.parentName, url: meta.parentUrl },
            { name: data.nom, url: `/services/${service}/${city}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[hsl(272,45%,12%)] py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground/80">
            <MapPin className="h-4 w-4" /> {data.region}
          </div>
          <h1 className="font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
            {meta.h1(data.inLoc)}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            {meta.intro(data.inLoc)}
          </p>
          <div className="mt-8 flex justify-center">
            <QuizCTAButton
              source={`${service}_${city}_hero`}
              track={meta.track}
              size="lg"
              label={service === "web-development" ? "Рассчитать сайт за 2 минуты" : "Получить SEO-стратегию"}
            />
          </div>
        </div>
      </section>

      {/* Bullets */}
      <section className="py-14 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Что мы делаем для бизнеса {data.gen}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {meta.bullets.map((b) => (
              <div key={b} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="bg-secondary py-14 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            Специфика {service === "web-development" ? "разработки сайтов" : "SEO-продвижения"} {data.inLoc}
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {data.nom} — {data.marker}. Это напрямую влияет на то, как мы проектируем сайты и выстраиваем
              стратегию {service === "web-development" ? "разработки" : "продвижения"} для клиентов {data.gen}.
            </p>
            {service === "web-development" ? (
              <>
                <p>
                  Мы делаем сайт под ключ {data.inLoc} с учётом локальных особенностей: подключаем оплату
                  через российские эквайринги (ЮKassa, Тинькофф, Сбер), интегрируемся с 1С и Мой Склад,
                  настраиваем Telegram-бот для уведомлений о заказах. Хостинг размещаем на российских
                  площадках, что критично для индексации в Яндексе и стабильной работы для аудитории {data.gen}.
                </p>
                <p>
                  Каждый корпоративный сайт под ключ {data.inLoc} собирается с прицелом на дальнейшее
                  SEO-продвижение: правильная структура URL, чистый код, валидная разметка Schema.org,
                  быстрые Core Web Vitals.
                </p>
              </>
            ) : (
              <>
                <p>
                  Комплексное SEO {data.inLoc} начинается с регионального аудита: анализируем
                  топ-10 Яндекса по вашим запросам, выявляем сильных конкурентов {data.gen}, оцениваем
                  ссылочный профиль и качество контента. На этом основании строим персональную стратегию
                  с понятным горизонтом окупаемости.
                </p>
                <p>
                  Мы не работаем по принципу «накрутим позиции и забудем». Наш фокус — рост коммерческого
                  трафика и заявок. Для региона {data.region} это означает плотную работу с Яндекс Бизнес,
                  локальными каталогами, геозависимыми запросами и поведенческими факторами.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Pricing (web only) */}
      {cityCase && (
        <section className="py-14 md:py-20">
          <div className="container max-w-5xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Кейс {data.gen}
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">{cityCase.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{cityCase.client}</p>
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center text-muted-foreground leading-relaxed">
              {cityCase.summary}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {cityCase.highlights.map((h) => (
                <div key={h} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {cityCase.images.map((img) => (
                <div key={img.src} className="overflow-hidden rounded-xl border bg-card">
                  <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service === "web-development" && (
        <section className="py-14 md:py-20">
          <div className="container max-w-4xl">
            <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
              Стоимость сайта под ключ {data.inLoc}
            </h2>
            <p className="mt-3 text-center text-muted-foreground">
              Базовая ставка студии — от {formatRub(500, rate)}. Финальная цена зависит от типа сайта и набора интеграций.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PRICING_WEB.map((p) => (
                <Card key={p.type}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-base font-semibold">{p.type}</h3>
                      <span className="font-heading text-sm text-primary">от {formatRub(p.from, rate)}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{p.days}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-secondary py-14 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="text-center font-heading text-2xl font-bold md:text-3xl">
            Частые вопросы по {service === "web-development" ? "разработке" : "SEO"} {data.inLoc}
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-heading">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14 md:py-20">
        <div className="container max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
            {service === "web-development" ? "Готовы сделать сайт" : "Готовы вывести сайт в топ"} {data.inLoc}?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Ответьте на короткий опросник — пришлём персональное предложение в течение 24 часов.
          </p>
          <div className="mt-6 flex justify-center">
            <QuizCTAButton
              source={`${service}_${city}_cta`}
              track={meta.track}
              size="lg"
              variant="secondary"
              label={service === "web-development" ? "Рассчитать стоимость" : "Получить SEO-план"}
            />
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
            {service === "web-development" ? <Rocket className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            <Link to={meta.parentUrl} className="underline">
              Все возможности услуги {meta.parentName.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceCityPage;