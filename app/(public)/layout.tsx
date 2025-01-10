import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Koretech - Login",
  description: "Portal de controle de pedidos",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
