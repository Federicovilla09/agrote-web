// Tipos de los datos de demostración. Describen la "forma" de cada archivo JSON.
import type { IconName } from "../components/ui/icons";

export interface Producto {
  slug: string; // identificador para la URL: /equipos/tractor-85-hp
  modelo: string;
  categoria: "Tractor" | "Cosechadora" | "Pulverizador" | "Construcción";
  linea: "agricola" | "construccion";
  condicion: "nuevo" | "usado";
  potenciaHp: number;
  traccion?: "4x4" | "4x2"; // solo tractores
  resumen: string; // los datos clave de la tarjeta
  descripcion: string;
  imagen?: string; // nombre del archivo en src/assets/images, sin extensión
  destacado?: boolean;
  anio?: number; // solo usados
  horas?: number; // solo usados
}

export interface Oferta {
  id: string;
  producto: string;
  condicion: string;
  vigencia: string;
  imagen?: string;
}

export interface Dron {
  id: string;
  valor: string;
  unidad: string;
  modelo: string;
  datos: string;
  imagen?: string;
}

export interface Entrega {
  id: string;
  modelo: string;
  detalle: string;
  imagen?: string;
}

export interface LineaNegocio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: IconName;
  imagen?: string;
  href: string;
  disponible?: boolean; // false → tarjeta con "Próximamente", sin enlace
}

export interface Evento {
  id: string;
  dia: string;
  mes: string;
  titulo: string;
  lugar: string;
}
