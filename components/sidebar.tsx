"use client";

import { useSidebarStore } from "@/store/use-sidebar-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/config/menu";
import Image from "next/image";
import Logo from "@/app/assets/white-logo.svg";

export default function Sidebar() {
  const { collapsed } = useSidebarStore();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-custom-gradient h-screen transition-all duration-300 relative",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex justify-start items-center h-16 px-4">
        <Image src={Logo} alt="Logo" width={100} height={100} />
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors",
                isActive && "bg-white/10"
              )}
            >
              <item.icon className="size-5 shrink-0" />
              <span
                className={cn(
                  "whitespace-nowrap transition-all duration-300",
                  collapsed && "opacity-0 translate-x-28 overflow-hidden"
                )}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
