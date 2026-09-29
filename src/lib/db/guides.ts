import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";
import type {
  CreateGuideDTO,
  Guide,
  GuideFilter,
  GuideStatus,
  UpdateGuideDTO,
} from "@/types/guide";
import type { IGuidesRepository } from "./dbService";
import { FirestoreGuidesRepository } from "./firestoreGuidesRepository";
import { InMemoryGuidesRepository } from "./inMemoryGuidesRepository";

// Persistencia de instancia singleton en globalThis para el entorno de desarrollo de Next.js
const globalForDb = globalThis as unknown as {
  inMemoryGuidesRepository?: InMemoryGuidesRepository;
};

const inMemorySingleton = globalForDb.inMemoryGuidesRepository ?? new InMemoryGuidesRepository();

if (process.env.NODE_ENV !== "production") {
  globalForDb.inMemoryGuidesRepository = inMemorySingleton;
}

/**
 * Fábrica de Repositorio (Repository Factory)
 * Selecciona la implementación según el estado de las credenciales de Firebase.
 *
 * Para migrar a Azure Cosmos DB en el futuro, solo se requiere:
 * return new CosmosGuidesRepository();
 */
export function getGuidesRepository(): IGuidesRepository {
  if (isFirebaseAdminConfigured || isFirebaseClientConfigured) {
    return new FirestoreGuidesRepository();
  }

  // Fallback seguro para prototipado sin fricción
  return inMemorySingleton;
}

/**
 * Obtiene la lista de guías con filtrado opcional por estado o criterios de búsqueda.
 */
export async function getGuides(filterOrStatus?: GuideStatus | GuideFilter): Promise<Guide[]> {
  const repository = getGuidesRepository();

  if (typeof filterOrStatus === "string") {
    return repository.getAll({ status: filterOrStatus });
  }

  return repository.getAll(filterOrStatus);
}

/**
 * Obtiene una guía por su identificador único.
 */
export async function getGuideById(id: string): Promise<Guide | null> {
  const repository = getGuidesRepository();
  return repository.getById(id);
}

/**
 * Guarda o actualiza una guía en la base de datos NoSQL.
 * Si incluye un 'id', realiza una actualización parcial.
 * Si no incluye 'id', crea un nuevo documento.
 */
export async function saveGuide(
  guide: CreateGuideDTO | (UpdateGuideDTO & { id: string }),
): Promise<Guide> {
  const repository = getGuidesRepository();

  if ("id" in guide && guide.id) {
    const { id, ...updateData } = guide;
    return repository.update(id, updateData);
  }

  return repository.create(guide as CreateGuideDTO);
}

/**
 * Elimina una guía por su identificador único.
 */
export async function deleteGuide(id: string): Promise<boolean> {
  const repository = getGuidesRepository();
  return repository.delete(id);
}
