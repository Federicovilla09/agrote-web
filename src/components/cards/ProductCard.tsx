// ProductCard: tarjeta de producto (nuevo o usado).
// Está en React porque también la usa la isla del listado con filtros.
import type { Producto } from "../../data/tipos";
import type { ImagenOptimizada } from "../../lib/imagenes";
import { whatsappUrl, mensajeProducto } from "../../lib/whatsapp";
import Button from "../ui/Button";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  producto: Producto;
  imagen?: ImagenOptimizada;
  sizes?: string;
}

export default function ProductCard({ producto, imagen, sizes = "(min-width: 1024px) 282px, 90vw" }: ProductCardProps) {
  const { modelo, categoria, condicion, resumen, slug } = producto;
  const etiqueta = `${categoria} · ${condicion === "nuevo" ? "Nuevo" : "Usado"}`;

  return (
    <article className={styles.card}>
      {imagen ? (
        <img
          className={styles.foto}
          src={imagen.src}
          srcSet={imagen.srcset}
          sizes={sizes}
          width={imagen.width}
          height={imagen.height}
          alt={`${categoria} ${modelo}`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className={styles.foto} aria-hidden="true" />
      )}

      <div className={styles.body}>
        <p className={styles.eyebrow}>{etiqueta}</p>
        <h3 className={styles.title}>{modelo}</h3>
        <p className={styles.specs}>{resumen}</p>
        <div className={styles.actions}>
          <Button href={`/equipos/${slug}`} size="sm">Ver ficha</Button>
          <Button href={whatsappUrl(mensajeProducto(modelo))} target="_blank" variant="secondary" size="sm">
            Consultar
          </Button>
        </div>
      </div>
    </article>
  );
}