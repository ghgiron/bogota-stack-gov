import type { CreateGuideDTO, Guide, GuideFilter, UpdateGuideDTO } from "@/types/guide";

/**
 * Interfaz genérica del Patrón Repositorio (Repository Pattern)
 * Permite desacoplar el acceso a datos y abstrae la tecnología subyacente
 * (Cloud Firestore, Azure Cosmos DB, PostgreSQL o memoria).
 */
export interface IRepository<T, TCreateDTO, TUpdateDTO, TFilter = unknown> {
  getAll(filter?: TFilter): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: TCreateDTO): Promise<T>;
  update(id: string, data: TUpdateDTO): Promise<T>;
  delete(id: string): Promise<boolean>;
}

/**
 * Contrato específico para el repositorio de Guías de Vinculación
 */
export interface IGuidesRepository
  extends IRepository<Guide, CreateGuideDTO, UpdateGuideDTO, GuideFilter> {
  getBySlug?(slug: string): Promise<Guide | null>;
  seedInitialData?(): Promise<void>;
}
