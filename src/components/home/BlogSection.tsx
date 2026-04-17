import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { blogArticles, categoryLabels } from "@/data/blogArticles";
import blogImg from "@/assets/main_blog.png";

// Pick one from each of 3 different categories
const getLatestArticles = () => {
  const seen = new Set<string>();
  const result: typeof blogArticles = [];
  for (const a of blogArticles) {
    if (!seen.has(a.category) && result.length < 3) {
      seen.add(a.category);
      result.push(a);
    }
  }
  return result;
};

const latestArticles = getLatestArticles();

const BlogSection = () => (
  <section className="bg-background py-20 md:py-28">
    <div className="container">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image + heading */}
        <div className="text-center lg:text-left">
          <img
            src={blogImg}
            alt="База знаний HulkWork Studio"
            className="mx-auto mb-8 w-64 lg:mx-0 lg:w-72"
          />
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            Не просто контент. Экспертное видение.
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Вручную отобранные статьи, исследования и лучшие практики,
            актуальные на&nbsp;2026&nbsp;год. Никакой воды: только глубокий
            фактчекинг и уникальное видение рынка.
          </p>
          <Button
            variant="outline"
            className="mt-6 gap-2 font-heading font-semibold"
            asChild
          >
            <Link to="/blog">
              Читать все статьи <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* 3 latest articles */}
        <div className="flex flex-col gap-4">
          {latestArticles.map((a) => (
            <Link key={a.id} to={`/blog/${a.id}`}>
              <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/30">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {categoryLabels[a.category]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {a.date} · {a.readTime} мин
                    </span>
                  </div>
                  <h3 className="mt-2 font-heading text-sm font-semibold leading-snug text-foreground line-clamp-2">
                    {a.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BlogSection;
