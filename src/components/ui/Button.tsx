// Button (React): mismas props y estilos que Button.astro, para usar dentro de islas.
// Con href se dibuja como enlace (<a>); sin href, como botón.
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
  href?: string;
  target?: "_blank";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  href,
  target,
  type = "button",
  className,
  ...rest
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], styles[size], fullWidth && styles.full, className]
    .filter(Boolean)
    .join(" ");

  const contenido = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
        {contenido}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {contenido}
    </button>
  );
}