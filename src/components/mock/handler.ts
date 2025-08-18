export type MockResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };

export interface MockOptions {
  errorRate?: number;
  minDelayMs?: number;
  maxDelayMs?: number;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const randInt = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));

export async function mockSubmit<T>(
  payload: T,
  { errorRate = 0, minDelayMs = 300, maxDelayMs = 1200 }: MockOptions = {}
): Promise<MockResult<T>> {
  const low = Math.max(0, Math.min(minDelayMs, maxDelayMs));
  const high = Math.max(minDelayMs, maxDelayMs);

  await sleep(randInt(low, high));

  if (Math.random() < Math.min(1, Math.max(0, errorRate))) {
    const msgs = [
      { code: "MOCK_DECLINED", message: "Payment was declined" },
      { code: "MOCK_NETWORK", message: "Network error, please try again" },
    ];
    return { ok: false, error: msgs[randInt(0, msgs.length - 1)] };
  }

  return { ok: true, data: payload };
}
