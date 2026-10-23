// Button (React): mismas props y estilos que Button.astro, para usar dentro de islas.
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "./Icon";
import type { IconName } from "./icons";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "light" | "link";
  size?: "md" | "sm";
  icon?: IconName;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  type = "button",
  className,
  ...rest
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], styles[size], fullWidth && styles.full, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </button>
  );
}