import Union from "@/assets/Union.svg?react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}
export default function Footer({ className }: FooterProps) {
  return (
    <a
      href="https://solidgate.com/"
      target="_blank"
      className={cn("flex gap-1 items-center justify-self-end", className)}
    >
      <span className="text-muted leading-5 ">Powered by</span>
      <Union />
    </a>
  );
}
