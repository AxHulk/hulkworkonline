import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import WebDevelopment from "./pages/WebDevelopment.tsx";
import BehavioralFactors from "./pages/BehavioralFactors.tsx";
import SeoPage from "./pages/SeoPage.tsx";
import SmmPage from "./pages/SmmPage.tsx";
import PortfolioPage from "./pages/PortfolioPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import BlogArticlePage from "./pages/BlogArticlePage.tsx";
import ContactsPage from "./pages/ContactsPage.tsx";
import OfferPage from "./pages/OfferPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
