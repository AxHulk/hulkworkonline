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
import dacartur1 from "@/assets/case-dacartur-kazan-1.png";
import dacartur2 from "@/assets/case-dacartur-kazan-2.png";
import dacartur3 from "@/assets/case-dacartur-kazan-3.png";
import quest101_1 from "@/assets/case-101quest-krasnodar-1.png";
import quest101_2 from "@/assets/case-101quest-krasnodar-2.png";
import quest101_3 from "@/assets/case-101quest-krasnodar-3.png";
import smCity1 from "@/assets/case-smcity-krasnoyarsk-1.png";
import smCity2 from "@/assets/case-smcity-krasnoyarsk-2.png";
import smCity3 from "@/assets/case-smcity-krasnoyarsk-3.png";
import ogniSamary1 from "@/assets/case-ognisamary-samara-1.png";
import ogniSamary2 from "@/assets/case-ognisamary-samara-2.png";
import ogniSamary3 from "@/assets/case-ognisamary-samara-3.png";
import vananaPark1 from "@/assets/case-vananapark-saransk-1.png";
import vananaPark2 from "@/assets/case-vananapark-saransk-2.png";
import vananaPark3 from "@/assets/case-vananapark-saransk-3.png";
import avax1 from "@/assets/case-avax-sochi-1.png";
import avax2 from "@/assets/case-avax-sochi-2.png";
import avax3 from "@/assets/case-avax-sochi-3.png";
import serenity1 from "@/assets/case-serenity-tula-1.png";
import serenity2 from "@/assets/case-serenity-tula-2.png";
import serenity3 from "@/assets/case-serenity-tula-3.png";

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
  "web-development_kazan": {
    title: "Федеральный портал аренды автомобилей DACARTUR (Казань)",
    client: "Федеральная сеть проката автомобилей DACARTUR, головной офис — Казань",
    summary:
      "Масштабный федеральный портал аренды автомобилей: единая платформа обслуживает клиентов из 15 городов, показывая для каждого региона собственный автопарк и цены. Задача — презентовать машины красиво и современно, чтобы их хотелось арендовать, и одновременно строго и понятно донести правила, лимиты, штрафы и условия страховки, защищая бизнес от спорных ситуаций с клиентами.",
    highlights: [
      "Мультигородовая архитектура: единая база, для каждого из 15 городов — свой парк и цены",
      "Каталог с фильтрами по классу, марке, КПП, году выпуска и ценам за 1 и 3 суток",
      "Бронирование «в пару кликов» с честной коммуникацией залогов, лимитов и условий КАСКО/ОСАГО",
      "Полностью адаптивная вёрстка — бронирование прямо со смартфона, плюс блок «Новости» и SEO",
    ],
    images: [
      { src: dacartur1, alt: "Главный экран DACARTUR — «Аренда автомобилей на все случаи жизни»" },
      { src: dacartur2, alt: "Каталог «Аренда автомобилей в Казани» с фильтрами по классу и марке" },
      { src: dacartur3, alt: "Раздел «Новости» DACARTUR с карточками публикаций о городе и автопарке" },
    ],
  },
  "web-development_krasnodar": {
    title: "Сайт для компании «101 Квест» в Краснодаре",
    client: "«101 Квест», Краснодар",
    summary:
      "«101 Квест» — успешная компания из Краснодара, которая занимается организацией праздников и развлекательных мероприятий. Проект требовал филигранного подхода: сайт должен был одновременно обслуживать две разные аудитории — розничных клиентов, которые выбирают праздник для детей и взрослых, и потенциальных партнёров, изучающих раздел франшизы с финансовыми моделями и бизнес-планами.",
    highlights: [
      "Удобный фильтр квестов: родители находят и бронируют подходящий праздник буквально в пару кликов",
      "Разделение сценариев для разных аудиторий: детские, взрослые и корпоративные квесты",
      "Упаковка сложной франшизной информации в убедительный интерфейс для инвесторов",
      "Сильная эмоциональная подача: сайт продаёт одновременно впечатления, праздник и серьёзный бизнес",
    ],
    images: [
      { src: quest101_1, alt: "Главный экран сайта «101 Квест» в Краснодаре с оффером и заявкой на квест" },
      { src: quest101_2, alt: "Каталог популярных квестов в Краснодаре с карточками и быстрым бронированием" },
      { src: quest101_3, alt: "Секция выбора формата квеста: взрослые, корпоративные и заказ мероприятия" },
    ],
  },
  "web-development_krasnoyarsk": {
    title: "Цифровой офис продаж для крупного застройщика «СМ.СИТИ» в Красноярске",
    client: "«СМ.СИТИ», Красноярск",
    summary:
      "Полноценный цифровой офис продаж для крупного застройщика, а не просто сайт-визитка. Платформа вмещает огромный объём информации о десятках строящихся и готовых объектов, передаёт масштаб и надёжность компании и делает процесс выбора и бронирования квартиры стоимостью в десятки миллионов рублей максимально простым и понятным для обычного человека.",
    highlights: [
      "Сложная база данных застройщика превращена в удобный, лёгкий и быстрый сайт для пользователя",
      "Умный фильтр: квартира мечты находится в три клика — без звонков в офис продаж",
      "Карта проектов Красноярска со всеми кварталами, статусами и ценами в одном интерфейсе",
      "Раздел «Ход строительства» с фотоотчётами по датам — прозрачность и доверие к застройщику",
    ],
    images: [
      { src: smCity1, alt: "Главный экран сайта застройщика «СМ.СИТИ» — готовые квартиры в сданных домах" },
      { src: smCity2, alt: "Карта проектов «СМ.СИТИ» в Красноярске с фильтрами по кварталам" },
      { src: smCity3, alt: "Раздел «Ход строительства» «СМ.СИТИ» — фотоотчёты по датам" },
    ],
  },
  "web-development_samara": {
    title: "Корпоративный портал агентства недвижимости «Огни Самары»",
    client: "Агентство Недвижимости и Права «Огни Самары», Самара",
    summary:
      "Классический пример качественного регионального корпоративного портала. Создать яркий, сверкающий сайт с множеством эффектов зачастую проще, чем разработать строгий корпоративный ресурс, который загружается за доли секунды и работает абсолютно безотказно. Проект демонстрирует фундаментальное понимание базовых веб-технологий, законов юзабилити и принципов B2B-маркетинга.",
    highlights: [
      "Строгая корпоративная эстетика без визуального шума — фокус на доверии и экспертизе",
      "Молниеносная скорость загрузки и безотказная работа под высокой нагрузкой",
      "Каталог недвижимости с расширенным фильтром: город, район, категория, тип сделки, площадь, цена",
      "Блок «Контроль качества», карточка руководителя и логотипы банков-партнёров для усиления доверия",
    ],
    images: [
      { src: ogniSamary1, alt: "Главный экран «Огни Самары» — агентство недвижимости с поисковым фильтром" },
      { src: ogniSamary2, alt: "Раздел «Затрудняетесь с выбором? Мы поможем» с карточками услуг агентства" },
      { src: ogniSamary3, alt: "Блок «Контроль качества» с фото руководителя и логотипами банков-партнёров" },
    ],
  },
  "web-development_saransk": {
    title: "Сайт детского развлекательного центра Vanana Park в Саранске",
    client: "Vanana Park, ТРЦ «Сити Парк», Саранск",
    summary:
      "Основная задача — создание портала, который стал бы главным цифровым администратором парка. Предмет особой гордости в этом проекте — успешная трансформация сложной офлайн-услуги в простой цифровой продукт. Интеграция верхнего и выпадающего меню делает навигацию интуитивной, а продуманная мобильная версия гарантирует, что родители могут планировать выходные прямо со смартфона.",
    highlights: [
      "Цифровой администратор парка: мероприятия, день рождения «под ключ», стоимость и кафе в одном окне",
      "Трансформация сложной офлайн-услуги в простой и понятный онлайн-продукт",
      "Интуитивная навигация с верхним и выпадающим меню по игровым зонам и услугам",
      "Продуманная мобильная версия — родители планируют выходные прямо со смартфона",
    ],
    images: [
      { src: vananaPark1, alt: "Главный экран Vanana Park в Саранске — мир детских развлечений в ТРЦ «Сити Парк»" },
      { src: vananaPark2, alt: "Раздел «Короткие ролики из жизни нашего парка» с видео праздников и игровых зон" },
      { src: vananaPark3, alt: "Раздел «Игровые зоны» Vanana Park — карточки зон с возрастной маркировкой" },
    ],
  },
  "web-development_sochi": {
    title: "Сайт СПА-отеля и ресторана AVAX в Сочи",
    client: "Гранд СПА Отель AVAX, Сочи",
    summary:
      "Главный вызов при проектировании сайта для мультиформатного бизнеса — угроза информационной перегрузки пользователя. Был риск, что клиент, желающий просто забронировать столик в ресторане, заблудится в описаниях медицинских процедур, а гость, ищущий номер, не заметит наличия SPA-услуг. Задача — создать единую элегантную цифровую экосистему. Сайт функционирует как швейцарские часы, объединяя медицину, гостеприимство и гастрономию в единый цифровой продукт высочайшего класса.",
    highlights: [
      "Единая цифровая экосистема: отель, ресторан, SPA, фитнес и медицина без перегрузки интерфейса",
      "Быстрое бронирование номера прямо с главной — даты заезда/выезда и количество гостей в один экран",
      "Премиальная тёмная эстетика с золотыми акцентами — соответствует уровню 5★ отеля",
      "Чёткая навигация по сценариям: гость, посетитель ресторана и клиент SPA не путаются между собой",
    ],
    images: [
      { src: avax1, alt: "Главный экран AVAX — СПА-отель и ресторан в Сочи с формой бронирования номера" },
      { src: avax2, alt: "Раздел «Номера» AVAX — категории Биг Сайз, Твин, Семейный и Романтик" },
      { src: avax3, alt: "Раздел «Фитнес и SPA» AVAX — Wellness-программы и фитнес-территория" },
    ],
  },
  "web-development_tula": {
    title: "Сайт-проводник для пространства души и тела «Серенити» в Туле",
    client: "«Серенити», пространство души и тела, Тула",
    summary:
      "Сфера премиальных телесных и духовных практик кардинально отличается от обычной сферы услуг. Запись на такие специфические мероприятия, как гвоздестояние, регрессология или работа с подсознанием, требует колоссального уровня доверия со стороны клиента. Задача разработчика состояла в том, чтобы создать сайт-проводник. Элегантная интеграция виджетов онлайн-записи и проработанные алгоритмы выбора подарочных сертификатов демонстрируют глубокое понимание того, как сделать пользовательский путь максимально комфортным.",
    highlights: [
      "Сайт-проводник для сложных практик: клиенту легко понять разницу между направлениями и выбрать подходящее",
      "Интеграция онлайн-записи без ощущения давления — мягкий и доверительный пользовательский сценарий",
      "Алгоритмы выбора подарочных сертификатов для премиальных SPA- и wellness-услуг",
      "Спокойная премиальная визуальная среда, усиливающая доверие к духовным и телесным практикам",
    ],
    images: [
      { src: serenity1, alt: "Главный экран сайта «Серенити» в Туле — услуги пространства души и тела" },
      { src: serenity2, alt: "Раздел подбора услуг «Идеальный вариант для себя» с карточками SPA-программ" },
      { src: serenity3, alt: "Блок «SPA в Туле: стоимость» с акцентом на прозрачные цены и специальные предложения" },
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