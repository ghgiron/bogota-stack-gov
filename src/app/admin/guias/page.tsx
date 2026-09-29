import { getGuiasAction } from "@/app/admin/guias/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GuiasDataGrid } from "@/components/admin/guias/GuiasDataGrid";
import { BookOpen, Layers, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Gestión de Guías de Vinculación | SGAB Backoffice",
  description:
    "Panel de administración, control de versiones y edición avanzada de Guías de Vinculación Distritales de Bogotá Stack.",
};

export default async function AdminGuiasPage() {
  const result = await getGuiasAction();
  const guides = result.success ? result.data : [];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-bg-main">
      {/* Barra superior de administración */}
      <AdminHeader
        title="Gestión de Guías de Vinculación"
        subtitle="Control de versiones, estados de publicación y editor avanzado de especificaciones distritales"
      />

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Migas de pan y cabecera de contexto */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <nav
            aria-label="Ruta de navegación administrativa"
            className="flex items-center gap-1.5 text-xs text-text-muted font-body"
          >
            <Link
              href="/admin/dashboard"
              className="hover:text-primary transition-colors font-medium"
            >
              Backoffice
            </Link>
            <span>/</span>
            <span className="text-text-main font-bold">Guías de Vinculación</span>
          </nav>
        </div>

        {/* Componente DataGrid con filtros y acciones CRUD */}
        <GuiasDataGrid initialGuides={guides} />
      </main>
    </div>
  );
}
