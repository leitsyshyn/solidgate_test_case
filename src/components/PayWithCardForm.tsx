"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
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
import { Hint, HintContent, HintTrigger } from "@/components/ui/hint";
import { PayWithCardFormSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import valid from "card-validator";
import { toast } from "sonner";

interface PayWithCardFormProps {
  // TODO: Improve amount type
  amount?: number;
}

export default function PayWithCardForm({
  amount = 299.99,
}: PayWithCardFormProps) {
  const form = useForm<z.infer<typeof PayWithCardFormSchema>>({
    resolver: zodResolver(PayWithCardFormSchema),
    defaultValues: {
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
    },
    mode: "onSubmit",
  });

  const card = valid.number(form.watch("cardNumber"));

  async function onSubmit(values: z.infer<typeof PayWithCardFormSchema>) {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Payment successful!", {
      description: JSON.stringify(values),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-muted"
      >
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => {
            const ALLOW_19 = false;
            const c = valid.number(field.value).card;
            let lengths = c?.lengths ?? [15, 16];
            if (!ALLOW_19) lengths = lengths.filter((L) => L <= 16);
            const maxLen = Math.max(...lengths);
            const baseGaps = c?.gaps ?? [4, 8, 12];
            const gaps = baseGaps.filter((g) => g < maxLen);
            const format = Array.from({ length: maxLen }, (_, i) => {
              const pos = i + 1;
              return gaps.includes(pos) && pos < maxLen ? "# " : "#";
            }).join("");
            return (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <PatternFormat
                    customInput={Input}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    format={format}
                    onValueChange={(v) => {
                      field.onChange(v.formattedValue);
                      if (form.formState.errors.securityCode) {
                        void form.trigger("securityCode");
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex gap-2 items-start">
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Expiration Date</FormLabel>
                <FormControl>
                  <PatternFormat
                    customInput={Input}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    format="##/##"
                    placeholder="MM/YY"
                    mask={["M", "M", "Y", "Y"]}
                    valueIsNumericString
                    value={field.value}
                    onBlur={field.onBlur}
                    isAllowed={({ value }) => {
                      if (value.length < 2) return true;
                      const m = Number(value.slice(0, 2));
                      return m >= 1 && m <= 12;
                    }}
                    onValueChange={({ value: v }) => {
                      if (v.length === 1 && /[2-9]/.test(v)) v = "0" + v;
                      field.onChange(v);
                    }}
                    onKeyDown={(e) => {
                      if (e.key !== "Backspace") return;
                      const el = e.currentTarget as HTMLInputElement;
                      const selStart = el.selectionStart ?? 0;
                      const selEnd = el.selectionEnd ?? selStart;
                      if (selStart !== selEnd) return;
                      const digits = field.value ?? "";
                      if (
                        digits.length >= 1 &&
                        digits[0] === "0" &&
                        selStart <= 2
                      ) {
                        e.preventDefault();
                        field.onChange(digits.slice(2));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="securityCode"
            rules={{ deps: ["cardNumber"] }}
            render={({ field }) => (
              <FormItem className="flex-1 gap-2">
                <FormLabel>{card.card?.code?.name ?? "CVC"}</FormLabel>
                <div className="relative">
                  <FormControl>
                    <PatternFormat
                      customInput={Input}
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder={"•".repeat(card.card?.code?.size ?? 3)}
                      format={"#".repeat(card.card?.code?.size ?? 3)}
                      className="pr-11"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    {card.card?.code?.name === "CID"
                      ? "A 4-digit code on the front of your card."
                      : "A 3-digit code on the back of your card."}
                  </FormDescription>
                  <Hint delayDuration={150}>
                    <HintTrigger asChild>
                      <button
                        type="button"
                        aria-label="What is CVV?"
                        className="absolute right-0 hover:text-muted text-text-tertiary size-11 top-1/2 -translate-y-1/2 flex items-center justify-center"
                      >
                        <Info
                          className="size-4.5 transition-colors duration-120 ease-in"
                          aria-hidden="true"
                        />
                      </button>
                    </HintTrigger>

                    <HintContent
                      className="p-4 w-min"
                      side="top"
                      withArrow={false}
                      sideOffset={12}
                    >
                      <div className="flex items-center gap-2">
                        <CardInfo />
                        <Slash />
                        <AmexInfo />
                      </div>
                    </HintContent>
                  </Hint>
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
