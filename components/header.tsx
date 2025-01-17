"use client";

import { MobileMenu } from "./mobile-menu";
import Image from "next/image";
import Link from "next/link";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "@/app/assets/white-logo.svg";

export function Header() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:bg-none bg-custom-gradient px-4`}
    >
      <div className="w-full md:container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <MobileMenu />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex"
          >
            <Menu className="size-5 md:text-current text-white" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </Link>
        </div>
        <div className="text-sm md:text-muted-foreground text-white">
          Olá, Kaio Lima
        </div>
      </div>
    </header>
  );
}
