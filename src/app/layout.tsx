import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BoxBox - Gestión de Reparaciones | Taller Mecánica Central",
  description:
    "BoxBox: Plataforma web SaaS de gestión de órdenes de trabajo para talleres mecánicos con trazabilidad en tiempo real mediante código QR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
