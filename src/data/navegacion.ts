// Menú principal: lo usan el header desktop, el menú mobile y el footer.
export interface ItemMenu {
  label: string;
  href: string;
  hijos?: { label: string; href: string; disponible?: boolean }[];
}

export const menuPrincipal: ItemMenu[] = [
  {
    label: "Nuevos",
    href: "/nuevos/tractores",
    hijos: [
      { label: "Agrícola", href: "/nuevos/tractores" },
      { label: "Construcción", href: "/nuevos/tractores", disponible: false },
      { label: "Implementos", href: "/nuevos/tractores", disponible: false },
    ],
  },
  { label: "Usados", href: "/nuevos/tractores?condicion=usado" },
  { label: "Precisión y drones", href: "/precision-y-drones" },
  {
    label: "Posventa",
    href: "/#posventa",
    hijos: [
      { label: "Servicio técnico", href: "/#posventa" },
      { label: "Repuestos", href: "/#posventa" },
    ],
  },
  { label: "Empresa", href: "/#empresa" },
  { label: "Contacto", href: "/#contacto" },
];
