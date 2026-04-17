import { Monitor, Search, Megaphone, MousePointerClick, Target } from "lucide-react";
import type { BlogCategory } from "@/data/blogArticles";
import blogCatWeb from "@/assets/blog_cat_web.webp";
import blogCatSeo from "@/assets/blog_cat_seo.webp";
import blogCatSmm from "@/assets/blog_cat_smm.webp";
import blogCatPf from "@/assets/blog_cat_pf.webp";
import blogCatAds from "@/assets/blog_cat_ads.webp";

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
  <div className="border-b border-border bg-background">
    <div className="container mx-auto px-4">
      <nav className="flex flex-wrap gap-1 py-3">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              active === cat.key
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </nav>
    </div>
  </div>
);

export default BlogCategoryNav;
