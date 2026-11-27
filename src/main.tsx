import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/* Les pages arrivent déjà écrites en HTML (pré-générées au déploiement) : React les reprend
   sans tout redessiner. Si l'adresse ne correspond pas à la page écrite (une page inconnue
   reçoit l'accueil), ou en développement, React construit la page lui-même. */
const racine = document.getElementById("root")!;
const page = racine.dataset.page;
const ici = window.location.pathname.replace(/\/+$/, "") || "/";
if (page && page === ici) {
  hydrateRoot(racine, <App />);
} else {
  racine.textContent = "";
  createRoot(racine).render(<App />);
}
