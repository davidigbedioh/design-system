import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Button } from "./Button";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((toast) => {
    const id = ++seq.current;
    const t = { id, tone: "info", title: "Notice", description: "", duration: 3500, ...toast };
    setToasts((prev) => [t, ...prev].slice(0, 4));

    if (t.duration > 0) {
      window.setTimeout(() => remove(id), t.duration);
    }
    return id;
  }, [remove]);

  const api = useMemo(() => ({ push, remove }), [push, remove]);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="toastHost" aria-live="polite" aria-relevant="additions removals">
        {toasts.map((t) => (
          <div key={t.id} className="toast" role="status">
            <div className={"toastDot " + (t.tone || "")} aria-hidden="true" />
            <div style={{ flex: 1 }}>
              <div className="toastTitle">{t.title}</div>
              {t.description ? <div className="toastBody">{t.description}</div> : null}
            </div>
            <Button variant="ghost" size="sm" onClick={() => remove(t.id)}>✕</Button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
