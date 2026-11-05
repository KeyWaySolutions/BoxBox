import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BoxBox PRO | Gestión de Talleres & Trazabilidad QR",
  description:
    "BoxBox PRO: Plataforma web SaaS de gestión de órdenes de trabajo para talleres mecánicos con trazabilidad en tiempo real mediante código QR.",
  icons: {
    icon: "/SVG_redondo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
