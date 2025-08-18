import type { Plan } from "@/lib/types";
import { cn, fmtMoney } from "@/lib/utils";
import { useTranslation } from "react-i18next";

function HeaderWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("max-lg:text-center", className)}>{children}</div>;
}

function HeaderTitile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "whitespace-nowrap font-semibold text-2xl leading-8 lg:text-3xl lg:leading-10",
        className
      )}
    >
      {children}
    </span>
  );
}

function HeaderDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "whitespace-nowrap text-sm font-medium leading-5 lg:leading-6 lg:text-lg",
        className
      )}
    >
      {children}
    </span>
  );
}

export function PlanHeader({
  plan,
  className,
}: {
  plan: Plan;
  className?: string;
}) {
  const { t } = useTranslation("checkout");

  if (plan.kind === "one_time_payment") {
    return (
      <HeaderWrapper className={className}>
        <HeaderTitile>{fmtMoney(plan.price)}</HeaderTitile>
        <HeaderDescription className="text-sm lg:text-base block">
          {t("labels.one_time_purchase")}{" "}
        </HeaderDescription>
      </HeaderWrapper>
    );
  }

  if (plan.kind === "subscription") {
    return (
      <HeaderWrapper className={className}>
        <HeaderTitile className="whitespace-nowrap font-semibold text-2xl leading-8 lg:text-3xl lg:leading-10">
          {fmtMoney(plan.price)}
        </HeaderTitile>
        <HeaderTitile className="font-medium" aria-hidden="true">
          {" / "}
        </HeaderTitile>
        <HeaderDescription>
          {t("cycle.short", { count: plan.cycle.every, unit: plan.cycle.unit })}
        </HeaderDescription>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper className={className}>
      <HeaderTitile>
        {t("cycle.short", { count: plan.free.every, unit: plan.free.unit })}{" "}
        {t("labels.free")}
      </HeaderTitile>
      <HeaderDescription className="block">
        {t("labels.then")} {fmtMoney(plan.price)}{" "}
        {t("cycle.per", {
          count: plan.cycle.every,
          unit: plan.cycle.unit,
        })}
      </HeaderDescription>
    </HeaderWrapper>
  );
}
