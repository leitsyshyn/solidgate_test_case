"use client";

import usePrefersCoarsePointer from "@/components/hooks/usePrefersCoarsePointer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as React from "react";

type Mode = "auto" | "tooltip" | "popover";

type TooltipRootProps = React.ComponentProps<typeof Tooltip>;
type PopoverRootProps = React.ComponentProps<typeof Popover>;

type HintRootProps<K extends Mode> = K extends "tooltip"
  ? TooltipRootProps
  : K extends "popover"
  ? PopoverRootProps
  : TooltipRootProps & PopoverRootProps;

export type HintProps<K extends Mode = "auto"> = {
  mode?: Mode;
} & HintRootProps<K>;

type HintTrigger = typeof TooltipTrigger | typeof PopoverTrigger;
type HintContent = typeof TooltipContent | typeof PopoverContent;
const HintCtx = React.createContext<{
  Trigger: HintTrigger;
  Content: HintContent;
} | null>(null);
const useHintCtx = () => {
  const ctx = React.useContext(HintCtx);
  if (!ctx) throw new Error("Hint.* must be used inside <Hint>");
  return ctx;
};

export function Hint<K extends Mode = "auto">({
  mode = "auto",
  children,
  ...rest
}: HintProps<K>) {
  const coarse = usePrefersCoarsePointer();
  const resolved: Exclude<Mode, "auto"> =
    mode === "auto" ? (coarse ? "popover" : "tooltip") : mode;

  const Root = resolved === "tooltip" ? Tooltip : Popover;
  const Trigger = resolved === "tooltip" ? TooltipTrigger : PopoverTrigger;
  const Content = resolved === "tooltip" ? TooltipContent : PopoverContent;

  return (
    <HintCtx.Provider value={{ Trigger, Content }}>
      <Root {...rest}>{children}</Root>
    </HintCtx.Provider>
  );
}

type TooltipTriggerProps = React.ComponentPropsWithoutRef<
  typeof TooltipTrigger
>;
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
export type HintTriggerProps = TooltipTriggerProps & PopoverTriggerProps;

export const HintTrigger = React.forwardRef<
  HTMLButtonElement,
  HintTriggerProps
>(function HintTrigger(props, ref) {
  const { Trigger } = useHintCtx();
  return <Trigger ref={ref} {...props} />;
});

type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipContent
>;
type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverContent
>;
export type HintContentProps = TooltipContentProps & PopoverContentProps;

export const HintContent = React.forwardRef<HTMLDivElement, HintContentProps>(
  function HintContent({ ...props }, ref) {
    const { Content } = useHintCtx();
    return <Content ref={ref} {...props} />;
  }
);
