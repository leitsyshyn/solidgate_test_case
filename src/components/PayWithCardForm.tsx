"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Info } from "lucide-react";

export const PaymentFormSchema = z.object({
  // TODO: Improve schema validation rules
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "Card number must be 13–19 digits"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  securityCode: z
    .string()
    .regex(/^\d{3,4}$/, "Security code must be 3 or 4 digits"),
});

interface PayWithCardFormProps {
  // TODO: Improve amount type
  amount?: number;
}

export default function PayWithCardForm({ amount }: PayWithCardFormProps) {
  const form = useForm<z.infer<typeof PaymentFormSchema>>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(values: z.infer<typeof PaymentFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 1234 1234 1234"
                  maxLength={19}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration Date</FormLabel>
              <FormControl>
                <Input
                  placeholder="MM/YY"
                  maxLength={5}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="securityCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVC</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="•••"
                    inputMode="numeric"
                    maxLength={4}
                    autoComplete="cc-csc"
                    className="pr-11"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  CVC is a 3–4 digit security code.
                </FormDescription>

                {/* TODO: Fix tooltip on mobile */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label="What is CVV?"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <Info className="size-4.5" aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    CVC is a 3–4 digit security code.
                  </TooltipContent>
                </Tooltip>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Pay {amount}</Button>
      </form>
    </Form>
  );
}
