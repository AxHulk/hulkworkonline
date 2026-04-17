import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ApproachSection from "@/components/home/ApproachSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import BlogSection from "@/components/home/BlogSection";
import CTASection from "@/components/home/CTASection";
import { LOCAL_BUSINESS_JSONLD, ORGANIZATION_JSONLD, WEBSITE_JSONLD } from "@/lib/seo";

const Index = () => (
  <Layout>
    <SEO
      title="HulkWork Studio — создание сайтов, SEO, SMM в Симферополе"
      description="Студия HulkWork: разработка сайтов под ключ, SEO-продвижение в Яндекс и Google, SMM и поведенческие факторы. Команда лучших фрилансеров для вашего бизнеса."
      keywords="создание сайтов, SEO, SMM, поведенческие факторы, Симферополь, разработка сайтов"
      jsonLd={[ORGANIZATION_JSONLD, LOCAL_BUSINESS_JSONLD, WEBSITE_JSONLD]}
    />
    <HeroSection />
    <ServicesSection />
    <ApproachSection />
    <PortfolioSection />
    <BlogSection />
    <CTASection />
  </Layout>
);

export default Index;
