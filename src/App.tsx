import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { QuizProvider } from "@/components/quiz/QuizContext";
import QuizDialog from "@/components/quiz/QuizDialog";
import SeoQuizDialog from "@/components/quiz/SeoQuizDialog";
import MarketingQuizDialog from "@/components/quiz/MarketingQuizDialog";
import QuizInviteBanner from "@/components/quiz/QuizInviteBanner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index.tsx";
import WebDevelopment from "./pages/WebDevelopment.tsx";
import BehavioralFactors from "./pages/BehavioralFactors.tsx";
import SeoPage from "./pages/SeoPage.tsx";
import SmmPage from "./pages/SmmPage.tsx";
import ServiceCityPage from "./pages/ServiceCityPage.tsx";
import PortfolioPage from "./pages/PortfolioPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import BlogArticlePage from "./pages/BlogArticlePage.tsx";
import ContactsPage from "./pages/ContactsPage.tsx";
import OfferPage from "./pages/OfferPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import UnsubscribePage from "./pages/UnsubscribePage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <LanguageProvider>
        <QuizProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/web-development/:city" element={<ServiceCityPage service="web-development" />} />
          <Route path="/services/behavioral-factors" element={<BehavioralFactors />} />
          <Route path="/services/seo" element={<SeoPage />} />
          <Route path="/services/seo/:city" element={<ServiceCityPage service="seo" />} />
          <Route path="/services/smm" element={<SmmPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogArticlePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/offer" element={<OfferPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
          {/* English mirror routes. Blog and legal pages are intentionally RU-only. */}
          <Route path="/en" element={<Index />} />
          <Route path="/en/services/web-development" element={<WebDevelopment />} />
          <Route path="/en/services/web-development/:city" element={<ServiceCityPage service="web-development" />} />
          <Route path="/en/services/behavioral-factors" element={<BehavioralFactors />} />
          <Route path="/en/services/seo" element={<SeoPage />} />
          <Route path="/en/services/seo/:city" element={<ServiceCityPage service="seo" />} />
          <Route path="/en/services/smm" element={<SmmPage />} />
          <Route path="/en/portfolio" element={<PortfolioPage />} />
          <Route path="/en/about" element={<AboutPage />} />
          <Route path="/en/contacts" element={<ContactsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          <CookieBanner />
          <QuizDialog />
          <SeoQuizDialog />
          <MarketingQuizDialog />
          <QuizInviteBanner />
        </QuizProvider>
        </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
