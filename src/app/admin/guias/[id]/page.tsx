import { getGuiaByIdAction, getGuiasAction } from "@/app/admin/guias/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { GuiaEditorTabs } from "@/components/admin/guias/GuiaEditorTabs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (params.id === "nueva") {
    return {
      title: "Nueva Guía de Vinculación | SGAB Backoffice",
      description: "Creación de una nueva especificación técnica para Bogotá Stack.",
    };
  }

  const result = await getGuiaByIdAction(params.id);
  const guia = result.data;

  return {
    title: guia ? `Editar ${guia.number}: ${guia.title} | SGAB Backoffice` : "Guía no encontrada",
    description: guia?.summary || "Editor avanzado de guías distritales.",
  };
}

export default async function AdminGuiaEditPage({ params }: PageProps) {
  const isNew = params.id === "nueva";

  // Cargar lista de todas las guías para el selector de guías relacionadas
  const allGuiasRes = await getGuiasAction();
  const allGuidesSummary = (allGuiasRes.data || []).map((g) => ({
    id: g.id || g.slug,
    number: g.numeroIdentificador || g.number || "1.X",
    title: g.titulo || g.title || "Guía Distrital",
  }));

  let guia = null;
  if (!isNew) {
    const res = await getGuiaByIdAction(params.id);
    if (!res.success || !res.data) {
      notFound();
    }
    guia = res.data;
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-bg-main">
      <AdminHeader
        title={isNew ? "Nueva Guía de Vinculación" : `Editando Guía ${guia?.number}`}
        subtitle={
          isNew
            ? "Formulario estructurado en 4 pestañas para la especificación técnica distrital"
            : `Gestión y modificación de bloques de contenido para ${guia?.title}`
        }
      />

      <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Migas de pan */}
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
          <Link href="/admin/guias" className="hover:text-primary transition-colors font-medium">
            Guías de Vinculación
          </Link>
          <span>/</span>
          <span className="text-text-main font-bold">
            {isNew ? "Nueva Guía" : `${guia?.number} - ${guia?.title}`}
          </span>
        </nav>

        {/* Componente de Formulario Complejo en Pestañas */}
        <GuiaEditorTabs initialGuia={guia} allGuidesSummary={allGuidesSummary} />
      </main>
    </div>
  );
}
