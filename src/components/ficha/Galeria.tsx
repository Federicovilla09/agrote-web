// Galería de la ficha: deslizable en mobile, con flechas y miniaturas en desktop.
// El deslizamiento lo hace el navegador (scroll-snap); React solo sigue qué foto se ve.
import { useRef, useState } from "react";
import type { ImagenOptimizada } from "../../lib/imagenes";
import Icon from "../ui/Icon";
import styles from "./Galeria.module.css";

export interface FotoGaleria {
  imagen?: ImagenOptimizada;
  prueba?: boolean; // imagen provisoria, se muestra oscurecida y con etiqueta
}

interface GaleriaProps {
  fotos: FotoGaleria[];
  modelo: string;
}

export default function Galeria({ fotos, modelo }: GaleriaProps) {
  const pista = useRef<HTMLDivElement>(null);
  const [actual, setActual] = useState(0);
  const total = fotos.length;

  // Lleva la pista hasta la foto pedida
  function irA(indice: number) {
    const el = pista.current;
    if (!el) return;
    const destino = Math.max(0, Math.min(indice, total - 1));
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: destino * el.clientWidth, behavior: reducir ? "auto" : "smooth" });
  }

  // Al deslizar (con el dedo o con irA), calculamos qué foto quedó a la vista
  function alDeslizar() {
    const el = pista.current;
    if (el) setActual(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <section className={styles.galeria} aria-label={`Fotos de ${modelo}`}>
      <div className={styles.visor}>
        <div ref={pista} className={styles.pista} onScroll={alDeslizar} tabIndex={0} aria-label="Fotos. Deslizá o usá las flechas para ver más">
          {fotos.map((foto, i) => (
            <figure key={i} className={`${styles.diapositiva} ${foto.prueba ? styles.esPrueba : ""}`} aria-label={`Foto ${i + 1} de ${total}`}>
              {foto.imagen && (
                <img
                  src={foto.imagen.src}
                  srcSet={foto.imagen.srcset}
                  sizes="(min-width: 1024px) 700px, 100vw"
                  width={foto.imagen.width}
                  height={foto.imagen.height}
                  alt={foto.prueba ? `${modelo}, imagen de prueba` : modelo}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              )}
              {foto.prueba && <span className={styles.etiquetaPrueba}>Imagen de prueba</span>}
            </figure>
          ))}
        </div>

        <button type="button" className={`${styles.flecha} ${styles.anterior}`} onClick={() => irA(actual - 1)} disabled={actual === 0} aria-label="Foto anterior">
          <Icon name="chevron-derecha" className={styles.girar} />
        </button>
        <button type="button" className={`${styles.flecha} ${styles.siguiente}`} onClick={() => irA(actual + 1)} disabled={actual === total - 1} aria-label="Foto siguiente">
          <Icon name="chevron-derecha" />
        </button>

        <span className={styles.contador} aria-live="polite">{actual + 1} / {total}</span>
        <div className={styles.puntos} aria-hidden="true">
          {fotos.map((_, i) => <span key={i} className={`${styles.punto} ${i === actual ? styles.puntoActivo : ""}`} />)}
        </div>
      </div>

      <div className={styles.miniaturas}>
        {fotos.map((foto, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.miniatura} ${foto.prueba ? styles.esPrueba : ""}`}
            onClick={() => irA(i)}
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === actual}
          >
            {foto.imagen && <img src={foto.imagen.src} srcSet={foto.imagen.srcset} sizes="130px" alt="" loading="lazy" />}
          </button>
        ))}
      </div>
    </section>
  );
}