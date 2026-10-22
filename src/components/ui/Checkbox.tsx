// Checkbox: input nativo con estilo propio. Acepta todas las props de un <input>.
import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export default function Checkbox({ label, ...inputProps }: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" className={styles.input} {...inputProps} />
      <span>{label}</span>
    </label>
  );
}