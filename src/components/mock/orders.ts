import {
  free_trial,
  one_time_payment,
  subscription,
} from "@/components/mock/plans";
import type { Order } from "@/lib/types";

export const subscription_order: Order = {
  id: "1",
  name: "Some name",
  description: "Some desc",
  plan: subscription,
  items: [],
};
export const free_trial_order: Order = {
  id: "2",
  name: "Some name",
  description: "Some desc",
  plan: free_trial,
  items: [],
};
export const one_time_payment_order: Order = {
  id: "3",
  name: "Some name",
  description: "Some desc",
  plan: one_time_payment,
  items: [
    {
      id: "1",
      name: "Some name",
      description: "Some desc",
    },
  ],
};
