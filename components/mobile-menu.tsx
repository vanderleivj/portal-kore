"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { menuItems } from "@/config/menu";
import { useSignout } from "@/app/hooks/useSignout";

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const { signout } = useSignout();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", className)}
        >
          <Menu className="size-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4 justify-between h-full">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="justify-start gap-2"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="size-4" />
                {item.title}
              </Link>
            </Button>
          ))}
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-14 text-red-500"
            onClick={signout}
          >
            <LogOut className="size-4" />
            Sair
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
