import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/about/HeroSection";
import BusinessModelSection from "@/components/about/BusinessModelSection";
import SpeedSection from "@/components/about/SpeedSection";
import ChallengeSection from "@/components/about/ChallengeSection";
import TeamSection from "@/components/about/TeamSection";
import CTASection from "@/components/about/CTASection";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

const AboutPage = () => (
  <Layout>
    <SEO
      title="О студии HulkWork — команда и подход к работе"
      description="HulkWork Studio: миссия, бизнес-модель, команда специалистов и наш подход к созданию сайтов и продвижению. Работаем с фрилансерами уровня senior."
      jsonLd={buildBreadcrumbJsonLd([{ name: "О нас", url: "/about" }])}
    />
    <HeroSection />
    <BusinessModelSection />
    <SpeedSection />
    <ChallengeSection />
    <TeamSection />
    <CTASection />
  </Layout>
);

export default AboutPage;
