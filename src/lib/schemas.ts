import valid from "card-validator";
import { z } from "zod";

const toDigits = (s: string) => s.replace(/[^\p{N}]/gu, "");

export const PayWithCardFormSchema = z
  .object({
    cardNumber: z
      .string()
      .transform(toDigits)
      .pipe(z.string().nonempty("Card number is required"))
      .superRefine((val, ctx) => {
        const num = valid.number(val);
        const len = val.length;
        const lengths = num.card?.lengths;
        const min = lengths ? Math.min(...lengths) : 12;
        const max = lengths ? Math.max(...lengths) : 19;

        if (!num.isPotentiallyValid) {
          ctx.addIssue({ code: "custom", message: "Invalid card number" });
          return;
        }

        if (len < min) {
          ctx.addIssue({ code: "custom", message: "Incomplete card number" });
          return;
        }
        if (len > max) {
          ctx.addIssue({ code: "custom", message: "Too many digits" });
          return;
        }

        if (!num.isValid) {
          if (lengths?.includes(len)) {
            ctx.addIssue({ code: "custom", message: "Invalid checksum" });
          } else {
            ctx.addIssue({ code: "custom", message: "Invalid card number" });
          }
        }
      }),

    expirationDate: z
      .string()
      .transform(toDigits)
      .pipe(z.string().nonempty("Expiration date is required"))
      .superRefine((val, ctx) => {
        const mm = val.slice(0, 2);
        const yy = val.slice(2, 4);

        if (!valid.expirationMonth(mm).isValid) {
          ctx.addIssue({ code: "custom", message: "Month must be 01–12" });
          return;
        }

        if (
          !valid.expirationYear(yy).isValid &&
          Number(yy) > new Date().getFullYear() % 100
        ) {
          ctx.addIssue({ code: "custom", message: "Invalid expiration date" });
          return;
        }

        const res = valid.expirationDate({ month: mm, year: yy });
        if (!res.isValid) {
          if (res.isPotentiallyValid) {
            ctx.addIssue({
              code: "custom",
              message: "Invalid expiration date",
            });
          } else {
            ctx.addIssue({ code: "custom", message: "Card is expired" });
          }
        }
      }),
    securityCode: z
      .string()
      .transform(toDigits)
      .pipe(z.string().nonempty("Security code is required")),
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
        message: `${name ? name + " must be" : "Must be"} ${
          expected ?? "3-4"
        } digits`,
      });
    }
  });
