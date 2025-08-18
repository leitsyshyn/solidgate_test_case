import i18n from "i18next";
import ICU from "i18next-icu";
import { initReactI18next } from "react-i18next";

import enCheckout from "@/locales/en/checkout.json";
import enCommon from "@/locales/en/common.json";
import ukCheckout from "@/locales/uk/checkout.json";
import ukCommon from "@/locales/uk/common.json";

import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: { checkout: enCheckout, common: enCommon },
  uk: { checkout: ukCheckout, common: ukCommon },
} as const;

i18n
  .use(new ICU())
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "uk"],
    defaultNS: "common",
    ns: ["checkout", "common"],
    interpolation: { escapeValue: false },
    returnNull: false,
  });

export default i18n;
