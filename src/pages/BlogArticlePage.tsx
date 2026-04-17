import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { blogArticles, categoryLabels } from "@/data/blogArticles";
import { articleContents } from "@/data/articleContents";
import { buildBreadcrumbJsonLd, buildCanonical, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import NotFound from "./NotFound";

const BlogArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = blogArticles.find((a) => a.id === id);

  if (!article) return <NotFound />;

  const content = articleContents[article.id] ?? [];
  const url = buildCanonical(`/blog/${article.id}`);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: DEFAULT_OG_IMAGE,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "HulkWork Studio", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "HulkWork Studio",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: categoryLabels[article.category],
  };

  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: "Блог", url: "/blog" },
    { name: article.title, url: `/blog/${article.id}` },
  ]);

  return (
    <Layout>
      <SEO
        title={`${article.title} — HulkWork Blog`}
        description={article.excerpt}
        ogType="article"
        jsonLd={[articleJsonLd, breadcrumbs]}
      />
      <article className="bg-[#1A0A2E] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к блогу
          </Link>

          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
              {categoryLabels[article.category]}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/50">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime} мин
            </span>
            <span className="text-xs text-white/50">{article.date}</span>
          </div>

          <h1 className="mb-10 max-w-3xl font-heading text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
        </div>
      </article>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="prose prose-lg mx-auto max-w-3xl text-foreground">
          {content.map((paragraph, idx) => (
            <p key={idx} className="mb-5 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Все статьи блога
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default BlogArticlePage;
