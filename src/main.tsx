import { Toaster } from "@/components/ui/sonner.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/i18n.ts";

if (import.meta.env.VITE_USE_MSW === "true") {
  const { worker } = await import("@/mocks/browser.ts");
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: "bypass",
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster richColors />
  </StrictMode>
);
