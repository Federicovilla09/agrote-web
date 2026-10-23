// Alert: mensaje de éxito, error o información (formulario de contacto).
import type { ReactNode } from "react";
import Icon from "./Icon";
import styles from "./Alert.module.css";

interface AlertProps {
  tone: "success" | "error" | "info";
  title: string;
  children?: ReactNode;
}

export default function Alert({ tone, title, children }: AlertProps) {
  return (
    // role="alert" interrumpe al lector de pantalla (errores);
    // role="status" lo anuncia sin interrumpir (éxito e info).
    <div className={`${styles.alert} ${styles[tone]}`} role={tone === "error" ? "alert" : "status"}>
      <Icon name={tone === "success" ? "check" : "alerta"} size={22} className={styles.icon} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {children && <p className={styles.message}>{children}</p>}
      </div>
    </div>
  );
}