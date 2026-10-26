// Punto único de acceso a los datos. Los componentes importan desde acá,
// así el día que los datos vengan de una API solo cambia este archivo.
import type { Producto, Oferta, Dron, Entrega, LineaNegocio, Evento } from "./tipos";
import productosJson from "./productos.json";
import ofertasJson from "./ofertas.json";
import dronesJson from "./drones.json";
import entregasJson from "./entregas.json";
import lineasJson from "./lineas.json";
import eventosJson from "./eventos.json";

export const productos = productosJson as Producto[];
export const ofertas = ofertasJson as Oferta[];
export const drones = dronesJson as Dron[];
export const entregas = entregasJson as Entrega[];
export const lineas = lineasJson as LineaNegocio[];
export const eventos = eventosJson as Evento[];

export const usadosDestacados = productos.filter((p) => p.condicion === "usado" && p.destacado);
export const tractores = productos.filter((p) => p.categoria === "Tractor");
export const tractoresNuevos = productos.filter((p) => p.categoria === "Tractor" && p.condicion === "nuevo");

export type { Producto, Oferta, Dron, Entrega, LineaNegocio, Evento };