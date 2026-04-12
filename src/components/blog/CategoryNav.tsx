import { Monitor, Search, Megaphone, MousePointerClick, Target } from "lucide-react";
import type { BlogCategory } from "@/data/blogArticles";
import blogCatWeb from "@/assets/blog_cat_web.png";
import blogCatSeo from "@/assets/blog_cat_seo.png";
import blogCatSmm from "@/assets/blog_cat_smm.png";
import blogCatPf from "@/assets/blog_cat_pf.png";
import blogCatAds from "@/assets/blog_cat_ads.png";

interface Props {
  active: BlogCategory | "all";
  onChange: (cat: BlogCategory | "all") => void;
}

const categories: { key: BlogCategory | "all"; label: string; icon: React.ReactNode; image?: string; desc?: string }[] = [
  { key: "all", label: "Все статьи", icon: null },
  { key: "web", label: "Веб-разработка", icon: <Monitor className="h-4 w-4" />, image: blogCatWeb, desc: "Архитектура, современные фреймворки, интеграции ИИ и создание сайтов, которые работают без сбоев." },
  { key: "seo", label: "SEO", icon: <Search className="h-4 w-4" />, image: blogCatSeo, desc: "Технический аудит, семантика, контент-стратегии и алгоритмы поисковых систем 2026 года." },
  { key: "smm", label: "Маркетинг и СММ", icon: <Megaphone className="h-4 w-4" />, image: blogCatSmm, desc: "Воронки продаж, контент-планы, управление репутацией и покупка сообществ с историей." },
  { key: "pf", label: "Поведенческие факторы", icon: <MousePointerClick className="h-4 w-4" />, image: blogCatPf, desc: "Наша уникальная технология, эмуляция действий пользователей, защита от санкций." },
  { key: "ads", label: "Платная реклама", icon: <Target className="h-4 w-4" />, image: blogCatAds, desc: "Яндекс Директ, РСЯ, таргетированная реклама, снижение стоимости лида и максимизация ROI." },
];

const BlogCategoryNav = ({ active, onChange }: Props) => (
  <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
    <div className="container mx-auto px-4">
      <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`group relative flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              active === cat.key
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {cat.icon}
            {cat.label}
            {cat.desc && active !== cat.key && (
              <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-72 -translate-x-1/2 rounded-xl border border-border bg-card p-4 shadow-xl group-hover:block">
                {cat.image && (
                  <img src={cat.image} alt={cat.label} className="mb-3 h-32 w-full rounded-lg object-cover" />
                )}
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </div>
            )}
          </button>
        ))}
      </nav>
    </div>
  </div>
);

export default BlogCategoryNav;
