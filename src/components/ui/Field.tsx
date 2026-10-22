// Field: campo de formulario con etiqueta, ayuda de error y estados.
// as="input" | "select" | "textarea". Pasa el resto de las props al control nativo.
import { useId } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import Icon from "./Icon";
import styles from "./Field.module.css";

interface BaseProps {
  label: string;
  error?: string;
}

type InputFieldProps = BaseProps & { as?: "input" } & InputHTMLAttributes<HTMLInputElement>;
type TextareaFieldProps = BaseProps & { as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectFieldProps = BaseProps & { as: "select"; options: string[] } & SelectHTMLAttributes<HTMLSelectElement>;

export type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export default function Field(props: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const { label, error } = props;

  // Atributos compartidos: conectan el campo con su error para lectores de pantalla
  const a11y = {
    id,
    className: styles.input,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  let control;
  if (props.as === "select") {
    const { as, label: _l, error: _e, options, placeholder, ...rest } = props as SelectFieldProps & { placeholder?: string };
    control = (
      <>
        <select {...rest} {...a11y} defaultValue={rest.value === undefined ? "" : undefined}>
          <option value="" disabled>{placeholder ?? "Elegí una opción"}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <Icon name="chevron-abajo" size={20} className={styles.chevron} />
      </>
    );
  } else if (props.as === "textarea") {
    const { as, label: _l, error: _e, ...rest } = props;
    control = <textarea {...rest} {...a11y} />;
  } else {
    const { as, label: _l, error: _e, ...rest } = props;
    control = <input {...rest} {...a11y} />;
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <div className={styles.control}>{control}</div>
      {error && <p id={errorId} className={styles.error}>{error}</p>}
    </div>
  );
}