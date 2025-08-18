import type { Plan } from "@/lib/types";
import { toMoney } from "@/lib/utils";

export const free_trial: Plan = {
  kind: "free_trial",
  free: { every: 5, unit: "day" },
  price: toMoney(29999, "UAH"),
  cycle: { every: 14, unit: "day" },
};
export const subscription: Plan = {
  kind: "subscription",
  price: toMoney(29999, "UAH"),
  cycle: { every: 1, unit: "month" },
};

export const one_time_payment: Plan = {
  kind: "one_time_payment",
  price: toMoney(29999, "UAH"),
};
