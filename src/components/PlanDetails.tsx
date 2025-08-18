import type { Plan } from "@/lib/types";
import { cn, fmtMoney } from "@/lib/utils";
import * as React from "react";
import { useTranslation } from "react-i18next";

function DetailsWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("font-semibold self-end", className)}>{children}</div>
  );
}

function DetailsTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("whitespace-nowrap leading-6 font-semibold", className)}
    >
      {children}
    </span>
  );
}

function DetailsDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-sm whitespace-nowrap leading-6", className)}>
      {children}
    </span>
  );
}

export function PlanDetails({
  plan,
  className,
}: {
  plan: Plan;
  className?: string;
}) {
  const { t } = useTranslation("checkout");

  if (plan.kind === "one_time_payment") {
    return (
      <DetailsWrapper className={className}>
        <DetailsDescription>{t("labels.total")}&nbsp;</DetailsDescription>
        <DetailsTitle>{fmtMoney(plan.price)}</DetailsTitle>
      </DetailsWrapper>
    );
  }

  if (plan.kind === "subscription") {
    return (
      <DetailsWrapper className={className}>
        <DetailsTitle>{fmtMoney(plan.price)}</DetailsTitle>
        <DetailsTitle aria-hidden="true">{" / "}</DetailsTitle>
        <DetailsDescription>
          {t("cycle.short", { count: plan.cycle.every, unit: plan.cycle.unit })}
        </DetailsDescription>
      </DetailsWrapper>
    );
  }

  return (
    <DetailsWrapper className={cn("text-end", className)}>
      <DetailsTitle className="block">
        {t("cycle.short", { count: plan.free.every, unit: plan.free.unit })}{" "}
        {t("labels.free")}
      </DetailsTitle>
      <DetailsDescription className="block font-normal leading-5 text-sm">
        {t("labels.then")} {fmtMoney(plan.price)}{" "}
        {t("cycle.per", { count: plan.cycle.every, unit: plan.cycle.unit })}
      </DetailsDescription>
    </DetailsWrapper>
  );
}
