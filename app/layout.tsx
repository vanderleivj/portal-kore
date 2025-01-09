import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Providers } from "@/components/providers";

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
      <body className="overflow-hidden">
        <Providers>
          <div className="flex-1 flex flex-col h-screen">
            <Header />
            <div className="flex-1 bg-[#F5F5F5] p-6 overflow-auto">
              <main>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
