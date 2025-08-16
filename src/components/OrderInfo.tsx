import { Separator } from "@/components/ui/separator";

interface PurchaseOptionProps {
  type: "one-time-payment" | "subscription" | "trial";
}
function PurchaseOption({ type }: PurchaseOptionProps) {
  if (type === "one-time-payment") {
    return (
      <div className="font-semibold self-end">
        <span className="text-sm">Total </span>
        <span>299.99 UAH</span>
      </div>
    );
  }
  if (type === "subscription") {
    return (
      <div className="font-semibold self-end">
        <span>299.99 UAH /</span>
        <span className="text-sm"> month</span>
      </div>
    );
  }
  if (type === "trial") {
    return (
      <div className="font-semibold self-end text-end">
        <div>5 days free</div>
        <div className="text-sm font-normal"> then 299.99 UAH per 14 days</div>
      </div>
    );
  }
}

export default function OrderInfo({ className }: { className?: string }) {
  return (
    <div
      className={` bg-order h-min rounded-md p-4 pt-3 flex flex-col gap-4 ${className}`}
    >
      <div className="text-lg leading-6 font-semibold">{`Order info <= 100 char.`}</div>
      <div className=" leading-6 font-medium">{`Description <= 400 char.`}</div>
      <Separator />
      <div>
        <div className="text-sm leading-5 font-medium">
          Lamel Professional Smart Skin Compact Powder
        </div>
        <div className="text-xs text-muted leading-4">Пудра для обличчя</div>
      </div>
      <Separator />
      <PurchaseOption type="trial" />
    </div>
  );
}
