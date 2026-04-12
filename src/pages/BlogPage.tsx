import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogHeroSection from "@/components/blog/HeroSection";
import BlogCategoryNav from "@/components/blog/CategoryNav";
import BlogFeaturedSection from "@/components/blog/FeaturedSection";
import BlogArticleGrid from "@/components/blog/ArticleGrid";
import BlogCTASection from "@/components/blog/CTASection";
import { blogArticles, type BlogCategory } from "@/data/blogArticles";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

  const filtered = activeCategory === "all"
    ? blogArticles
    : blogArticles.filter((a) => a.category === activeCategory);

  const featured = blogArticles.filter((a) => a.featured);

  return (
    <Layout>
      <BlogHeroSection />
      <BlogCategoryNav active={activeCategory} onChange={setActiveCategory} />
      {activeCategory === "all" && <BlogFeaturedSection articles={featured} />}
      <BlogArticleGrid articles={filtered} />
      <BlogCTASection />
    </Layout>
  );
};

export default BlogPage;
