// Icon (React): misma lógica que Icon.astro, para usar dentro de islas.
import { icons, type IconName } from "./icons";

interface IconProps {
  name: IconName;
  size?: number;
  label?: string;
  className?: string;
}

export default function Icon({ name, size = 24, label, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}