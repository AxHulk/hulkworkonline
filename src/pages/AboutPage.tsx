import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/about/HeroSection";
import BusinessModelSection from "@/components/about/BusinessModelSection";
import SpeedSection from "@/components/about/SpeedSection";
import ChallengeSection from "@/components/about/ChallengeSection";
import TeamSection from "@/components/about/TeamSection";
import CTASection from "@/components/about/CTASection";

const AboutPage = () => (
  <Layout>
    <HeroSection />
    <BusinessModelSection />
    <SpeedSection />
    <ChallengeSection />
    <TeamSection />
    <CTASection />
  </Layout>
);

export default AboutPage;
