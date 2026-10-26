// Listado: la isla de React del catálogo.
// Maneja los filtros, la URL, los estados (cargando, vacío, error) y los resultados.
import { useEffect, useMemo, useRef, useState } from "react";
import type { Producto } from "../../data/tipos";
import type { ImagenOptimizada } from "../../lib/imagenes";
import { whatsappUrl } from "../../lib/whatsapp";
import ProductCard from "../cards/ProductCard";
import ProductCardSkeleton from "../cards/ProductCardSkeleton";
import SegmentedControl from "../ui/SegmentedControl";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import Icon from "../ui/Icon";
import StateMessage from "../ui/StateMessage";
import PanelFiltros from "./PanelFiltros";
import {
  FILTROS_INICIALES, RANGOS, ORDENES,
  aplicarFiltros, contarActivos, leerDeUrl, escribirEnUrl,
  type Filtros, type Orden,
} from "./filtros";
import styles from "./Listado.module.css";

interface ListadoProps {
  productos: Producto[];
  imagenes: Record<string, ImagenOptimizada | undefined>;
}

const POR_PAGINA = 6;
const DEMORA_DEMO = 500; // simula la espera de un servidor

export default function Listado({ productos, imagenes }: ListadoProps) {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIALES);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const [visibles, setVisibles] = useState(POR_PAGINA);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const temporizador = useRef<number | undefined>(undefined);

  // 1. Al cargar la página, leemos los filtros de la URL (por ejemplo, ?condicion=usado)
  useEffect(() => {
    setFiltros(leerDeUrl(window.location.search));
    // Para probar el estado de error: agregá ?demo=error a la URL
    setError(new URLSearchParams(window.location.search).get("demo") === "error");
  }, []);

  // 2. Los resultados se recalculan solo cuando cambian los filtros
  const resultados = useMemo(() => aplicarFiltros(productos, filtros), [productos, filtros]);

  function simularCarga() {
    setCargando(true);
    window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => setCargando(false), DEMORA_DEMO);
  }

  // 3. Cada cambio actualiza el estado, la URL y muestra el skeleton un momento
  function cambiarFiltros(nuevos: Filtros) {
    setFiltros(nuevos);
    setVisibles(POR_PAGINA);
    window.history.replaceState(null, "", escribirEnUrl(nuevos));
    simularCarga();
  }

  const limpiar = () => cambiarFiltros({ ...FILTROS_INICIALES, condicion: filtros.condicion, orden: filtros.orden });

  function reintentar() {
    setError(false);
    cambiarFiltros(filtros);
  }

  const activos = contarActivos(filtros);
  const etiquetaPotencia = (v: string) => RANGOS.find((r) => r.valor === v)?.label ?? v;

  let contenido;
  if (error) {
    contenido = (
      <StateMessage type="error" title="No pudimos cargar los equipos" message="Puede ser un problema de conexión. Revisá tu señal e intentá de nuevo.">
        <Button icon="recargar" onClick={reintentar}>Reintentar</Button>
        <Button variant="link" icon="chat" href={whatsappUrl("Hola, no pude ver el catálogo de tractores.")} target="_blank">Consultar por WhatsApp</Button>
      </StateMessage>
    );
  } else if (cargando) {
    contenido = (
      <ul className={styles.grilla}>
        {Array.from({ length: 3 }, (_, i) => <li key={i}><ProductCardSkeleton /></li>)}
      </ul>
    );
  } else if (resultados.length === 0) {
    contenido = (
      <StateMessage type="empty" title="No encontramos resultados" message="Probá con otros filtros o consultanos: te ayudamos a encontrar el equipo para tu campo.">
        <Button variant="secondary" onClick={limpiar}>Limpiar filtros</Button>
        <Button icon="chat" href={whatsappUrl("Hola, busco un tractor y no encontré lo que necesito en la web.")} target="_blank">Consultar por WhatsApp</Button>
      </StateMessage>
    );
  } else {
    contenido = (
      <>
        <ul className={styles.grilla}>
          {resultados.slice(0, visibles).map((producto) => (
            <li key={producto.slug}>
              <ProductCard producto={producto} imagen={imagenes[producto.slug]} sizes="(min-width: 1024px) 277px, (min-width: 768px) 45vw, 90vw" />
            </li>
          ))}
        </ul>
        {resultados.length > visibles && (
          <div className={styles.mas}>
            <p className={styles.contador}>Mostrando {visibles} de {resultados.length}</p>
            <Button variant="secondary" onClick={() => setVisibles((v) => v + POR_PAGINA)}>Ver más tractores</Button>
          </div>
        )}
      </>
    );
  }

  const panelProps = { filtros, onChange: cambiarFiltros };

  return (
    <div className={styles.layout}>
      {/* Panel lateral: desktop */}
      <aside className={styles.lateral} aria-label="Filtros">
        <div className={styles.lateralCaja}>
          <div className={styles.lateralEncabezado}>
            <h2 className={styles.lateralTitulo}>Filtros</h2>
            {activos > 0 && <Button variant="link" size="sm" onClick={limpiar}>Limpiar</Button>}
          </div>
          <PanelFiltros {...panelProps} variante="lateral" />
        </div>
      </aside>

      <div className={styles.principal}>
        <div className={styles.barra}>
          <div className={styles.barraFila}>
            <SegmentedControl
              name="condicion"
              legend="Condición"
              value={filtros.condicion}
              onChange={(valor) => cambiarFiltros({ ...filtros, condicion: valor as Filtros["condicion"] })}
              options={[{ value: "nuevo", label: "Nuevos" }, { value: "usado", label: "Usados" }]}
            />
            {/* Chips de filtros aplicados: se quitan con un toque */}
            <div className={styles.aplicados}>
              {filtros.potencia.map((v) => (
                <Chip key={v} removable onClick={() => cambiarFiltros({ ...filtros, potencia: filtros.potencia.filter((x) => x !== v) })}>
                  {etiquetaPotencia(v)}
                </Chip>
              ))}
              {filtros.traccion.map((v) => (
                <Chip key={v} removable onClick={() => cambiarFiltros({ ...filtros, traccion: filtros.traccion.filter((x) => x !== v) })}>
                  {v}
                </Chip>
              ))}
            </div>
          </div>

          <div className={styles.barraFila}>
            <div className={styles.soloMobile}>
              <Button variant="secondary" size="sm" icon="filtro" onClick={() => sheetRef.current?.showModal()}>
                {activos > 0 ? `Filtrar (${activos})` : "Filtrar"}
              </Button>
            </div>
            <label className={styles.orden}>
              Ordenar por
              <select value={filtros.orden} onChange={(e) => cambiarFiltros({ ...filtros, orden: e.target.value as Orden })}>
                {ORDENES.map((o) => <option key={o.valor} value={o.valor}>{o.label}</option>)}
              </select>
            </label>
          </div>
        </div>

        {/* aria-live: el lector de pantalla anuncia los cambios del contador */}
        <p className={styles.contador} aria-live="polite">
          {error ? "" : cargando ? "Buscando equipos…" : `${resultados.length} ${resultados.length === 1 ? "resultado" : "resultados"} · Datos de demostración`}
        </p>

        {contenido}
      </div>

      {/* Bottom sheet: mobile */}
      <dialog
        ref={sheetRef}
        className={styles.sheet}
        aria-labelledby="titulo-filtros"
        onClick={(e) => { if (e.target === e.currentTarget) sheetRef.current?.close(); }}
      >
        <div className={styles.sheetAsa} aria-hidden="true" />
        <div className={styles.sheetEncabezado}>
          <h2 id="titulo-filtros" className={styles.sheetTitulo}>Filtros</h2>
          <button type="button" className={styles.sheetCerrar} onClick={() => sheetRef.current?.close()}>
            <Icon name="cerrar" label="Cerrar filtros" />
          </button>
        </div>
        <div className={styles.sheetCuerpo}>
          <PanelFiltros {...panelProps} variante="sheet" />
        </div>
        <div className={styles.sheetPie}>
          <Button variant="secondary" onClick={limpiar}>Limpiar</Button>
          <Button onClick={() => sheetRef.current?.close()}>
            {`Ver ${resultados.length} ${resultados.length === 1 ? "resultado" : "resultados"}`}
          </Button>
        </div>
      </dialog>
    </div>
  );
}