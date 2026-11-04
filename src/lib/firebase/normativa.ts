"use server";

import { firestoreAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { revalidatePath } from "next/cache";

export interface NormativaDistrital {
  id?: string;
  titulo: string; // ej. "Decreto Distrital 640 de 2025"
  descripcion: string; // ej. "Adopción de Bogotá Stack como estándar distrital"
  entidadEmisora: string; // ej. "Alcaldía Mayor / Secretaría General"
  tematica: string; // ej. "Portal Transaccional y Ecosistema Bogotá Stack"
  nivelObligatoriedad: "SGAB" | "Lineamiento Distrital" | "Ley Nacional" | "Política Pública";
  urlTexto: string;
  urlDescargaAdjunto?: string;
  fechaCreacion?: string;
}

const COLLECTION_NAME = "normativas";

/**
 * Semillas normativas oficiales del Distrito Capital para Bogotá Stack
 */
const INITIAL_NORMATIVAS: NormativaDistrital[] = [
  {
    id: "decreto-distrital-640-2025",
    titulo: "Decreto Distrital 640 de 2025",
    descripcion:
      "Adopción de Bogotá Stack como estándar distrital obligatorio para servicios digitales y pasarela B-Pay",
    entidadEmisora: "Alcaldía Mayor / Secretaría General",
    tematica: "Portal Transaccional y Ecosistema Bogotá Stack",
    nivelObligatoriedad: "SGAB",
    urlTexto: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
    urlDescargaAdjunto: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
    fechaCreacion: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "decreto-distrital-575-2023",
    titulo: "Decreto Distrital 575 de 2023",
    descripcion:
      "Directrices de gobernanza de datos distritales, intercambio federado e infraestructura IDB",
    entidadEmisora: "Consejería Distrital de TIC",
    tematica: "Interoperabilidad & Datos",
    nivelObligatoriedad: "SGAB",
    urlTexto: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
    urlDescargaAdjunto: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
    fechaCreacion: "2023-11-20T00:00:00.000Z",
  },
  {
    id: "decreto-distrital-207-2026",
    titulo: "Decreto Distrital 207 de 2026",
    descripcion:
      "Modelo de Entidad Integrada e Índice de Adopción e Integración (IAI) para la ciudadanía",
    entidadEmisora: "Secretaría General",
    tematica: "Gobierno Digital & Ecosistema",
    nivelObligatoriedad: "Lineamiento Distrital",
    urlTexto: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
    urlDescargaAdjunto: "https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp",
    fechaCreacion: "2026-02-10T00:00:00.000Z",
  },
  {
    id: "resolucion-1519-2020",
    titulo: "Resolución 1519 de 2020 / MinTIC",
    descripcion:
      "Anexo técnico de accesibilidad web WCAG 2.1 y 2.2 nivel AA para portales públicos del Estado",
    entidadEmisora: "MinTIC / Aplicación Distrital",
    tematica: "Accesibilidad Web (WCAG)",
    nivelObligatoriedad: "Ley Nacional",
    urlTexto: "https://mintic.gov.co",
    urlDescargaAdjunto: "https://mintic.gov.co",
    fechaCreacion: "2020-08-12T00:00:00.000Z",
  },
  {
    id: "ley-2052-2020",
    titulo: "Ley 2052 de 2020 (Ley Antitrámites)",
    descripcion:
      "Digitalización obligatoria de trámites, cero papel y prohibición de exigir documentos ya existentes al ciudadano",
    entidadEmisora: "Congreso / Función Pública",
    tematica: "Trámites y SUIT",
    nivelObligatoriedad: "Ley Nacional",
    urlTexto: "https://funcionpublica.gov.co",
    urlDescargaAdjunto: "https://funcionpublica.gov.co",
    fechaCreacion: "2020-10-25T00:00:00.000Z",
  },
  {
    id: "decreto-distrital-839-2023",
    titulo: "Decreto Distrital 839 de 2023",
    descripcion:
      "Estrategia distrital contra la burocracia y Política Pública Distrital de Racionalización de Trámites",
    entidadEmisora: "Secretaría Jurídica Distrital",
    tematica: "Política Pública Distrital",
    nivelObligatoriedad: "Política Pública",
    urlTexto: "https://secretariajuridica.gov.co",
    urlDescargaAdjunto: "https://secretariajuridica.gov.co",
    fechaCreacion: "2023-12-14T00:00:00.000Z",
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __normativasMemoryStore: NormativaDistrital[] | undefined;
}

function getMemoryStore(): NormativaDistrital[] {
  if (!globalThis.__normativasMemoryStore) {
    globalThis.__normativasMemoryStore = [...INITIAL_NORMATIVAS];
  }
  return globalThis.__normativasMemoryStore;
}

function cleanUndefined<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        result[key] = cleanUndefined(value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

let isNormativasSeeded = false;

async function seedNormativasIfEmpty(): Promise<void> {
  if (isNormativasSeeded || !firestoreAdminDb) return;
  try {
    const snapshot = await firestoreAdminDb.collection(COLLECTION_NAME).limit(1).get();
    if (snapshot.empty) {
      console.log(`[Firestore Normativa] Sembrando colección "${COLLECTION_NAME}"...`);
      const batch = firestoreAdminDb.batch();
      for (const item of INITIAL_NORMATIVAS) {
        const docRef = firestoreAdminDb.collection(COLLECTION_NAME).doc(item.id as string);
        batch.set(docRef, cleanUndefined(item as unknown as Record<string, unknown>));
      }
      await batch.commit();
      console.log(`[Firestore Normativa] ${INITIAL_NORMATIVAS.length} normas iniciales sembradas.`);
    }
    isNormativasSeeded = true;
  } catch (error) {
    console.warn("[Firestore Normativa] Error verificando/sembrando normas:", error);
  }
}

/**
 * Server Action: Obtiene todas las normas distritales del repositorio
 */
export async function getNormativas(): Promise<NormativaDistrital[]> {
  if (firestoreAdminDb && isFirebaseAdminConfigured) {
    try {
      await seedNormativasIfEmpty();
      const snapshot = await firestoreAdminDb.collection(COLLECTION_NAME).get();
      const list: NormativaDistrital[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<NormativaDistrital, "id">),
      }));

      // Ordenar por fecha o título
      list.sort((a, b) => {
        const dateA = a.fechaCreacion ? new Date(a.fechaCreacion).getTime() : 0;
        const dateB = b.fechaCreacion ? new Date(b.fechaCreacion).getTime() : 0;
        return dateB - dateA;
      });

      return list;
    } catch (err) {
      console.warn(
        "[Firestore Normativa] Error consultando normas en Firestore, usando fallback:",
        err,
      );
    }
  }

  // Fallback seguro en memoria
  const memory = getMemoryStore();
  return [...memory].sort((a, b) => {
    const dateA = a.fechaCreacion ? new Date(a.fechaCreacion).getTime() : 0;
    const dateB = b.fechaCreacion ? new Date(b.fechaCreacion).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Server Action: Obtiene una norma específica por su ID
 */
export async function getNormativaById(id: string): Promise<NormativaDistrital | null> {
  const cleanId = id.trim();
  if (firestoreAdminDb && isFirebaseAdminConfigured) {
    try {
      await seedNormativasIfEmpty();
      const docSnap = await firestoreAdminDb.collection(COLLECTION_NAME).doc(cleanId).get();
      if (docSnap.exists) {
        return {
          id: docSnap.id,
          ...(docSnap.data() as Omit<NormativaDistrital, "id">),
        };
      }
    } catch (err) {
      console.warn("[Firestore Normativa] Error en getNormativaById:", err);
    }
  }

  const memory = getMemoryStore();
  const item = memory.find((n) => n.id === cleanId);
  return item ? { ...item } : null;
}

/**
 * Server Action: Crea o actualiza un instrumento normativo
 */
export async function saveNormativa(data: Partial<NormativaDistrital>): Promise<{
  success: boolean;
  message: string;
  data?: NormativaDistrital;
}> {
  try {
    if (!data.titulo || !data.titulo.trim()) {
      return {
        success: false,
        message: "El título de la norma es obligatorio.",
      };
    }
    if (!data.descripcion || !data.descripcion.trim()) {
      return {
        success: false,
        message: "La descripción de la norma es obligatoria.",
      };
    }
    if (!data.entidadEmisora || !data.entidadEmisora.trim()) {
      return {
        success: false,
        message: "La entidad emisora es obligatoria.",
      };
    }
    if (!data.tematica || !data.tematica.trim()) {
      return {
        success: false,
        message: "La temática o ámbito es obligatoria.",
      };
    }
    if (!data.nivelObligatoriedad) {
      return {
        success: false,
        message: "El nivel de obligatoriedad es obligatorio.",
      };
    }
    if (!data.urlTexto || !data.urlTexto.trim()) {
      return {
        success: false,
        message: "La URL oficial del texto o SISJUR es obligatoria.",
      };
    }

    const now = new Date().toISOString();
    const id =
      data.id && data.id.trim() !== "nueva"
        ? data.id.trim()
        : data.titulo
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    const normItem: NormativaDistrital = {
      id,
      titulo: data.titulo.trim(),
      descripcion: data.descripcion.trim(),
      entidadEmisora: data.entidadEmisora.trim(),
      tematica: data.tematica.trim(),
      nivelObligatoriedad: data.nivelObligatoriedad,
      urlTexto: data.urlTexto.trim(),
      urlDescargaAdjunto: data.urlDescargaAdjunto?.trim() || "",
      fechaCreacion: data.fechaCreacion || now,
    };

    // 1. Guardar en Firestore Admin
    if (firestoreAdminDb && isFirebaseAdminConfigured) {
      try {
        const docRef = firestoreAdminDb.collection(COLLECTION_NAME).doc(id);
        const cleaned = cleanUndefined(normItem as unknown as Record<string, unknown>);
        await docRef.set(cleaned, { merge: true });
        console.log(`[Firestore Normativa] Norma "${id}" guardada exitosamente en Firestore.`);
      } catch (err) {
        console.error(`[Firestore Normativa] Error guardando "${id}" en Firestore:`, err);
      }
    }

    // 2. Mantener sincronizado el fallback store
    const store = getMemoryStore();
    const index = store.findIndex((n) => n.id === id);
    if (index >= 0) {
      store[index] = normItem;
    } else {
      store.unshift(normItem);
    }

    // 3. Purgar caché de Next.js para actualización instantánea
    revalidatePath("/guias-de-vinculacion");
    revalidatePath("/admin/normativa");
    revalidatePath(`/admin/normativa/${id}`);

    return {
      success: true,
      message: `Instrumento legal "${normItem.titulo}" guardado exitosamente.`,
      data: normItem,
    };
  } catch (error) {
    console.error("[saveNormativa] Error:", error);
    return {
      success: false,
      message: "Ocurrió un error al persistir la norma en el repositorio distrital.",
    };
  }
}

/**
 * Server Action: Elimina una norma distrital del repositorio
 */
export async function deleteNormativa(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const cleanId = id.trim();

    if (firestoreAdminDb && isFirebaseAdminConfigured) {
      try {
        await firestoreAdminDb.collection(COLLECTION_NAME).doc(cleanId).delete();
        console.log(`[Firestore Normativa] Norma "${cleanId}" eliminada de Firestore.`);
      } catch (err) {
        console.error(`[Firestore Normativa] Error eliminando "${cleanId}" en Firestore:`, err);
      }
    }

    // Sincronizar fallback store
    const store = getMemoryStore();
    const idx = store.findIndex((n) => n.id === cleanId);
    if (idx >= 0) {
      store.splice(idx, 1);
    }

    // Purgar caché
    revalidatePath("/guias-de-vinculacion");
    revalidatePath("/admin/normativa");

    return {
      success: true,
      message: "Instrumento legal eliminado permanentemente del repositorio distrital.",
    };
  } catch (error) {
    console.error("[deleteNormativa] Error:", error);
    return {
      success: false,
      message: "Error interno al procesar la eliminación de la norma.",
    };
  }
}
