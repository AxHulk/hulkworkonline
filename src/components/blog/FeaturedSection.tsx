import { ArrowRight, Clock } from "lucide-react";
import type { BlogArticle } from "@/data/blogArticles";
import { categoryLabels } from "@/data/blogArticles";

const FeaturedSection = ({ articles }: { articles: BlogArticle[] }) => {
  if (!articles.length) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">Главное</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {articles.slice(0, 2).map((article) => (
          <div
            key={article.id}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
          >
            <div className="bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 p-8 md:p-10">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {categoryLabels[article.category]}
              </span>
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground md:text-2xl">
                {article.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime} мин
                  </span>
                  <span>{article.date}</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                  Читать <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
