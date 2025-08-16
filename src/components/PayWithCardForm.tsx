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

import Info from "@/assets/Info.svg?react";
import Loader from "@/assets/Loader.svg?react";
import AmexInfo from "@/assets/amex_info.svg?react";
import CardInfo from "@/assets/card_info.svg?react";
import Slash from "@/assets/slash.svg?react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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

export default function PayWithCardForm({
  amount = 299.99,
}: PayWithCardFormProps) {
  const form = useForm<z.infer<typeof PaymentFormSchema>>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof PaymentFormSchema>) {
    console.log(values);
    await new Promise((r) => setTimeout(r, 800));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-text-secondary"
      >
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
        <div className="flex gap-2 items-start">
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="flex-1">
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
              <FormItem className="flex-1 gap-2">
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
                        className="absolute right-0 hover:text-text-secondary text-text-tertiary size-11 top-1/2 -translate-y-1/2 flex items-center justify-center"
                      >
                        <Info
                          className="size-4.5  transition-colors duration-120 ease-in"
                          aria-hidden="true"
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      sideOffset={16}
                      className="bg-primary-foreground p-4"
                    >
                      <div className="flex items-center gap-2">
                        <CardInfo />
                        <Slash />
                        <AmexInfo />
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="text-base bg-accent h-12 disabled:opacity-100 ease-in duration-80 shadow-none hover:bg-accent-hover active:bg-accent-active hover:translate-y-[-2px] active:translate-y-[2px]"
        >
          <div
            className="relative overflow-hidden w-full h-full flex items-center justify-center"
            aria-live="polite"
            role="status"
          >
            <span
              className={cn(
                "transition-[opacity,translate] duration-120 ease-out",
                form.formState.isSubmitting
                  ? "-translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              )}
            >
              Pay {amount} UAH
            </span>

            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-3 transition-[opacity,translate] duration-120 ease-out",
                form.formState.isSubmitting
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              )}
            >
              <Loader className="size-4.5 animate-spin" aria-hidden />
              Processing payment
            </span>
          </div>
        </Button>
      </form>
    </Form>
  );
}
