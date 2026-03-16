import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import SecurityPage from "./pages/SecurityPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogArticlePage from "./pages/BlogArticlePage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import UseCasesPage from "./pages/UseCasesPage.tsx";
import RequestToolPage from "./pages/RequestToolPage.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/request-tool" element={<RequestToolPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
