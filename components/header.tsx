"use client";

import { useSidebarStore } from "@/store/use-sidebar-store";

export default function Header() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="w-full h-[50px] min-h-[50px] px-6 bg-white flex items-center justify-between shadow">
      <button
        onClick={toggleSidebar}
        className="p-1.5 rounded-lg hover:bg-gray-100"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7H21"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 12H21"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 17H21"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <p className="text-gray-800 text-lg font-thin">Olá, Kaio Lima</p>
    </div>
  );
}
