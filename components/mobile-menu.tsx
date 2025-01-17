"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { menuItems } from "@/config/menu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth-token");
    Cookies.remove("basic-auth");
    router.push("/login");
  };

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
        <nav className="flex flex-col gap-4 mt-4">
          {menuItems.map((item) =>
            !item.isLogout ? (
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
            ) : (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <item.icon className="size-4" />
                {item.title}
              </Button>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
