import ApplePay from "@/assets/ApplePay.svg?react";
import { Button } from "@/components/ui/button";

export default function ApplePayButton() {
  return (
    <Button className="text-base h-12 shadow-none w-full rounded-[3px] ">
      <ApplePay className="size-12" />
    </Button>
  );
}
