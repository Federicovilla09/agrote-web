import { useState } from "react";

export default function PruebaReact() {
  const [clics, setClics] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setClics(clics + 1)}
      style={{
        background: "var(--color-action-primary)",
        color: "var(--color-action-on-primary)",
        padding: "var(--space-4) var(--space-6)",
        borderRadius: "var(--radius-sm)",
        fontWeight: 700,
      }}
    >
      React funciona · {clics} clics
    </button>
  );
}