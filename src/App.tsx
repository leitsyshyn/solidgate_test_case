import {
  free_trial_order,
  one_time_payment_order,
  subscription_order,
} from "@/components/mock/orders";
import PaymentPage from "@/pages/PaymentPage";

function App() {
  return (
    <div className="min-h-screen">
      <PaymentPage order={free_trial_order} />
      <PaymentPage order={subscription_order} />
      <PaymentPage order={one_time_payment_order} />
    </div>
  );
}

export default App;
