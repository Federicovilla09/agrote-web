// SegmentedControl: elegir una opción entre pocas (Nuevos / Usados).
// Por dentro son radios nativos: se navega con las flechas del teclado.
import styles from "./SegmentedControl.module.css";

interface Option {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  name: string;
  legend: string; // describe el grupo para lectores de pantalla
  options: Option[];
  value: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
}

export default function SegmentedControl({ name, legend, options, value, onChange, fullWidth }: SegmentedControlProps) {
  return (
    <fieldset className={`${styles.group} ${fullWidth ? styles.full : ""}`}>
      <legend className="sr-only">{legend}</legend>
      {options.map((option) => (
        <label key={option.value} className={styles.option}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}