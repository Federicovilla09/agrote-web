// Optimización de imágenes con Astro.
// Toma una foto de src/assets/images por su nombre y genera versiones WebP
// en varios anchos. Si la foto todavía no está, devuelve undefined
// y la tarjeta muestra un placeholder.
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const archivos = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export interface ImagenOptimizada {
  src: string;
  srcset: string;
  width: number;
  height: number;
}

export async function optimizar(
  nombre: string | undefined,
  anchos: number[] = [480, 960, 1600],
): Promise<ImagenOptimizada | undefined> {
  if (!nombre) return undefined;

  const entrada = Object.entries(archivos).find(([ruta]) => {
    const archivo = ruta.split("/").pop() ?? "";
    return archivo.replace(/\.\w+$/, "") === nombre;
  });
  if (!entrada) return undefined;

  const original = entrada[1].default;
  const anchosValidos = anchos.filter((w) => w <= original.width);
  const imagen = await getImage({
    src: original,
    widths: anchosValidos.length ? anchosValidos : [original.width],
    format: "webp",
  });

  return {
    src: imagen.src,
    srcset: imagen.srcSet.attribute,
    width: original.width,
    height: original.height,
  };
}


// Una sola versión de la imagen, a un ancho fijo. Para lugares que no aceptan
// srcset (como el poster de un <video>): devuelve solo la URL de esa versión.
export async function optimizarUnica(nombre: string, ancho: number): Promise<string | undefined> {
  const entrada = Object.entries(archivos).find(([ruta]) => {
    const archivo = ruta.split("/").pop() ?? "";
    return archivo.replace(/\.\w+$/, "") === nombre;
  });
  if (!entrada) return undefined;

  const original = entrada[1].default;
  const imagen = await getImage({ src: original, width: Math.min(ancho, original.width), format: "webp" });
  return imagen.src;
}