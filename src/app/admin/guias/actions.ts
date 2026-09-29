"use server";

import {
  createGuia,
  deleteGuia,
  getGuiaById,
  getGuiaBySlug,
  getGuias,
  toggleGuiaStatus,
  updateGuia,
} from "@/lib/firebase/db";
import type { GuiaVinculacion, GuideFilter, GuideStatus } from "@/types/guide";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Obtener listado de guías de vinculación con filtros opcionales
 * Conectado directamente a la capa Firestore / base de datos distrital.
 */
export async function getGuiasAction(filter?: GuideFilter): Promise<{
  success: boolean;
  data: GuiaVinculacion[];
  total: number;
}> {
  try {
    const list = await getGuias(filter);
    return {
      success: true,
      data: list,
      total: list.length,
    };
  } catch (error) {
    console.error("[getGuiasAction] Error:", error);
    return {
      success: false,
      data: [],
      total: 0,
    };
  }
}

/**
 * Server Action: Obtener detalle completo de una guía por su ID o slug
 */
export async function getGuiaByIdAction(id: string): Promise<{
  success: boolean;
  data: GuiaVinculacion | null;
}> {
  try {
    const guia = await getGuiaById(id);
    return {
      success: true,
      data: guia,
    };
  } catch (error) {
    console.error("[getGuiaByIdAction] Error:", error);
    return {
      success: false,
      data: null,
    };
  }
}

/**
 * Server Action: Obtener guía por su slug (para hidratación dinámica pública)
 */
export async function getGuiaBySlugAction(slug: string): Promise<{
  success: boolean;
  data: GuiaVinculacion | null;
}> {
  try {
    const guia = await getGuiaBySlug(slug);
    return {
      success: true,
      data: guia,
    };
  } catch (error) {
    console.error("[getGuiaBySlugAction] Error:", error);
    return {
      success: false,
      data: null,
    };
  }
}

/**
 * Server Action: Guardar o actualizar una guía de vinculación (Borrador o Publicado)
 * Persistencia real en la colección 'guias' de Firestore con revalidación de caché en Next.js.
 */
export async function saveGuiaAction(guiaData: Partial<GuiaVinculacion>): Promise<{
  success: boolean;
  message: string;
  data?: GuiaVinculacion;
}> {
  try {
    const titleVal = guiaData.titulo || guiaData.title;
    if (!titleVal || !titleVal.trim()) {
      return {
        success: false,
        message: "El título de la guía es un campo obligatorio.",
      };
    }

    let saved: GuiaVinculacion;
    if (guiaData.id) {
      saved = await updateGuia(guiaData.id, guiaData);
    } else {
      saved = await createGuia(guiaData as GuiaVinculacion);
    }

    // Purgado inmediato de la caché de Next.js para reflejar los cambios en el frontend
    revalidatePath("/guias-de-vinculacion");
    revalidatePath(`/guias-de-vinculacion/${saved.slug}`);
    revalidatePath("/guias-de-vinculacion/[slug]", "page");
    revalidatePath("/admin/guias");
    if (saved.id) {
      revalidatePath(`/admin/guias/${saved.id}`);
    }

    return {
      success: true,
      message: `Guía "${saved.titulo || saved.title}" guardada exitosamente con estado "${saved.estado || saved.status}".`,
      data: saved,
    };
  } catch (error) {
    console.error("[saveGuiaAction] Error:", error);
    return {
      success: false,
      message: "Ocurrió un error al persistir los cambios de la guía en Firestore.",
    };
  }
}

/**
 * Server Action: Eliminar una guía de vinculación del CMS
 */
export async function deleteGuiaAction(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const deleted = await deleteGuia(id);
    if (!deleted) {
      return {
        success: false,
        message: "La guía no existe o ya fue eliminada.",
      };
    }

    revalidatePath("/admin/guias");
    revalidatePath("/guias-de-vinculacion");
    revalidatePath("/guias-de-vinculacion/[slug]", "page");

    return {
      success: true,
      message: "Guía eliminada permanentemente del repositorio distrital.",
    };
  } catch (error) {
    console.error("[deleteGuiaAction] Error:", error);
    return {
      success: false,
      message: "Error interno al procesar la eliminación de la guía.",
    };
  }
}

/**
 * Server Action: Cambiar estado rápido de publicación (Borrador, Revisión, Publicado)
 */
export async function toggleGuiaStatusAction(
  id: string,
  newStatus: GuideStatus,
): Promise<{
  success: boolean;
  message: string;
  data?: GuiaVinculacion;
}> {
  try {
    const updated = await toggleGuiaStatus(id, newStatus);
    if (!updated) {
      return {
        success: false,
        message: "No se encontró la guía para actualizar su estado.",
      };
    }

    revalidatePath("/admin/guias");
    revalidatePath(`/admin/guias/${id}`);
    revalidatePath("/guias-de-vinculacion");
    revalidatePath(`/guias-de-vinculacion/${updated.slug}`);
    revalidatePath("/guias-de-vinculacion/[slug]", "page");

    return {
      success: true,
      message: `Estado actualizado a "${newStatus}" correctamente.`,
      data: updated,
    };
  } catch (error) {
    console.error("[toggleGuiaStatusAction] Error:", error);
    return {
      success: false,
      message: "Error al cambiar el estado de la guía.",
    };
  }
}
