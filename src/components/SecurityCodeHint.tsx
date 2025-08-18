import Info from "@/assets/Info.svg?react";
import AmexInfo from "@/assets/amex_info.svg?react";
import CardInfo from "@/assets/card_info.svg?react";
import Slash from "@/assets/slash.svg?react";
import { Hint, HintContent, HintTrigger } from "@/components/ui/hint";

export default function SecurityCodeHint() {
  return (
    <Hint delayDuration={150}>
      <HintTrigger asChild>
        <button
          type="button"
          aria-label="What is CVV?"
          className="absolute right-0 hover:text-muted text-text-tertiary size-11 top-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <Info
            className="size-4.5 transition-colors duration-120 ease-in"
            aria-hidden="true"
          />
        </button>
      </HintTrigger>
      <HintContent
        className="p-4 w-min"
        side="top"
        withArrow={false}
        sideOffset={12}
      >
        <div className="flex items-center gap-2">
          <CardInfo />
          <Slash />
          <AmexInfo />
        </div>
      </HintContent>
    </Hint>
  );
}
