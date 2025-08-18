import {
  free_trial_order,
  one_time_payment_order,
  subscription_order,
} from "@/mocks/orders";
import PaymentPage from "@/pages/PaymentPage";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen">
        <nav className="flex gap-4 p-4 border-b max-lg:justify-center">
          <Link className="hover:underline underline-offset-2" to="/free-trial">
            Free trial
          </Link>
          <Link
            className="hover:underline underline-offset-2"
            to="/subscription"
          >
            Subscription
          </Link>
          <Link
            className="hover:underline underline-offset-2"
            to="/one-time-purchase"
          >
            One-time purchase
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/free-trial" replace />} />
          <Route
            path="/free-trial"
            element={<PaymentPage order={free_trial_order} />}
          />
          <Route
            path="/subscription"
            element={<PaymentPage order={subscription_order} />}
          />
          <Route
            path="/one-time-purchase"
            element={<PaymentPage order={one_time_payment_order} />}
          />
          <Route path="*" element={<Navigate to="/free-trial" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
