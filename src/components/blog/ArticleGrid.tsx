import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogArticle } from "@/data/blogArticles";
import { categoryLabels } from "@/data/blogArticles";

const ArticleGrid = ({ articles }: { articles: BlogArticle[] }) => (
  <section className="container mx-auto px-4 py-12">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          to={`/blog/${article.id}`}
          key={article.id}
          className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
        >
          <div className="h-2 w-full bg-gradient-to-r from-primary/60 to-accent/40" />
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {categoryLabels[article.category]}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {article.readTime} мин
              </span>
            </div>
            <h3 className="mb-2 font-heading text-base font-bold leading-snug text-foreground">
              {article.title}
            </h3>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{article.date}</span>
              <span className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                Читать <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default ArticleGrid;
