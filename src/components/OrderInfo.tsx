"use client";

import { PlanDetails } from "@/components/PlanDetails";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OrderInfoProps {
  className?: string;
  order: Order;
}

export default function OrderInfo({ className, order }: OrderInfoProps) {
  return (
    <div
      className={cn(
        "bg-order h-min rounded-md p-4 lg:p-8 pt-3 flex flex-col gap-4",
        className
      )}
    >
      <div className="text-lg leading-6 font-semibold">{order.name}</div>
      <div className="leading-6 font-medium">{order.description}</div>
      <Separator />
      {order.items.map((item) => (
        <div key={item.id}>
          <div className="text-sm leading-5 font-medium">{item.name}</div>
          <div className="text-xs text-muted leading-4">{item.description}</div>
          <Separator className="mt-4" />
        </div>
      ))}
      <PlanDetails plan={order.plan} />
    </div>
  );
}
