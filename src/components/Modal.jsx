import { useEffect } from "react";
import { Button } from "./Button";

export function Modal({ open, title, children, onClose, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal"}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="modal">
        <div className="modalH">
          <div className="modalT">{title}</div>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        <div className="modalB">{children}</div>
        {footer ? <div className="modalB" style={{ borderTop: "1px solid var(--border)" }}>{footer}</div> : null}
      </div>
    </div>
  );
}
