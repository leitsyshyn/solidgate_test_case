import { delay, http, HttpResponse } from "msw";

type Opts = { errorRate?: number; minDelayMs?: number; maxDelayMs?: number };

export const makeHandlers = ({
  errorRate = 0,
  minDelayMs = 300,
  maxDelayMs = 1200,
}: Opts = {}) => [
  http.post("*/process-payment", async ({ request }) => {
    const body = await request.json();
    const ms = Math.floor(
      minDelayMs + Math.random() * (maxDelayMs - minDelayMs + 1)
    );
    await delay(ms);

    if (Math.random() < Math.min(1, Math.max(0, errorRate))) {
      const statuses = [402, 503] as const;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const msg = status === 402 ? "Payment declined" : "Temporary issue";
      return HttpResponse.json({ message: msg }, { status });
    }

    return HttpResponse.json({ ok: true, echo: body }, { status: 200 });
  }),
];
