// Panel con los grupos de filtros. Se usa en el panel lateral (desktop)
// y dentro del bottom sheet (mobile). En mobile la potencia se elige con chips.
import Checkbox from "../ui/Checkbox";
import Chip from "../ui/Chip";
import { RANGOS, TRACCIONES, type Filtros, type RangoPotencia, type Traccion } from "./filtros";
import styles from "./PanelFiltros.module.css";

interface PanelFiltrosProps {
  filtros: Filtros;
  onChange: (filtros: Filtros) => void;
  variante: "lateral" | "sheet";
}

// Agrega el valor si no estaba, o lo saca si ya estaba
function alternar<T>(lista: T[], valor: T): T[] {
  return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];
}

export default function PanelFiltros({ filtros, onChange, variante }: PanelFiltrosProps) {
  const cambiarPotencia = (valor: RangoPotencia) => onChange({ ...filtros, potencia: alternar(filtros.potencia, valor) });
  const cambiarTraccion = (valor: Traccion) => onChange({ ...filtros, traccion: alternar(filtros.traccion, valor) });

  return (
    <div className={styles.panel}>
      <fieldset className={styles.grupo}>
        <legend className={styles.titulo}>Potencia</legend>
        {variante === "sheet" ? (
          <div className={styles.chips}>
            {RANGOS.map((r) => (
              <Chip key={r.valor} active={filtros.potencia.includes(r.valor)} onClick={() => cambiarPotencia(r.valor)}>
                {r.label}
              </Chip>
            ))}
          </div>
        ) : (
          <div className={styles.opciones}>
            {RANGOS.map((r) => (
              <Checkbox key={r.valor} label={r.label} checked={filtros.potencia.includes(r.valor)} onChange={() => cambiarPotencia(r.valor)} />
            ))}
          </div>
        )}
      </fieldset>

      <fieldset className={styles.grupo}>
        <legend className={styles.titulo}>Tracción</legend>
        <div className={styles.opciones}>
          {TRACCIONES.map((t) => (
            <Checkbox key={t.valor} label={t.label} checked={filtros.traccion.includes(t.valor)} onChange={() => cambiarTraccion(t.valor)} />
          ))}
        </div>
      </fieldset>
    </div>
  );
}