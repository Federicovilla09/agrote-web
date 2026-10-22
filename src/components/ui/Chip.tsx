// Chip: dos usos.
// 1. Filtro que se activa y desactiva (aria-pressed).
// 2. Filtro aplicado que se quita con un toque (removable).
import type { ReactNode } from "react";
import Icon from "./Icon";
import styles from "./Chip.module.css";

interface ChipProps {
  children: ReactNode;
  active?: boolean;
  removable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Chip({ children, active = false, removable = false, disabled, onClick }: ChipProps) {
  if (removable) {
    return (
      <button type="button" className={`${styles.chip} ${styles.active}`} onClick={onClick} disabled={disabled}>
        {children}
        <span className="sr-only">(quitar filtro)</span>
        <Icon name="cerrar" size={14} />
      </button>
    );
  }

  return (
    <button type="button" className={styles.chip} aria-pressed={active} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}