// StateMessage: estado vacío (sin resultados) o error de carga.
// Las acciones se pasan como children para que cada pantalla decida qué ofrecer.
import type { ReactNode } from "react";
import Icon from "./Icon";
import styles from "./StateMessage.module.css";

interface StateMessageProps {
  type: "empty" | "error";
  title: string;
  message: string;
  children?: ReactNode;
}

export default function StateMessage({ type, title, message, children }: StateMessageProps) {
  return (
    <div className={`${styles.state} ${styles[type]}`} role={type === "error" ? "alert" : "status"}>
      <span className={styles.badge}>
        <Icon name={type === "empty" ? "buscar" : "alerta"} size={28} />
      </span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}