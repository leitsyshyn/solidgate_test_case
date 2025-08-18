"use client";

import Loader from "@/assets/Loader.svg?react";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/types";
import { cn, fmtMoney } from "@/lib/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type PayWithCardButtonProps = {
  plan: Plan;
  submitting?: boolean;
  className?: string;
} & React.ComponentProps<typeof Button>;

export default function PayWithCardButton({
  plan,
  submitting = false,
  className,
  type = "submit",
  variant = "default",
  ...rest
}: PayWithCardButtonProps) {
  const { t } = useTranslation("checkout", { keyPrefix: "actions" });

  const cta = useMemo(() => {
    switch (plan.kind) {
      case "one_time_payment":
        return t("pay_with_amount", { amount: fmtMoney(plan.price) });
      case "subscription":
        return t("subscribe");
      default:
        return t("start_trial");
    }
  }, [plan, t]);

  return (
    <Button
      type={type}
      variant={variant}
      disabled={submitting || rest.disabled}
      aria-label={cta}
      className={cn(
        "text-base bg-accent h-12 disabled:opacity-100 ease-in duration-80 shadow-none hover:bg-accent-hover active:bg-accent-active hover:translate-y-[-2px] active:translate-y-[2px]",
        className
      )}
      {...rest}
    >
      <div
        className="relative overflow-hidden w-full h-full flex items-center justify-center"
        aria-live="polite"
        role="status"
      >
        <span
          className={cn(
            "transition-[opacity,translate] duration-120 ease-out",
            submitting
              ? "-translate-y-4 opacity-0"
              : "translate-y-0 opacity-100"
          )}
        >
          {cta}
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-3 transition-[opacity,translate] duration-120 ease-out",
            submitting ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <Loader className="size-4.5 animate-spin" aria-hidden />
          {t("processing_payment")}
        </span>
      </div>
    </Button>
  );
}
