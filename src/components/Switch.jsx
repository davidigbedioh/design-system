export function Switch({ value, onChange, label }) {
  return (
    <div className="row" role="group" aria-label={label || "Switch"}>
      <button
        type="button"
        className="switch ds-focus"
        data-on={value ? "true" : "false"}
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange?.(!value)}
      />
      {label ? <span className="muted" style={{ fontSize: 13 }}>{label}</span> : null}
    </div>
  );
}
