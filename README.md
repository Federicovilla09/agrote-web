# AgroTe · Rediseño web conceptual

Rediseño conceptual del sitio de una concesionaria de maquinaria agrícola del litoral argentino, desde la auditoría del sitio actual hasta un prototipo funcional publicado.

**Demo:** [agrote-web.vercel.app](https://agrote-web.vercel.app)

> **Aviso:** este es un proyecto conceptual e independiente, hecho como ejercicio de diseño y desarrollo. No es un trabajo encargado ni está asociado a ninguna empresa. "AgroTe" es un nombre ficticio, y los productos, precios, fotos y datos de contacto son de demostración.

---

## El problema

El sitio de referencia presentaba problemas concretos para su público, productores agropecuarios que navegan mayormente desde el celular:

- El menú aparecía debajo de una imagen grande y no había una propuesta de valor visible.
- El catálogo era difícil de descubrir y las tarjetas no tenían datos comparables.
- Los drones, protagonistas de sus redes sociales, no tenían lugar en el sitio.
- Las consultas, que en la práctica llegan por WhatsApp, no estaban priorizadas.

## La propuesta

**"Del tractor al dron: equipamos tu campo y te acompañamos después."**

Un sitio pensado mobile-first, con un catálogo filtrable, fichas con datos clave, una sección propia para precisión y drones, y la consulta por WhatsApp (con el mensaje ya escrito) a un toque desde cualquier pantalla.

## Proceso

1. **Auditoría** del sitio actual en desktop y mobile.
2. **Definición:** público, mensaje y arquitectura del menú.
3. **Arquitectura de información:** sitemap, plantillas y recorridos clave.
4. **Wireframes** de media fidelidad para las cuatro plantillas.
5. **Sistema de diseño:** tipografía, variables, componentes y estados en Figma.
6. **Diseño visual** en alta fidelidad, mobile y desktop.
7. **Prototipo navegable** en Figma.
8. **Handoff:** tokens, componentes, comportamientos y criterios de accesibilidad.
9. **Desarrollo** del sitio, iterando el diseño con lo aprendido al programar.

## Páginas

| Página | Ruta | Qué muestra |
| --- | --- | --- |
| Inicio | `/` | Portada con video, líneas de negocio, ofertas, precisión, usados, posventa, empresa y contacto |
| Listado | `/nuevos/tractores` | Catálogo con filtros, nuevos y usados, estados de carga, vacío y error |
| Ficha | `/equipos/[slug]` | Galería, datos clave, especificaciones, relacionados y consulta |
| Precisión y drones | `/precision-y-drones` | Drones, demostraciones, agricultura digital y asesoramiento |

## Stack

- **[Astro 7](https://astro.build)**: páginas estáticas, sin JavaScript por defecto.
- **React 19** solo donde hay interacción real (filtros, galería, formulario), como islas.
- **TypeScript** en todo el proyecto.
- **CSS con variables** generadas desde las variables de Figma, y **CSS Modules** en los componentes de React. Sin frameworks de estilos ni librerías de componentes.
- **Fontsource** para las tipografías: Big Shoulders Display, Atkinson Hyperlegible e IBM Plex Mono.
- **Vercel** para la publicación, con deploy automático en cada push.

## Decisiones destacadas

- **Islas de React:** cada página manda JavaScript solo para las partes interactivas. El formulario de contacto, además, se carga recién al llegar a esa sección (`client:visible`).
- **HTML nativo antes que JavaScript:** el menú mobile y el bottom sheet de filtros usan `<dialog>`; los acordeones, `<details>`; los carruseles, `scroll-snap`.
- **Imágenes optimizadas:** cada foto se convierte a WebP en varios anchos, con proporción reservada para que la página no salte al cargar.
- **Video responsable:** versión liviana para celulares y sin reproducción automática con "reducir movimiento" o ahorro de datos.
- **Filtros en la URL:** el listado se puede recargar o compartir con los filtros aplicados.
- **Una sola consulta permanente:** el botón del header en desktop y el WhatsApp flotante en mobile.
- **Accesibilidad desde el diseño:** contraste validado, foco visible, títulos ordenados, estados anunciados a lectores de pantalla y respeto por "reducir movimiento".

## Cómo correrlo

**Requisitos:** Node.js 22.23 o superior (el proyecto está configurado para Node 24).

```bash
npm install
npm run dev
```

El sitio queda en [http://localhost:4321](http://localhost:4321).

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera el sitio final en `dist/` |
| `npm run preview` | Sirve la versión construida para revisarla antes de publicar |

## Estructura

```
src/
├── assets/images/     Fotos (Astro las optimiza al construir)
├── components/
│   ├── ui/            Componentes base: botón, chip, campo, ícono, acordeón…
│   ├── cards/         Tarjetas: producto, oferta, dron, entrega, evento…
│   ├── layout/        Header, menú mobile, footer, WhatsApp flotante
│   ├── home/          Secciones del inicio
│   ├── listado/       Isla de filtros y su lógica
│   ├── ficha/         Galería, resumen, especificaciones, barra de consulta
│   └── precision/     Secciones de Precisión y drones
├── data/              Datos de demostración (JSON) y sus tipos
├── layouts/           Estructura HTML base y del sitio
├── lib/               Funciones de ayuda: imágenes, WhatsApp, portada
├── pages/             Una ruta por archivo (incluida la ficha dinámica)
└── styles/            Tokens de diseño y estilos globales
public/
├── video/             Videos del hero (desktop y mobile)
└── favicon.*          Íconos del sitio
```

## Datos de demostración

Todo el contenido vive en `src/data/`. Para sumar un producto, alcanza con agregarlo a `productos.json`: su ficha se genera sola en `/equipos/[slug]`.

Para probar el estado de error del listado, entrá a `/nuevos/tractores?demo=error`.

## Calidad

Medido con Lighthouse en modo mobile:

- **Accesibilidad:** 100 en las cuatro páginas.
- **Buenas prácticas:** 100 en las cuatro páginas.
- **SEO:** el sitio tiene `noindex` a propósito, por tratarse de un prototipo con datos de demostración.

## Créditos

- Fotografías: [Unsplash](https://unsplash.com), usadas como imágenes de demostración.
- Videos: material de stock, usado como demostración.
- Tipografías: Big Shoulders Display, Atkinson Hyperlegible e IBM Plex Mono, bajo licencia SIL Open Font License.

---

Diseño y desarrollo: **Federico Villanueva**.