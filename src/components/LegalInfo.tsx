import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LegalInfo() {
  return (
    <Alert>
      <AlertDescription>
        <span>
          You'll have your{" "}
          <span className="font-bold">Plan Pro during 1 year</span>. After this
          period of time, your plan will be{" "}
          <span className="font-bold">automatically</span>{" "}
          <span className="font-bold">renewed</span> with its original price
          without any discounts applied.
        </span>
      </AlertDescription>
    </Alert>
  );
}
