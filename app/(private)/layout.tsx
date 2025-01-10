import type { Metadata } from "next";
import Header from "@/components/header";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Koretech",
  description: "Portal de controle de pedidos",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 bg-[#F5F5F5] p-6 overflow-auto">
          <main>{children}</main>
        </div>
      </div>
    </Providers>
  );
}
