

## Анализ текущего SEO

**Что уже есть:**
- Yandex.Metrika (108573099) с webvisor, clickmap
- Yandex.Webmaster верификация
- robots.txt (открыт для всех)
- Базовые meta: title, description, og:title, og:description, og:image, twitter cards
- HTML lang="ru"
- ScrollToTop, чистые URL через React Router

**Что критично отсутствует:**
1. **sitemap.xml** — нет совсем
2. **Уникальные meta-теги для каждой страницы** — у всех страниц одинаковые title/description из index.html (SPA проблема)
3. **Canonical URL** — отсутствуют
4. **Структурированные данные (Schema.org JSON-LD)** — нет Organization, LocalBusiness, BreadcrumbList, Article для блога
5. **Open Graph** — base URL https://hulkwork.online не указан, og:url отсутствует
6. **robots.txt** — нет ссылки на sitemap, нет host директивы для Яндекса
7. **H1 структура** — нужна проверка (на каждой странице должен быть один H1)
8. **alt атрибуты** у изображений
9. **404 страница** — нужно отдавать корректный статус (для SPA это сложно, но meta noindex поможет)
10. **Хлебные крошки (breadcrumbs)** — нет ни визуально, ни в schema
11. **Verification теги** — Google Search Console, Mail.ru
12. **Ссылка на политику в robots/footer** для Яндекса

## План улучшений

### 1. Sitemap.xml (критично)
Создать `public/sitemap.xml` со всеми статическими страницами + 50 статьями блога:
- `/`, `/services/web-development`, `/services/seo`, `/services/smm`, `/services/behavioral-factors`
- `/portfolio`, `/about`, `/blog`, `/contacts`
- `/offer`, `/terms`, `/privacy`
- `/blog/{id}` × 50 статей (генерация из `blogArticles.ts`)

С правильными `<lastmod>`, `<changefreq>`, `<priority>`.

### 2. robots.txt — обновить
Добавить:
```
Sitemap: https://hulkwork.online/sitemap.xml
Host: hulkwork.online
```

### 3. Динамические meta-теги (react-helmet-async)
Установить `react-helmet-async`, обернуть App в `HelmetProvider`. Создать компонент `<SEO>` с props: title, description, canonical, ogImage, jsonLd, noindex.

Проставить уникальные SEO-теги на каждой странице:
- **Главная**: «HulkWork Studio — создание сайтов, SEO, SMM в Симферополе»
- **WebDevelopment**: «Создание сайтов под ключ — HulkWork Studio»
- **SEO**: «SEO-продвижение сайтов в Яндекс и Google»
- **SMM**: «SMM-продвижение в соцсетях»
- **BehavioralFactors**: «Накрутка поведенческих факторов»
- **Portfolio**: «Портфолио — наши работы»
- **About**: «О студии HulkWork»
- **Blog**: «Блог о digital-маркетинге»
- **BlogArticle**: title/description из конкретной статьи + Article schema
- **Contacts**: «Контакты HulkWork Studio»
- **Offer/Terms/Privacy**: соответствующие, с `noindex` опционально
- **NotFound**: с `noindex`

### 4. Schema.org JSON-LD
- В `index.html` или на главной: **Organization** + **LocalBusiness** (ИП Фурса, адрес, телефон, email, ИНН)
- На страницах услуг: **Service**
- На страницах блога: **Article** (заголовок, дата, автор, изображение)
- На всех страницах: **BreadcrumbList**
- На главной: **WebSite** с potentialAction (поиск)

### 5. Canonical и Open Graph URL
В `<SEO>` компоненте: `<link rel="canonical" href="https://hulkwork.online{pathname}" />` + `og:url`, `og:site_name="HulkWork Studio"`, `og:locale="ru_RU"`.

### 6. Технические улучшения
- Добавить `lang="ru"` уже есть ✓
- Добавить `<meta name="theme-color">` 
- Добавить `<link rel="icon">` (favicon)
- Добавить `<meta name="yandex-verification">` как альтернативу HTML-файлу (резервно)
- Проверить и добавить `alt=""` на все `<img>` где их нет

### 7. Хлебные крошки
Добавить визуальный компонент Breadcrumbs на внутренних страницах + соответствующий BreadcrumbList JSON-LD.

### 8. Производительность (косвенно влияет на SEO)
- Шрифты: уже preconnect ✓
- Lazy-loading для изображений ниже сгиба: `loading="lazy"`
- Минификация уже через Vite ✓

### 9. Пре-рендеринг (опционально, но идеал)
SPA проблема: Яндекс/Google видят пустой HTML. Решения:
- **Вариант A (быстрый)**: оставить SPA, полагаться на Yandex SSR-флаг и Googlebot rendering
- **Вариант B (идеал)**: добавить пре-рендеринг через `vite-plugin-prerender` или перейти на SSG для статических страниц

Рекомендую начать с варианта A, потому что react-helmet-async уже даст индексируемые мета-теги через client-side rendering (Googlebot и Яндекс это умеют).

### Технические детали
- Пакет: `react-helmet-async`
- Новые файлы: `src/components/SEO.tsx`, `src/components/Breadcrumbs.tsx`, `src/lib/seo.ts` (константы базового URL, утилиты)
- Обновить: `index.html` (Organization JSON-LD, theme-color), `public/robots.txt`, все 13 страниц (`<SEO />` в начале)
- Сгенерировать: `public/sitemap.xml` (можно скриптом или вручную)

### Что НЕ делаем (вне SEO)
- Не трогаем существующий контент, формы, дизайн
- Не меняем роутинг

### Итог: после имплементации
- Каждая страница имеет уникальный title, description, canonical, og-теги
- Сайт виден в поиске со структурированными сниппетами (организация, статьи, хлебные крошки)
- Sitemap указывает поисковикам на все 60+ страниц
- robots.txt указывает на sitemap и host
- Микроразметка LocalBusiness усилит локальное SEO (Симферополь)

