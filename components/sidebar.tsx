"use client";
import { List, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/horizontal-white-logo.png";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar-store";

export default function Sidebar() {
  const router = useRouter();
  const { collapsed } = useSidebarStore();

  const handleLogout = () => {
    Cookies.remove("auth-token");
    Cookies.remove("basic-auth");
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "bg-custom-gradient text-white h-screen py-4 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-start px-4 mb-8">
        {!collapsed && <Image src={logo} alt="Logo" width={100} height={100} />}
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-4 px-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <List size={20} />
              {!collapsed && (
                <span className="font-medium text-sm">Lista de pedidos</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/80 hover:text-white w-full"
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium text-sm">Sair</span>}
        </button>
      </div>
    </aside>
  );
}
