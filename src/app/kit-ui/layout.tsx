import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Kit UI Bogotá",
    default: "Kit UI Bogotá | Sistema de Diseño Distrital",
  },
  description:
    "Sistema de diseño y componentes oficiales de la Alcaldía Mayor de Bogotá D.C. para servicios digitales y plataformas B2G.",
};

export default function KitUiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full min-h-screen bg-surface flex flex-col">{children}</div>;
}
