import { AdminHeader } from "@/components/admin/AdminHeader";
import { NormativaForm } from "@/components/admin/normativa/NormativaForm";
import { getNormativaById } from "@/lib/firebase/normativa";
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
      title: "Nuevo Instrumento Normativo | SGAB Backoffice",
      description: "Registro de un nuevo instrumento jurídico distrital en Bogotá Stack.",
    };
  }

  const normativa = await getNormativaById(params.id);

  return {
    title: normativa
      ? `Editar: ${normativa.titulo} | SGAB Backoffice`
      : "Norma no encontrada | SGAB Backoffice",
    description: normativa?.descripcion || "Editor de normativa distrital.",
  };
}

export default async function AdminNormativaEditPage({ params }: PageProps) {
  const isNew = params.id === "nueva";

  let normativa = null;
  if (!isNew) {
    normativa = await getNormativaById(params.id);
    if (!normativa) {
      notFound();
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-bg-main">
      <AdminHeader
        title={isNew ? "Nuevo Instrumento Normativo" : `Editando: ${normativa?.titulo}`}
        subtitle={
          isNew
            ? "Formulario para catalogar decretos, leyes o resoluciones aplicables al ecosistema distrital"
            : "Gestión y actualización de metadatos jurídicos y enlaces de consulta oficial"
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
          <Link
            href="/admin/normativa"
            className="hover:text-primary transition-colors font-medium"
          >
            Repositorio Normativo
          </Link>
          <span>/</span>
          <span className="text-text-main font-bold">
            {isNew ? "Nueva Norma" : normativa?.titulo}
          </span>
        </nav>

        {/* Componente de Formulario */}
        <NormativaForm initialNormativa={normativa} />
      </main>
    </div>
  );
}
