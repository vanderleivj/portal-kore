import { Home, LogOut, LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  isLogout?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    title: "Lista de Pedidos",
    href: "/",
    icon: Home,
  },
  {
    title: "Sair",
    href: "/logout",
    icon: LogOut,
    isLogout: true,
  },
];
