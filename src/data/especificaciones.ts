// Especificaciones de demostración, calculadas a partir de los datos de cada producto.
// En un catálogo real vendrían cargadas por equipo; acá las generamos para no
// escribir a mano una ficha técnica por cada modelo.
import type { Producto } from "./tipos";

export interface GrupoSpecs {
  titulo: string;
  filas: [string, string][];
}

export interface DatoClave {
  label: string;
  valor: string;
}

// Redondea a múltiplos de "paso": redondear(3417, 100) → 3400
const redondear = (valor: number, paso: number) => Math.round(valor / paso) * paso;
const miles = (valor: number) => valor.toLocaleString("es-AR");

// El tercer dato del resumen es la transmisión: "85 HP · 4 cil. · 12+12" → "12+12"
const transmision = (p: Producto) => p.resumen.split(" · ")[2] ?? "Consultar";

function motor(hp: number) {
  if (hp <= 60) return { cilindros: "3", cilindrada: "2,9 L" };
  if (hp <= 120) return { cilindros: "4, turbo", cilindrada: "3,4 L" };
  return { cilindros: "6, turbo", cilindrada: "6,7 L" };
}

export function especificacionesDe(p: Producto): GrupoSpecs[] {
  const grupos: GrupoSpecs[] = [];

  if (p.categoria === "Tractor") {
    const { cilindros, cilindrada } = motor(p.potenciaHp);
    grupos.push(
      {
        titulo: "Motor",
        filas: [["Potencia nominal", `${p.potenciaHp} HP`], ["Cilindros", cilindros], ["Cilindrada", cilindrada], ["Combustible", "Diésel"]],
      },
      {
        titulo: "Transmisión",
        filas: [["Marchas", p.condicion === "nuevo" ? transmision(p) : "Consultar"], ["Doble tracción", p.traccion === "4x4" ? "Sí" : "No"]],
      },
      {
        titulo: "Sistema hidráulico",
        filas: [["Caudal", `${redondear(p.potenciaHp * 0.65, 5)} L/min`], ["Levante trasero", `${miles(redondear(p.potenciaHp * 33, 100))} kg`]],
      },
      {
        titulo: "Dimensiones y peso",
        filas: [["Peso operativo", `${miles(redondear(p.potenciaHp * 40, 100))} kg`], ["Tanque de combustible", `${redondear(p.potenciaHp * 1.05, 10)} L`]],
      },
    );
  } else {
    grupos.push({
      titulo: "Datos generales",
      filas: [["Categoría", p.categoria], ...(p.potenciaHp ? [["Potencia", `${p.potenciaHp} HP`] as [string, string]] : [])],
    });
  }

  if (p.condicion === "usado") {
    grupos.unshift({
      titulo: "Estado de la unidad",
      filas: [
        ["Año", String(p.anio ?? "Consultar")],
        ["Horas de uso", p.horas ? `${miles(p.horas)} h` : "Consultar"],
        ["Revisión", "Revisada por el taller (demo)"],
      ],
    });
  }

  return grupos;
}

// Los cuatro datos que se muestran grandes en el resumen de la ficha
export function datosClaveDe(p: Producto): DatoClave[] {
  if (p.condicion === "usado") {
    return [
      { label: "Año", valor: String(p.anio ?? "—") },
      { label: "Horas", valor: p.horas ? miles(p.horas) : "—" },
      { label: "Potencia", valor: p.potenciaHp ? `${p.potenciaHp} HP` : "—" },
      { label: "Tracción", valor: p.traccion ?? "—" },
    ];
  }
  const { cilindros, cilindrada } = motor(p.potenciaHp);
  return [
    { label: "Potencia", valor: `${p.potenciaHp} HP` },
    { label: "Cilindros", valor: cilindros },
    { label: "Cilindrada", valor: cilindrada },
    { label: "Transmisión", valor: transmision(p) },
  ];
}