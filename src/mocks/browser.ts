import { setupWorker } from "msw/browser";
import { makeHandlers } from "./handlers";

const errorRate = Number(import.meta.env.VITE_MOCK_ERROR_RATE ?? "0");
const minDelayMs = Number(import.meta.env.VITE_MOCK_MIN_DELAY ?? "300");
const maxDelayMs = Number(import.meta.env.VITE_MOCK_MAX_DELAY ?? "1200");

export const worker = setupWorker(
  ...makeHandlers({ errorRate, minDelayMs, maxDelayMs })
);
