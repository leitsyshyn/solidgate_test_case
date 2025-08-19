"use client";

import { PlanDetails } from "@/components/PlanDetails";
import { Separator } from "@/components/ui/separator";
import type { Order, OrderItem } from "@/lib/types";
import { cn, fmtMoney } from "@/lib/utils";

interface OrderItemProps {
  className?: string;
  item: OrderItem;
}

interface OrderInfoProps {
  className?: string;
  order: Order;
}

function OrderItemInfo({ className, item }: OrderItemProps) {
  return (
    <div key={item.id} className={cn(className)}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="text-sm leading-5 font-medium">{item.name}</div>
          <div className="text-xs text-muted leading-4">{item.description}</div>
        </div>
        <div className="text-end">
          {item.price && (
            <div className="text-sm font-medium">{fmtMoney(item.price)}</div>
          )}
          {item.quantity && (
            <div className="text-xs text-muted leading-5">x{item.quantity}</div>
          )}
        </div>
      </div>
      <Separator className="mt-4" />
    </div>
  );
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
        <OrderItemInfo key={item.id} item={item} />
      ))}
      <PlanDetails plan={order.plan} />
    </div>
  );
}
