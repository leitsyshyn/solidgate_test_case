import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  return (
    <div className={className}>
      <Button
        disabled={true}
        variant={"ghost"}
        className="p-2 h-10 text-sm leading-6 hover:bg-order max-lg:hidden"
      >
        Eng
      </Button>
      <Button
        variant={"ghost"}
        className="p-2 h-10 text-sm leading-6 hover:bg-order"
      >
        Укр
      </Button>
    </div>
  );
}
