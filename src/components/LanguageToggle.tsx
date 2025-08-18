"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Lang = "en" | "uk";

const CHOICES: { code: Lang; label: string }[] = [
  { code: "en", label: "Eng" },
  { code: "uk", label: "Укр" },
];

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const { i18n } = useTranslation();

  const current = (i18n.resolvedLanguage || i18n.language || "en").split(
    "-"
  )[0] as Lang;

  const setLang = (code: Lang) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
  };

  return (
    <div className={className}>
      {CHOICES.map(({ code, label }) => {
        const active = code === current;
        return (
          <Button
            key={code}
            type="button"
            variant="ghost"
            disabled={active}
            onClick={() => setLang(code)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "p-2 h-10 text-sm leading-6 hover:bg-order active:bg-order",
              active && "max-lg:hidden"
            )}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
