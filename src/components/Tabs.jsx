import { useId, useMemo, useState } from "react";

export function Tabs({ items = [], defaultValue, onChange }) {
  const id = useId();
  const initial = defaultValue || (items[0]?.value ?? "tab0");
  const [value, setValue] = useState(initial);

  const selected = useMemo(() => items.find(i => i.value === value), [items, value]);

  const set = (v) => {
    setValue(v);
    onChange?.(v);
  };

  return (
    <div className="tabs">
      <div className="tablist" role="tablist" aria-label="Tabs">
        {items.map((it, idx) => {
          const tabId = `${id}_t_${idx}`;
          const panelId = `${id}_p_${idx}`;
          const isSel = it.value === value;
          return (
            <button
              key={it.value}
              id={tabId}
              className="tab ds-focus"
              role="tab"
              aria-selected={isSel}
              aria-controls={panelId}
              tabIndex={isSel ? 0 : -1}
              onClick={() => set(it.value)}
            >
              {it.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="card" style={{ padding: 16 }}>
        {selected?.content}
      </div>
    </div>
  );
}
