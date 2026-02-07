import { cn } from "../utils/cn";

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  ...props
}) {
  return (
    <button
      {...props}
      className={cn(
        "btn ds-focus",
        `btn-${variant}`,
        `btn-${size}`,
        className
      )}
    >
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
      <span>{props.children}</span>
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
}
