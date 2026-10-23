// Enlaces de WhatsApp con mensaje precargado.
// Número de demostración: reemplazar por el real si el proyecto avanza.
const NUMERO_DEMO = "5490000000000";

export function whatsappUrl(mensaje: string) {
  return `https://wa.me/${NUMERO_DEMO}?text=${encodeURIComponent(mensaje)}`;
}

export const mensajeProducto = (modelo: string) =>
  `Hola, quiero consultar por el ${modelo} que vi en la web.`;