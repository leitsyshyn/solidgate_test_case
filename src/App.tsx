import {
  free_trial_order,
  one_time_payment_order,
  subscription_order,
} from "@/components/mock/orders";
import PaymentPage from "@/pages/PaymentPage";
import { HashRouter, Link, Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen">
        <nav className="flex gap-4 p-4 border-b max-lg:justify-center">
          <Link className="hover:underline underline-offset-2" to="/trial">
            Free trial
          </Link>
          <Link
            className="hover:underline underline-offset-2"
            to="/subscription"
          >
            Subscription
          </Link>
          <Link className="hover:underline underline-offset-2" to="/one-time">
            One-time
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/trial" replace />} />
          <Route
            path="/trial"
            element={<PaymentPage order={free_trial_order} />}
          />
          <Route
            path="/subscription"
            element={<PaymentPage order={subscription_order} />}
          />
          <Route
            path="/one-time"
            element={<PaymentPage order={one_time_payment_order} />}
          />
          <Route path="*" element={<Navigate to="/trial" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
