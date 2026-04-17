import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";

// Lazy-load secondary routes to keep the initial bundle small
const WebDevelopment = lazy(() => import("./pages/WebDevelopment.tsx"));
const BehavioralFactors = lazy(() => import("./pages/BehavioralFactors.tsx"));
const SeoPage = lazy(() => import("./pages/SeoPage.tsx"));
const SmmPage = lazy(() => import("./pages/SmmPage.tsx"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.tsx"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage.tsx"));
const ContactsPage = lazy(() => import("./pages/ContactsPage.tsx"));
const OfferPage = lazy(() => import("./pages/OfferPage.tsx"));
const TermsPage = lazy(() => import("./pages/TermsPage.tsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background" aria-hidden="true" />
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/behavioral-factors" element={<BehavioralFactors />} />
            <Route path="/services/seo" element={<SeoPage />} />
            <Route path="/services/smm" element={<SmmPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogArticlePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/offer" element={<OfferPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
          <CookieBanner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
