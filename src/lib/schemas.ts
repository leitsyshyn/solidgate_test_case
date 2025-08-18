import valid from "card-validator";
import type { TFunction } from "i18next";
import { z } from "zod";

const toDigits = (s: string) => s.replace(/[^\p{N}]/gu, "");

export function makePayWithCardFormSchema(t: TFunction<"checkout">) {
  return z
    .object({
      cardNumber: z
        .string()
        .transform(toDigits)
        .pipe(z.string().nonempty(t("form.errors.card_number.required")))
        .superRefine((val, ctx) => {
          const num = valid.number(val);
          const len = val.length;
          const lengths = num.card?.lengths;
          const min = lengths ? Math.min(...lengths) : 12;
          const max = lengths ? Math.max(...lengths) : 19;

          if (!num.isPotentiallyValid) {
            ctx.addIssue({
              code: "custom",
              message: t("form.errors.card_number.invalid"),
            });
            return;
          }

          if (len < min) {
            ctx.addIssue({
              code: "custom",
              message: t("form.errors.card_number.incomplete"),
            });
            return;
          }
          if (len > max) {
            ctx.addIssue({
              code: "custom",
              message: t("form.errors.card_number.too_many"),
            });
            return;
          }

          if (!num.isValid) {
            if (lengths?.includes(len)) {
              ctx.addIssue({
                code: "custom",
                message: t("form.errors.card_number.checksum"),
              });
            } else {
              ctx.addIssue({
                code: "custom",
                message: t("form.errors.card_number.invalid"),
              });
            }
          }
        }),

      expirationDate: z
        .string()
        .transform(toDigits)
        .pipe(z.string().nonempty(t("form.errors.expiration_date.required")))
        .superRefine((val, ctx) => {
          const mm = val.slice(0, 2);
          const yy = val.slice(2, 4);

          if (!valid.expirationMonth(mm).isValid) {
            ctx.addIssue({
              code: "custom",
              message: t("form.errors.expiration_date.invalid_month"),
            });
            return;
          }

          if (
            !valid.expirationYear(yy).isValid &&
            Number(yy) > new Date().getFullYear() % 100
          ) {
            ctx.addIssue({
              code: "custom",
              message: t("form.errors.expiration_date.invalid"),
            });
            return;
          }

          const res = valid.expirationDate({ month: mm, year: yy });
          if (!res.isValid) {
            if (res.isPotentiallyValid) {
              ctx.addIssue({
                code: "custom",
                message: t("form.errors.expiration_date.invalid"),
              });
            } else {
              ctx.addIssue({
                code: "custom",
                message: t("form.errors.expiration_date.expired"),
              });
            }
          }
        }),
      securityCode: z
        .string()
        .transform(toDigits)
        .pipe(z.string().nonempty(t("form.errors.security_code.required"))),
    })
    .superRefine(({ securityCode, cardNumber }, ctx) => {
      const num = valid.number(cardNumber);
      const expected = num.card?.code?.size;
      const name = num.card?.code?.name;
      const cvv = valid.cvv(securityCode, expected);
      if (!cvv.isValid || !cvv.isPotentiallyValid) {
        ctx.addIssue({
          code: "custom",
          path: ["securityCode"],
          message: name
            ? t("form.errors.security_code.length_named", { name, expected })
            : t("form.errors.security_code.length", {
                expected: expected || "3-4",
              }),
        });
      }
    });
}
