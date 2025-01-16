import { Home, LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const menuItems: MenuItem[] = [
  {
    title: "Lista de Pedidos",
    href: "/",
    icon: Home,
  },
];
