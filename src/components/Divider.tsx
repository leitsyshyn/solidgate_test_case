import { Separator } from "@/components/ui/separator";

export default function Divider() {
  return (
    <div className="w-full flex items-center justify-center gap-4 overflow-hidden">
      <Separator />
      <span className="shrink-0 text-sm text-muted">or continue with</span>
      <Separator />
    </div>
  );
}
