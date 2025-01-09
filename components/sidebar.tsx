"use client";
import { List, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/white-logo.svg";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove os tokens
    Cookies.remove("auth-token");
    Cookies.remove("basic-auth");
    // Redireciona para a página de login
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-primary text-white h-screen py-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 px-4">
        <Image src={logo} alt="Logo" width={100} height={100} />
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-4 flex items-center gap-2">
            <div className="h-12 bg-white rounded-lg w-1 ml-[-1px]" />
            <Link
              href="/"
              className={`flex items-center gap-2 hover:text-gray-300`}
            >
              <List size={20} />
              <span className="font-medium text-sm">Lista de pedidos</span>
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
          <span className="font-medium text-sm">Sair</span>
        </button>
      </div>
    </aside>
  );
}
