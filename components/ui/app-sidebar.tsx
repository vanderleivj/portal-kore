import { AlignJustify } from "lucide-react";
import Image from "next/image";
import WhiteLogo from "@/app/assets/white-logo.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Lista de pedidos",
    url: "#",
    icon: AlignJustify,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-[#235A81]">
        <SidebarGroup>
          <div className="flex items-center justify-start mb-14 py-8 pl-8">
            <Image src={WhiteLogo} alt="Koretech Logo" className="h-12" />
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className="text-white border-l-4 pl-4"
                  key={item.title}
                >
                  <SidebarMenuButton className="h-[60px]" asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
