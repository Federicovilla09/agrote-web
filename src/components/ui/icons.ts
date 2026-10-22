// Set de íconos de AgroTe (el mismo de Figma).
// Cada ícono es el contenido interno de un SVG de 24 × 24 con trazo.
// El color y el grosor se definen en el componente Icon.

export const icons = {
  "flecha-derecha": '<path d="M5 12h14M13 6l6 6-6 6"/>',
  "chevron-abajo": '<path d="m6 9 6 6 6-6"/>',
  "chevron-derecha": '<path d="m9 18 6-6-6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cerrar: '<path d="M6 6l12 12M18 6 6 18"/>',
  chat: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/>',
  filtro: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  documento: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>',
  pausa: '<path d="M9 6v12M15 6v12"/>',
  ubicacion: '<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  telefono: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  tractor: '<circle cx="7" cy="17" r="3"/><circle cx="18" cy="18" r="2"/><path d="M4 14V9h6l2 5h8v4M10 9V5h4l1 4"/>',
  construccion: '<path d="M3 19h11M5 19v-4h7v4M8.5 15v-4h3M11.5 11l5-6 4 4-3 3"/>',
  etiqueta: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  dron: '<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/>',
  llave: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  alerta: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/>',
  buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  recargar: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
} as const;

// Tipo con todos los nombres válidos: TypeScript avisa si escribís mal un ícono.
export type IconName = keyof typeof icons;