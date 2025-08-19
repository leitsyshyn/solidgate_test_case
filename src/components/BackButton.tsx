import Arrow from "@/assets/Arrow.svg?react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function BackButton({ className }: { className?: string }) {
  const { t } = useTranslation("common");
  return (
    <Button
      type="submit"
      variant="ghost"
      className={cn(
        "group relative ease-in duration-80 py-2 hover:bg-transparent pl-10 items-center w-min -translate-x-10",
        className
      )}
    >
      <div className="relative overflow-hidden w-full h-full flex items-center ">
        <span
          className={cn(
            "transition-[opacity,translate,width] duration-120 flex items-center gap-3 ease-out",
            "group-hover:-translate-y-4 group-hover:opacity-0 ",
            "translate-y-0 opacity-100 "
          )}
        >
          <span className="text-lg leading-8 font-semibold">
            {t("pages.checkout.title")}
          </span>
        </span>

        <span
          className={cn(
            "absolute inset-0 flex items-center gap-3 transition-[opacity,translate] duration-120 ease-out",
            "group-hover:translate-y-0 group-hover:opacity-100",
            "translate-y-4 opacity-0 "
          )}
        >
          <span className="text-lg leading-8 font-semibold">
            {t("buttons.back")}
          </span>
        </span>
      </div>
      <div
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shrink-0 outline-none absolute top-0 left-0 -z-1 ease-in duration-80 shadow-none group-hover:bg-order w-min p-2 h-11 pr-4"
        )}
      >
        <Arrow className="size-6 shrink-0" />
        <div className="relative overflow-hidden w-full h-full flex items-center ">
          <span
            className={cn(
              "flex items-center gap-3 transition-[opacity,translate,width] duration-120 ease-out ",
              "group-hover:translate-y-0 group-hover:opacity-100",
              "translate-y-4 opacity-0 "
            )}
          >
            <span className="text-lg leading-8 font-semibold opacity-0">
              {t("buttons.back")}
            </span>
          </span>
        </div>
      </div>
    </Button>
  );
}
