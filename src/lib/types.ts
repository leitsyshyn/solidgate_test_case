import type { Money } from "@/lib/utils";

export type IntervalUnit = "day" | "week" | "month" | "year";

export interface BillingCycle {
  every: number;
  unit: IntervalUnit;
}

export interface OneTimePurchase {
  kind: "one_time_purchase";
  price: Money;
}

export interface Subscription {
  kind: "subscription";
  price: Money;
  cycle: BillingCycle;
}

export interface FreeTrial {
  kind: "free_trial";
  free: BillingCycle;
  price: Money;
  cycle: BillingCycle;
}

export type Plan = OneTimePurchase | Subscription | FreeTrial;

export type OrderItem = {
  id: string;
  name: string;
  description: string;
  price?: Money;
  quantity?: number;
};

export type Order = {
  id: string;
  name: string;
  description: string;
  plan: Plan;
  items: OrderItem[];
};
