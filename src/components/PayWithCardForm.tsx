"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import PayWithCardButton from "@/components/PayWithCardButton";
import SecurityCodeHint from "@/components/SecurityCodeHint";
import { makePayWithCardFormSchema } from "@/lib/schemas";
import type { Plan } from "@/lib/types";
import valid from "card-validator";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
interface PayWithCardFormProps {
  plan: Plan;
}

export default function PayWithCardForm({ plan }: PayWithCardFormProps) {
  const { t } = useTranslation("checkout");

  const schema = useMemo(() => makePayWithCardFormSchema(t), [t]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      cardNumber: "",
      expirationDate: "",
      securityCode: "",
    },
    mode: "onSubmit",
  });

  const card = valid.number(form.watch("cardNumber"));

  const [isSecurityCodeVisible, setSecurityCodeVisible] = useState(false);

  async function onSubmit(values: z.infer<typeof schema>) {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Payment successful!");
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
                <FormLabel>{t("form.fields.card_number.label")}</FormLabel>
                <FormControl>
                  <PatternFormat
                    customInput={Input}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 1234 1234 1234"
                    format={format}
                    onValueChange={(v) => {
                      field.onChange(v.formattedValue);
                      if (
                        form.formState.errors.securityCode ||
                        form.formState.dirtyFields.securityCode
                      ) {
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
                <FormLabel>{t("form.fields.expiration_date.label")}</FormLabel>
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
                      type={isSecurityCodeVisible ? "text" : "password"}
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder={"•".repeat(card.card?.code?.size ?? 3)}
                      format={"#".repeat(card.card?.code?.size ?? 3)}
                      className="pr-11"
                      {...field}
                      onFocus={() => setSecurityCodeVisible(true)}
                      onBlur={() => setSecurityCodeVisible(false)}
                    />
                  </FormControl>
                  <SecurityCodeHint />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <PayWithCardButton
          submitting={form.formState.isSubmitting}
          plan={plan}
          className="w-full"
        />
      </form>
    </Form>
  );
}
