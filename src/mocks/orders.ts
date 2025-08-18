import type { Order } from "@/lib/types";
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
  description: "Some other order description. And maybe some more description.",
  plan: one_time_payment,
  items: [
    {
      id: "1",
      name: "Some name",
      description: "Some desc",
    },
  ],
};
