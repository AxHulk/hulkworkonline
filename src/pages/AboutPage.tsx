import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/about/HeroSection";
import BusinessModelSection from "@/components/about/BusinessModelSection";
import SpeedSection from "@/components/about/SpeedSection";
import ChallengeSection from "@/components/about/ChallengeSection";
import TeamSection from "@/components/about/TeamSection";
import CTASection from "@/components/about/CTASection";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { useT } from "@/i18n/translations";

const AboutPage = () => {
  const { lang } = useT();
  const isEn = lang === "en";
  return (
  <Layout>
    <SEO
      title={isEn ? "About HulkWork Studio — team and approach" : "О студии HulkWork — команда и подход к работе"}
      description={isEn
        ? "HulkWork Studio: mission, business model, expert team and our approach to web development and promotion. Working with senior-level freelancers."
        : "HulkWork Studio: миссия, бизнес-модель, команда специалистов и наш подход к созданию сайтов и продвижению. Работаем с фрилансерами уровня senior."}
      jsonLd={buildBreadcrumbJsonLd([{ name: isEn ? "About" : "О нас", url: "/about" }])}
    />
    <HeroSection />
    <BusinessModelSection />
    <SpeedSection />
    <ChallengeSection />
    <TeamSection />
    <CTASection />
  </Layout>
  );
};

export default AboutPage;
