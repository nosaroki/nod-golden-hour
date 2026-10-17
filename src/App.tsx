import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollManager from "@/components/ScrollManager";

/* Le site : pages construites sur le design system NOD. */
import Accueil from "./site/Accueil";
import Maison from "./site/Maison";
import Travail from "./site/Travail";
import Contact from "./site/Contact";

/* L'ancienne version, gardée le temps de la comparaison, sous /v1. */
import HomeV1 from "./pages/Home";
import PrincipeV1 from "./pages/Principe";
import TravailV1 from "./pages/Work";
import ContactV1 from "./pages/Contact";

import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/la-maison" element={<Maison />} />
            <Route path="/principe" element={<Navigate to="/la-maison" replace />} />
            <Route path="/travail" element={<Travail />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/v1" element={<HomeV1 />} />
            <Route path="/v1/principe" element={<PrincipeV1 />} />
            <Route path="/v1/travail" element={<TravailV1 />} />
            <Route path="/v1/contact" element={<ContactV1 />} />

            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/politique-confidentialite" element={<Confidentialite />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
