import type { Order } from "@/lib/types";
import { toMoney } from "@/lib/utils";
import { free_trial, one_time_payment, subscription } from "@/mocks/plans";

export const subscription_order: Order = {
  id: "1",
  name: "Premium Subscription",
  description:
    "This plan includes all premium features. Some other subscription description.",
  plan: subscription,
  items: [],
};
export const free_trial_order: Order = {
  id: "2",
  name: "Premium Subscription",
  description:
    "This free trial plan includes all premium features. Some other subscription description.",
  plan: free_trial,
  items: [],
};
export const one_time_payment_order: Order = {
  id: "3",
  name: "Some Order",
  description: "Some order description. And maybe some more description.",
  plan: one_time_payment,
  items: [
    {
      id: "1",
      name: "Some product name",
      description: "Some product description",
      price: toMoney(9999, "UAH"),
      quantity: 1,
    },
    {
      id: "2",
      name: "Another product name",
      description: "Another product description",
      price: toMoney(10000, "UAH"),
      quantity: 2,
    },
  ],
};
