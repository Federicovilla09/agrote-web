// Skeleton: forma gris que ocupa el lugar del contenido mientras carga.
import type { CSSProperties } from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  shape?: "line" | "block" | "circle";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
}

export default function Skeleton({ shape = "line", width = "100%", height, className }: SkeletonProps) {
  return (
    <span
      className={`${styles.skeleton} ${styles[shape]} ${className ?? ""}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}