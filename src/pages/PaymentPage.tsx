import Arrow from "@/assets/Arrow.svg?react";
import PayWithCardForm from "@/components/PayWithCardForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import ApplePay from "@/assets/ApplePay.svg?react";
import Union from "@/assets/Union.svg?react";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  return (
    <div className="p-4 pb-10 ">
      <div className="flex items-center gap-2 justify-between mb-4">
        <Arrow />
        <span className="text-lg leading-8 font-semibold">Checkout</span>
        <span>Укр</span>
      </div>

      <div className="max-w-md mx-auto flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="font-semibold text-2xl leading-8 ">5 days free</div>
          <div className="font-medium leading-5">
            then 299.99 UAH per 14 days
          </div>
        </div>
        <Button className="text-base h-12 shadow-none w-full rounded-[3px] ">
          <ApplePay className="size-12" />
        </Button>
        <div className="w-full flex items-center justify-center gap-4 overflow-hidden">
          <Separator />
          <span className="shrink-0 text-sm text-muted">or continue with</span>
          <Separator />
        </div>
        <div className="space-y-2">
          <PayWithCardForm />
          <Alert>
            <AlertDescription>
              <span>
                You'll have your{" "}
                <span className="font-bold">Plan Pro during 1 year</span>. After
                this period of time, your plan will be{" "}
                <span className="font-bold">automatically renewed</span> with
                its original price without any discounts applied.
              </span>
            </AlertDescription>
          </Alert>
        </div>
        <div className="w-full bg-order  rounded-md p-4 pt-3 flex flex-col gap-4 ">
          <div className="text-lg leading-6 font-semibold">{`Order info <= 100 char.`}</div>
          <div className=" leading-6 font-medium">{`Description <= 400 char.`}</div>
          <Separator />
          <div>
            <div className="text-sm leading-5 font-medium">
              Lamel Professional Smart Skin Compact Powder
            </div>
            <div className="text-xs text-muted leading-4">
              Пудра для обличчя
            </div>
          </div>
          <Separator />
          <div className="font-semibold self-end">
            <span>299.99 UAH /</span>
            <span className="text-sm"> month</span>
          </div>
        </div>
        <div className="flex gap-1 items-center justify-self-end">
          <span className="text-muted leading-5 ">Powered by</span>
          <Union />
        </div>
      </div>
    </div>
  );
}
