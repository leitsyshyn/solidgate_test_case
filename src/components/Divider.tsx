import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

export default function Divider() {
  const { t } = useTranslation("checkout");
  return (
    <div className="w-full flex items-center justify-center gap-4 overflow-hidden">
      <Separator />
      <span className="shrink-0 text-sm text-muted">
        {t("labels.or_continue_with")}
      </span>
      <Separator />
    </div>
  );
}
