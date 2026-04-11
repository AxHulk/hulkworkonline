import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import AdvantagesSection from "@/components/home/AdvantagesSection";
import CasesSection from "@/components/home/CasesSection";
import TrustSection from "@/components/home/TrustSection";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <Layout>
    <HeroSection />
    <ServicesSection />
    <AdvantagesSection />
    <CasesSection />
    <TrustSection />
    <CTASection />
  </Layout>
);

export default Index;
