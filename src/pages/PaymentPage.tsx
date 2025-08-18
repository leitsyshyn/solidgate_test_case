import PayWithCardForm from "@/components/PayWithCardForm";

import ApplePayButton from "@/components/ApplePayButton";
import AutoRenewNotice from "@/components/AutoRenewNotice";
import BackButton from "@/components/BackButton";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import OrderInfo from "@/components/OrderInfo";

import Arrow from "@/assets/Arrow.svg?react";
import LanguageToggle from "@/components/LanguageToggle";
import { PlanHeader } from "@/components/PlanHeader";
import type { Order } from "@/lib/types";
import { free_trial_order } from "@/mocks/orders";
import { useTranslation } from "react-i18next";

interface PaymentPageProps {
  order: Order;
}

export default function PaymentPage({
  order = free_trial_order,
}: PaymentPageProps) {
  const { t } = useTranslation("common");
  return (
    <div className="p-4 min-h-screen">
      <div className="mx-auto lg:w-fit">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-4 lg:grid-cols-1 lg:justify-items-end">
          <Arrow className="size-6 lg:hidden justify-self-start" />
          <span className="text-lg leading-8 font-semibold lg:hidden justify-self-center">
            {t("pages.checkout.title")}
          </span>
          <LanguageToggle className="justify-self-end" />
        </div>
        <div className="flex max-lg:flex-col max-lg:items-center gap-8">
          <div className="min-[452px]:max-w-[420px] basis-[420px] shrink-0 flex flex-col gap-6">
            <BackButton className="max-lg:hidden" />
            <PlanHeader plan={order.plan} />
            <ApplePayButton />
            <Divider />
            <div className="space-y-2">
              <PayWithCardForm plan={order.plan} />
              {(order.plan.kind === "free_trial" ||
                order.plan.kind === "subscription") && (
                <AutoRenewNotice
                  planName={order.name}
                  duration={order.plan.cycle}
                />
              )}
            </div>
          </div>
          <OrderInfo
            className="min-[452px]:max-w-[420px] lg:basis-[420px] shrink-0"
            order={order}
          />
        </div>
        <Footer className="max-lg:mb-9 mt-8 lg:mt-14 mx-auto" />
      </div>
    </div>
  );
}
