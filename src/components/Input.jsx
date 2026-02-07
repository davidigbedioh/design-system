import { cn } from "../utils/cn";

export function Input({
  label,
  hint,
  error,
  className,
  id,
  ...props
}) {
  const inputId = id || `in_${Math.random().toString(16).slice(2)}`;
  const hintId = hint ? `${inputId}_hint` : undefined;
  const errorId = error ? `${inputId}_error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("field", className)}>
      {label ? <label className="label" htmlFor={inputId}>{label}</label> : null}
      <input
        id={inputId}
        className={cn("input ds-focus")}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />
      {hint ? <div id={hintId} className="hint">{hint}</div> : null}
      {error ? <div id={errorId} className="error">{error}</div> : null}
    </div>
  );
}
