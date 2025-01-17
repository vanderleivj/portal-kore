"use client";

import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";

import { useSidebarStore } from "@/store/use-sidebar-store";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebarStore();
  return (
    <div className="flex h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 bg-[#F5F5F5] overflow-auto">
          <main
            className={`mx-auto p-0 md:p-6 transition-all duration-300 ${
              collapsed ? "max-w-[1440px]" : "max-w-[1240px]"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
