import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Koretech",
  description: "Portal de controle de pedidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 bg-[#F5F5F5] p-6">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
