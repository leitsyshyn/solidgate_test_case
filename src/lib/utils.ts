import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { UAH, USD } from "@dinero.js/currencies";
import { dinero, toDecimal } from "dinero.js";

const CURRENCIES = { USD, UAH } as const;

export type CurrencyCode = keyof typeof CURRENCIES;
export type Money = ReturnType<typeof dinero>;

export function toMoney(amountMinor: number, code: CurrencyCode): Money {
  return dinero({ amount: amountMinor, currency: CURRENCIES[code] });
}

export function fmtMoneyIntl(m: Money, locale: string) {
  return toDecimal(m, ({ value, currency }) =>
    Number(value).toLocaleString(locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: currency.exponent,
      maximumFractionDigits: currency.exponent,
    })
  );
}

export function fmtMoney(m: Money) {
  return toDecimal(m, ({ value, currency }) => `${value} ${currency.code}`);
}
