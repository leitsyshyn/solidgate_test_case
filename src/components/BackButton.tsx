import Arrow from "@/assets/Arrow.svg?react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackButton({ className }: { className?: string }) {
  return (
    <Button
      type="submit"
      variant="ghost"
      className={cn(
        "group ease-in duration-80 shadow-none hover:bg-order items-center  w-min pl-2! -translate-x-10",
        className
      )}
    >
      <Arrow className="size-6" />
      <div className="relative overflow-hidden w-full h-full flex items-center ">
        <span
          className={cn(
            "transition-[opacity,translate,width] duration-120 flex items-center gap-3 ease-out",
            "group-hover:-translate-y-4 group-hover:opacity-0 ",
            "translate-y-0 opacity-100 "
          )}
        >
          <span className="text-lg leading-8 font-semibold">Checkout</span>
        </span>

        <span
          className={cn(
            "absolute inset-0 flex items-center  gap-3 transition-[opacity,translate,width] duration-120 ease-out",
            "group-hover:translate-y-0 group-hover:opacity-100",
            "translate-y-4 opacity-0 "
          )}
        >
          <span className="text-lg leading-8 font-semibold">Back</span>
        </span>
      </div>
    </Button>
  );
}
