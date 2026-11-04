import { AdminHeader } from "@/components/admin/AdminHeader";
import { NormativasDataGrid } from "@/components/admin/normativa/NormativasDataGrid";
import { getNormativas } from "@/lib/firebase/normativa";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Repositorio Normativo Distrital | SGAB Backoffice",
  description:
    "Administración, catalogación y gestión de instrumentos legales vinculantes de Bogotá Stack.",
};

export default async function AdminNormativaPage() {
  const normativas = await getNormativas();

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-bg-main">
      {/* Barra superior institucional del Backoffice */}
      <AdminHeader
        title="Repositorio Normativo Distrital"
        subtitle="Instrumentos jurídicos, decretos habilitantes y marco regulatorio distrital administrable"
      />

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Migas de pan */}
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
            <span className="text-text-main font-bold">Repositorio Normativo</span>
          </nav>
        </div>

        {/* DataGrid del CMS con gestión NoSQL en Firestore */}
        <NormativasDataGrid initialNormativas={normativas} />
      </main>
    </div>
  );
}
