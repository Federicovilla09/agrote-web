// Demo interactiva para la página /sistema. No se usa en el sitio.
import { useState } from "react";
import Chip from "../ui/Chip";
import Checkbox from "../ui/Checkbox";
import SegmentedControl from "../ui/SegmentedControl";
import Field from "../ui/Field";

const potencias = ["Hasta 100 HP", "100 a 200 HP", "Más de 200 HP"];

export default function DemoControles() {
  const [condicion, setCondicion] = useState("nuevos");
  const [potencia, setPotencia] = useState<string[]>(["Hasta 100 HP"]);
  const [telefono, setTelefono] = useState("3456");

  const togglePotencia = (p: string) =>
    setPotencia((actual) => (actual.includes(p) ? actual.filter((x) => x !== p) : [...actual, p]));

  return (
    <div style={{ display: "grid", gap: "var(--space-8)", maxWidth: 560 }}>
      <SegmentedControl
        name="condicion"
        legend="Condición"
        value={condicion}
        onChange={setCondicion}
        options={[{ value: "nuevos", label: "Nuevos" }, { value: "usados", label: "Usados" }]}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {potencias.map((p) => (
          <Chip key={p} active={potencia.includes(p)} onClick={() => togglePotencia(p)}>{p}</Chip>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {potencia.map((p) => (
          <Chip key={p} removable onClick={() => togglePotencia(p)}>{p}</Chip>
        ))}
      </div>

      <div style={{ display: "grid", gap: "var(--space-1)" }}>
        <Checkbox label="4x4" defaultChecked />
        <Checkbox label="4x2" />
        <Checkbox label="Deshabilitado" disabled />
      </div>

      <Field label="Nombre" placeholder="Tu nombre" />
      <Field
        label="Teléfono"
        inputMode="tel"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        error={telefono.replace(/\D/g, "").length < 10 ? "Ingresá un teléfono válido con código de área" : undefined}
      />
      <Field as="select" label="Me interesa" options={["Tractores", "Usados", "Drones", "Repuestos"]} />
      <Field as="textarea" label="Mensaje" placeholder="Contanos qué estás buscando" />
      <Field label="Deshabilitado" placeholder="No editable" disabled />
    </div>
  );
}