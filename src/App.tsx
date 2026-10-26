import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollManager from "@/components/ScrollManager";

/* Le site : pages construites sur le design system NOD.
   L'accueil est chargé tout de suite, les autres pages à la demande :
   le premier affichage télécharge moins de code. */
import Accueil from "./site/Accueil";
const Maison = lazy(() => import("./site/Maison"));
const Travail = lazy(() => import("./site/Travail"));
const Contact = lazy(() => import("./site/Contact"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Confidentialite = lazy(() => import("./pages/Confidentialite"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <LanguageProvider>
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/la-maison" element={<Maison />} />
            <Route path="/principe" element={<Navigate to="/la-maison" replace />} />
            <Route path="/travail" element={<Travail />} />
            <Route path="/contact" element={<Contact />} />


            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/politique-confidentialite" element={<Confidentialite />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Suspense>
    </BrowserRouter>
  </LanguageProvider>
);

export default App;
