import {
  INITIAL_CMS_GUIDES,
  deleteCmsGuide,
  getAllCmsGuides,
  getCmsGuideById,
  saveCmsGuide,
  toggleCmsGuideStatus as toggleCmsGuideStatusLocal,
} from "@/lib/db/guiasCmsStore";
import { firestoreAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { firestoreClientDb, isFirebaseClientConfigured } from "@/lib/firebase/client";
import {
  type AudienceType,
  type ContentBlock,
  type GuiaVinculacion,
  type GuideFilter,
  type GuideStatus,
  normalizeGuia,
} from "@/types/guide";

const COLLECTION_NAME = "guias";

/**
 * Limpia propiedades undefined para evitar errores de Firestore Admin SDK
 */
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

/**
 * Sembrado inicial automático en Firestore si la colección está vacía
 */
let isSeeded = false;
async function seedInitialGuidesIfEmpty(): Promise<void> {
  if (isSeeded || !firestoreAdminDb) return;
  try {
    const snapshot = await firestoreAdminDb.collection(COLLECTION_NAME).limit(1).get();
    if (snapshot.empty) {
      console.log(`[Firestore DB] Sembrando colección "${COLLECTION_NAME}" con guías iniciales...`);
      const batch = firestoreAdminDb.batch();
      for (const guide of INITIAL_CMS_GUIDES) {
        const docRef = firestoreAdminDb.collection(COLLECTION_NAME).doc(guide.id || guide.slug);
        const normalized = normalizeGuia(guide);
        batch.set(docRef, cleanUndefined(normalized as unknown as Record<string, unknown>));
      }
      await batch.commit();
      console.log(
        `[Firestore DB] ${INITIAL_CMS_GUIDES.length} guías iniciales sembradas con éxito.`,
      );
    }
    isSeeded = true;
  } catch (error) {
    console.warn("[Firestore DB] No se pudo verificar/sembrar guías iniciales:", error);
  }
}

/**
 * 1. getGuias(): Retorna todas las guías de vinculación distritales
 * Usado para el DataGrid del CMS y el Sidebar público interactivo.
 */
export async function getGuias(filter?: GuideFilter): Promise<GuiaVinculacion[]> {
  // Entorno Servidor con Firebase Admin configurado
  if (firestoreAdminDb && isFirebaseAdminConfigured) {
    try {
      await seedInitialGuidesIfEmpty();
      const snapshot = await firestoreAdminDb.collection(COLLECTION_NAME).get();
      let guias: GuiaVinculacion[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return normalizeGuia({ id: doc.id, ...data });
      });

      // Ordenar por número identificador
      guias.sort((a, b) => {
        const numA = Number.parseFloat(a.numeroIdentificador.replace(/[^\d.]/g, "")) || 0;
        const numB = Number.parseFloat(b.numeroIdentificador.replace(/[^\d.]/g, "")) || 0;
        return numA - numB;
      });

      // Aplicar filtros en memoria
      if (filter) {
        if (filter.status && filter.status !== "Todos") {
          guias = guias.filter((g) => g.estado === filter.status || g.status === filter.status);
        }
        if (filter.category && filter.category !== "Todas") {
          guias = guias.filter(
            (g) => g.categoriaPrincipal === filter.category || g.category === filter.category,
          );
        }
        if (filter.audience && filter.audience !== "Todas") {
          guias = guias.filter(
            (g) =>
              g.audiencias.includes(filter.audience as string) ||
              g.audiences?.includes(filter.audience as AudienceType),
          );
        }
        if (filter.search?.trim()) {
          const q = filter.search.toLowerCase().trim();
          guias = guias.filter(
            (g) =>
              g.titulo.toLowerCase().includes(q) ||
              g.title?.toLowerCase().includes(q) ||
              g.numeroIdentificador.toLowerCase().includes(q) ||
              g.resumenEjecutivo.toLowerCase().includes(q) ||
              g.categoriaPrincipal.toLowerCase().includes(q),
          );
        }
      }

      return guias;
    } catch (err) {
      console.warn("[Firestore DB] Error consultando colección guias, usando store local:", err);
    }
  }

  // Fallback seguro a store en memoria con soporte globalThis
  const rawList = getAllCmsGuides(filter);
  return rawList.map((g) => normalizeGuia(g));
}

/**
 * 2. getGuiaBySlug(slug: string): Retorna una guía específica por su slug o ID
 * Usado para el renderizado dinámico de la vista pública.
 */
export async function getGuiaBySlug(slug: string): Promise<GuiaVinculacion | null> {
  const cleanSlug = slug.toLowerCase().trim();

  // Entorno Servidor con Firebase Admin
  if (firestoreAdminDb && isFirebaseAdminConfigured) {
    try {
      await seedInitialGuidesIfEmpty();

      // Intento 1: Búsqueda exacta por campo slug
      const snapshot = await firestoreAdminDb
        .collection(COLLECTION_NAME)
        .where("slug", "==", cleanSlug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return normalizeGuia({ id: doc.id, ...doc.data() });
      }

      // Intento 2: Búsqueda directa por ID de documento
      const docSnap = await firestoreAdminDb.collection(COLLECTION_NAME).doc(cleanSlug).get();
      if (docSnap.exists) {
        return normalizeGuia({ id: docSnap.id, ...docSnap.data() });
      }

      // Intento 3: Búsqueda con prefijo 'guia-'
      const prefixedSnap = await firestoreAdminDb
        .collection(COLLECTION_NAME)
        .doc(`guia-${cleanSlug}`)
        .get();
      if (prefixedSnap.exists) {
        return normalizeGuia({ id: prefixedSnap.id, ...prefixedSnap.data() });
      }

      // Intento 4: Resolución por aliases comunes
      const aliasMap: Record<string, string> = {
        "lenguaje-claro": "contenido-lenguaje-claro",
        "contenido-lenguaje-claro": "lenguaje-claro",
        interoperabilidad: "interoperabilidad-distrital",
        "interoperabilidad-distrital": "interoperabilidad",
        autenticacion: "vinculacion-autenticacion",
        "vinculacion-autenticacion": "autenticacion",
        "bb-adopcion": "building-blocks-adopcion",
        "building-blocks-adopcion": "bb-adopcion",
        "kit-ui": "design-system-kit-ui",
        "design-system-kit-ui": "kit-ui-bogota",
        "kit-ui-bogota": "design-system-kit-ui",
        "integracion-datos": "integracion-de-datos",
        "integracion-de-datos": "integracion-datos",
        "marco-general": "sobre-bogota-stack",
        "sobre-bogota-stack": "marco-gobernanza",
      };

      const alias = aliasMap[cleanSlug];
      if (alias) {
        const aliasSnapshot = await firestoreAdminDb
          .collection(COLLECTION_NAME)
          .where("slug", "==", alias)
          .limit(1)
          .get();
        if (!aliasSnapshot.empty) {
          const doc = aliasSnapshot.docs[0];
          return normalizeGuia({ id: doc.id, ...doc.data() });
        }
      }
    } catch (err) {
      console.warn("[Firestore DB] Error en getGuiaBySlug, usando fallback local:", err);
    }
  }

  // Fallback seguro a store en memoria
  const local = getCmsGuideById(cleanSlug);
  return local ? normalizeGuia(local) : null;
}

/**
 * 3. updateGuia(id: string, data: Partial<GuiaVinculacion>): Actualiza un documento existente
 * Llamado por Server Actions tras editar en el Backoffice CMS.
 */
export async function updateGuia(
  id: string,
  data: Partial<GuiaVinculacion>,
): Promise<GuiaVinculacion> {
  const existing = await getGuiaById(id);
  const now = new Date().toISOString();
  const merged = {
    ...(existing || {}),
    ...data,
    id,
    ultimaModificacion: now,
    updatedAt: now,
  };
  const normalizedData = normalizeGuia(merged);

  // Guardar en Firestore si está disponible
  if (firestoreAdminDb && isFirebaseAdminConfigured) {
    try {
      const docRef = firestoreAdminDb.collection(COLLECTION_NAME).doc(id);
      const cleaned = cleanUndefined(normalizedData as unknown as Record<string, unknown>);
      await docRef.set(cleaned, { merge: true });
      console.log(`[Firestore DB] Guía "${id}" actualizada exitosamente en Firestore.`);
    } catch (err) {
      console.error(`[Firestore DB] Error guardando guía "${id}" en Firestore:`, err);
    }
  }

  // Siempre mantener sincronizado el store local/globalThis
  const updatedLocal = saveCmsGuide(normalizedData);
  return normalizeGuia(updatedLocal);
}

/**
 * 4. createGuia(data: GuiaVinculacion): Crea un nuevo documento en la colección 'guias'
 */
export async function createGuia(data: GuiaVinculacion): Promise<GuiaVinculacion> {
  const now = new Date().toISOString();
  const id =
    data.id || `guia-${data.slug || data.numeroIdentificador?.replace(/\./g, "-") || Date.now()}`;

  const normalized = normalizeGuia({
    ...data,
    id,
    createdAt: data.createdAt || now,
    ultimaModificacion: now,
    updatedAt: now,
  });

  if (firestoreAdminDb && isFirebaseAdminConfigured) {
    try {
      const docRef = firestoreAdminDb.collection(COLLECTION_NAME).doc(id);
      const cleaned = cleanUndefined(normalized as unknown as Record<string, unknown>);
      await docRef.set(cleaned);
      console.log(`[Firestore DB] Guía creada exitosamente con ID "${id}" en Firestore.`);
    } catch (err) {
      console.error("[Firestore DB] Error creando guía en Firestore:", err);
    }
  }

  const createdLocal = saveCmsGuide(normalized);
  return normalizeGuia(createdLocal);
}

/**
 * Obtener guía por ID único
 */
export async function getGuiaById(id: string): Promise<GuiaVinculacion | null> {
  return getGuiaBySlug(id);
}

/**
 * Eliminar una guía por su ID
 */
export async function deleteGuia(id: string): Promise<boolean> {
  if (firestoreAdminDb && isFirebaseAdminConfigured) {
    try {
      await firestoreAdminDb.collection(COLLECTION_NAME).doc(id).delete();
      console.log(`[Firestore DB] Guía "${id}" eliminada de Firestore.`);
    } catch (err) {
      console.error(`[Firestore DB] Error eliminando guía "${id}" en Firestore:`, err);
    }
  }

  return deleteCmsGuide(id);
}

/**
 * Cambiar el estado de publicación rápido de una guía
 */
export async function toggleGuiaStatus(
  id: string,
  newStatus: GuideStatus,
): Promise<GuiaVinculacion | null> {
  if (firestoreAdminDb && isFirebaseAdminConfigured) {
    try {
      const docRef = firestoreAdminDb.collection(COLLECTION_NAME).doc(id);
      await docRef.set(
        {
          estado: newStatus,
          status: newStatus,
          ultimaModificacion: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
    } catch (err) {
      console.error("[Firestore DB] Error actualizando estado en Firestore:", err);
    }
  }

  const updated = toggleCmsGuideStatusLocal(id, newStatus);
  return updated ? normalizeGuia(updated) : null;
}
