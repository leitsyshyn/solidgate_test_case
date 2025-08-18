"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import type { BillingCycle } from "@/lib/types";
import { Trans, useTranslation } from "react-i18next";

export default function AutoRenewNotice({
  planName,
  duration,
}: {
  planName: string;
  duration: BillingCycle;
}) {
  const { t } = useTranslation("checkout");
  const during = t("cycle.during", {
    count: duration.every,
    unit: duration.unit,
  });

  return (
    <Alert>
      <AlertDescription>
        <Trans
          ns="checkout"
          i18nKey="legal.autoRenew"
          values={{ planName, during }}
          components={{
            b: <span className="font-bold" />,
          }}
        />
      </AlertDescription>
    </Alert>
  );
}
