import { AdminSidebar } from "@/components/admin/AdminSidebar";
import type React from "react";

export const metadata = {
  title: "SGAB Backoffice | Bogotá Stack",
  description: "Panel de administración y gestión de Guías y Building Blocks distritales.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-main">
      {/* Sidebar oscuro #1A1C20 */}
      <AdminSidebar />

      {/* Área de Contenido del Backoffice */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">{children}</div>
    </div>
  );
}
