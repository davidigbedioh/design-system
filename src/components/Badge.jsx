import { cn } from "../utils/cn";

export function Badge({ tone = "primary", children, className }) {
  return <span className={cn("badge", `badge-${tone}`, className)}>{children}</span>;
}
