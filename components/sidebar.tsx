"use client";
import { List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/white-logo.svg";

export default function Sidebar() {
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
    </aside>
  );
}
