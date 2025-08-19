import ApplePay from "@/assets/ApplePay.svg?react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ApplePayButton() {
  return (
    <Button
      onClick={() => {
        toast.warning("Not implemented");
      }}
      className="text-base h-12 shadow-none w-full rounded-[3px] "
    >
      <ApplePay className="size-12" />
    </Button>
  );
}
