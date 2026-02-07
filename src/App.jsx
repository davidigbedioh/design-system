import { useMemo, useState } from "react";
import "./styles/theme.css";
import "./styles/components.css";

import { ThemeToggle } from "./components/ThemeToggle";
import { Button } from "./components/Button";
import { Card, CardBody, CardHeader } from "./components/Card";
import { Badge } from "./components/Badge";
import { Input } from "./components/Input";
import { Modal } from "./components/Modal";
import { Tabs } from "./components/Tabs";
import { ToastProvider, useToast } from "./components/Toast";

function SearchBar({ value, onChange }) {
  return (
    <div style={{ width: 320 }}>
      <Input
        label="Component search"
        placeholder="Try: button, modal, toast..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        hint={<>Tip: press <kbd>/</kbd> to focus (optional)</>}
      />
    </div>
  );
}

function Demo() {
  const { push } = useToast();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [email, setEmail] = useState("");

  const sections = useMemo(() => {
    const all = [
      {
        key: "buttons",
        title: "Buttons",
        content: (
          <div className="stack">
            <div className="row">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        )
      },
      {
        key: "badges",
        title: "Badges",
        content: (
          <div className="row">
            <Badge tone="primary">Primary</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
          </div>
        )
      },
      {
        key: "inputs",
        title: "Inputs",
        content: (
          <div className="stack">
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hint="We’ll never share your email."
              error={email && !email.includes("@") ? "Please enter a valid email." : ""}
            />
            <div className="row">
              <Button
                variant="secondary"
                onClick={() => push({ tone: "success", title: "Saved", description: "Your input was captured." })}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => setEmail("")}
              >
                Clear
              </Button>
            </div>
          </div>
        )
      },
      {
        key: "modal",
        title: "Modal",
        content: (
          <div className="stack">
            <div className="muted">Accessible modal with Escape + click-outside close.</div>
            <div className="row">
              <Button onClick={() => setOpen(true)}>Open modal</Button>
              <Button
                variant="secondary"
                onClick={() => push({ tone: "info", title: "Heads up", description: "This is a toast notification." })}
              >
                Show toast
              </Button>
            </div>
            <Modal
              open={open}
              title="Confirm action"
              onClose={() => setOpen(false)}
              footer={
                <div className="row" style={{ justifyContent: "flex-end" }}>
                  <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={() => { setOpen(false); push({ tone: "success", title: "Done", description: "Action confirmed." }); }}>Confirm</Button>
                </div>
              }
            >
              <div className="muted">
                This modal demonstrates focus-visible styles, keyboard close, and click-outside dismiss.
              </div>
            </Modal>
          </div>
        )
      },
      {
        key: "tabs",
        title: "Tabs",
        content: (
          <Tabs
            items={[
              { value: "one", label: "Overview", content: <div className="muted">Tokens, components, accessibility defaults.</div> },
              { value: "two", label: "Guidelines", content: <div className="muted">Use consistent spacing, variants, and states.</div> },
             
            ]}
          />
        )
      },
      {
        key: "toasts",
        title: "Toasts",
        content: (
          <div className="stack">
            <div className="row">
              <Button variant="secondary" onClick={() => push({ tone: "success", title: "Success", description: "Everything worked." })}>Success</Button>
              <Button variant="secondary" onClick={() => push({ tone: "warning", title: "Warning", description: "Check this before proceeding." })}>Warning</Button>
              <Button variant="secondary" onClick={() => push({ tone: "danger", title: "Error", description: "Something failed." })}>Error</Button>
              <Button variant="secondary" onClick={() => push({ tone: "info", title: "Info", description: "Here’s something useful." })}>Info</Button>
            </div>
            <div className="muted">Toasts auto-dismiss and are capped at 4</div>
          </div>
        )
      }
    ];

    const needle = q.trim().toLowerCase();
    if (!needle) return all;
    return all.filter(s => s.title.toLowerCase().includes(needle) || s.key.includes(needle));
  }, [q, email, open, push]);

  return (
    <div>
      <div className="header">
        <div className="brand">
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--primary)" }} aria-hidden="true" />
          <span>Design System</span>
          
        </div>
        <div className="row">
          <SearchBar value={q} onChange={setQ} />
          <ThemeToggle />
        </div>
      </div>

      <div className="container">
        <div className="grid">
          <div className="col-12">
            <Card>
              <CardHeader
                title="Component Gallery"
                subtitle="A compact, portfolio-ready design system demo."
                action={<Badge tone="primary">demo</Badge>}
              />
              <CardBody>
                <div className="row">
                  <Badge tone="success">Accessible defaults</Badge>
                  <Badge tone="primary">Dark + Light</Badge>
                  <Badge tone="warning">Variants + sizes</Badge>
                  <Badge tone="danger">Keyboard friendly</Badge>
                </div>
                <div className="hr" />
                <div className="muted">
                  
                </div>
              </CardBody>
            </Card>
          </div>

          {sections.map((s) => (
            <div key={s.key} className="col-6">
              <Card>
                <CardHeader title={s.title} action={<Badge>{s.key}</Badge>} />
                <CardBody>{s.content}</CardBody>
              </Card>
            </div>
          ))}

          {sections.length === 0 ? (
            <div className="col-12">
              <Card>
                <CardBody>
                  <div style={{ fontWeight: 900 }}>No matches</div>
                  <div className="muted">Try searching for “modal”, “toast”, “tabs”, “input”.</div>
                </CardBody>
              </Card>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}
