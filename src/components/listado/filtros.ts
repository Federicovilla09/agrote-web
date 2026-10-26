// Lógica de los filtros del listado: qué filtros existen, cómo se aplican
// y cómo se guardan en la URL. No tiene nada visual: solo datos y funciones.
import type { Producto } from "../../data/tipos";

export type Condicion = "nuevo" | "usado";
export type RangoPotencia = "hasta-100" | "100-200" | "mas-200";
export type Traccion = "4x4" | "4x2";
export type Orden = "potencia-asc" | "potencia-desc" | "nombre";

export interface Filtros {
  condicion: Condicion;
  potencia: RangoPotencia[];
  traccion: Traccion[];
  orden: Orden;
}

export const FILTROS_INICIALES: Filtros = {
  condicion: "nuevo",
  potencia: [],
  traccion: [],
  orden: "potencia-asc",
};

export const RANGOS: { valor: RangoPotencia; label: string; min: number; max: number }[] = [
  { valor: "hasta-100", label: "Hasta 100 HP", min: 0, max: 100 },
  { valor: "100-200", label: "100 a 200 HP", min: 101, max: 200 },
  { valor: "mas-200", label: "Más de 200 HP", min: 201, max: Infinity },
];

export const TRACCIONES: { valor: Traccion; label: string }[] = [
  { valor: "4x4", label: "4x4" },
  { valor: "4x2", label: "4x2" },
];

export const ORDENES: { valor: Orden; label: string }[] = [
  { valor: "potencia-asc", label: "Menor potencia" },
  { valor: "potencia-desc", label: "Mayor potencia" },
  { valor: "nombre", label: "Nombre" },
];

// Filtra y ordena los productos según los filtros elegidos
export function aplicarFiltros(productos: Producto[], filtros: Filtros): Producto[] {
  const resultado = productos.filter((p) => {
    if (p.condicion !== filtros.condicion) return false;
    if (filtros.potencia.length > 0) {
      const enAlgunRango = RANGOS.some(
        (r) => filtros.potencia.includes(r.valor) && p.potenciaHp >= r.min && p.potenciaHp <= r.max,
      );
      if (!enAlgunRango) return false;
    }
    if (filtros.traccion.length > 0 && (!p.traccion || !filtros.traccion.includes(p.traccion))) return false;
    return true;
  });

  return [...resultado].sort((a, b) => {
    if (filtros.orden === "potencia-desc") return b.potenciaHp - a.potenciaHp;
    if (filtros.orden === "nombre") return a.modelo.localeCompare(b.modelo, "es");
    return a.potenciaHp - b.potenciaHp;
  });
}

// Cantidad de filtros activos (para el botón "Filtrar (2)")
export const contarActivos = (f: Filtros) => f.potencia.length + f.traccion.length;

// --- URL: los filtros se guardan como ?condicion=usado&potencia=hasta-100 ---

export function leerDeUrl(search: string): Filtros {
  const params = new URLSearchParams(search);
  const lista = <T extends string>(clave: string, validos: readonly T[]) =>
    (params.get(clave)?.split(",") ?? []).filter((v): v is T => validos.includes(v as T));

  const condicion = params.get("condicion") === "usado" ? "usado" : "nuevo";
  const orden = ORDENES.some((o) => o.valor === params.get("orden")) ? (params.get("orden") as Orden) : "potencia-asc";

  return {
    condicion,
    potencia: lista(
      "potencia",
      RANGOS.map((r) => r.valor),
    ),
    traccion: lista(
      "traccion",
      TRACCIONES.map((t) => t.valor),
    ),
    orden,
  };
}

export function escribirEnUrl(f: Filtros): string {
  const params = new URLSearchParams();
  if (f.condicion !== "nuevo") params.set("condicion", f.condicion);
  if (f.potencia.length) params.set("potencia", f.potencia.join(","));
  if (f.traccion.length) params.set("traccion", f.traccion.join(","));
  if (f.orden !== "potencia-asc") params.set("orden", f.orden);
  const texto = params.toString();
  return texto ? `?${texto}` : window.location.pathname;
}