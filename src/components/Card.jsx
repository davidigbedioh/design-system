export function Card({ children, className }) {
  return <div className={"card " + (className || "")}>{children}</div>;
}

export function CardHeader({ title, action, subtitle }) {
  return (
    <div className="card-h">
      <div>
        <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>{title}</div>
        {subtitle ? <div className="muted" style={{ fontSize: 13 }}>{subtitle}</div> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function CardBody({ children }) {
  return <div className="card-b">{children}</div>;
}
