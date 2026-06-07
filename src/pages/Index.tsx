import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ApproachSection from "@/components/home/ApproachSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import BlogSection from "@/components/home/BlogSection";
import CTASection from "@/components/home/CTASection";
import { getLocalBusinessJsonLd, getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/seo";
import { useT } from "@/i18n/translations";

const Index = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  return (
  <Layout>
    <SEO
      title={isEn
        ? "HulkWork Studio — web development, SEO and SMM"
        : "HulkWork Studio — создание сайтов, SEO, SMM в Симферополе"}
      description={isEn
        ? "HulkWork Studio: custom web development, SEO in Google & Yandex, SMM and behavioral factors. A team of senior freelancers for your business."
        : "Студия HulkWork: разработка сайтов под ключ, SEO-продвижение в Яндекс и Google, SMM и поведенческие факторы. Команда лучших фрилансеров для вашего бизнеса."}
      keywords={isEn
        ? "web development, SEO, SMM, behavioral factors, digital agency"
        : "создание сайтов, SEO, SMM, поведенческие факторы, Симферополь, разработка сайтов"}
      jsonLd={[getOrganizationJsonLd(lang), getLocalBusinessJsonLd(lang), getWebsiteJsonLd(lang)]}
    />
    <HeroSection />
    <ServicesSection />
    <ApproachSection />
    <PortfolioSection />
    <BlogSection />
    <CTASection />
  </Layout>
  );
};

export default Index;
