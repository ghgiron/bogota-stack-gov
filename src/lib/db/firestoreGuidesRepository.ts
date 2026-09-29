import { firestoreAdminDb } from "@/lib/firebase/admin";
import { firestoreClientDb } from "@/lib/firebase/client";
import type { CreateGuideDTO, Guide, GuideFilter, UpdateGuideDTO } from "@/types/guide";
import type { Query } from "firebase-admin/firestore";
import type { IGuidesRepository } from "./dbService";

const COLLECTION_NAME = "guides";

/**
 * Implementación de IGuidesRepository utilizando Google Cloud Firestore
 * Compatible tanto con Server Components / API Routes (Admin SDK)
 * como con entornos cliente (Client SDK).
 */
export class FirestoreGuidesRepository implements IGuidesRepository {
  async getAll(filter?: GuideFilter): Promise<Guide[]> {
    // Si estamos en entorno servidor con Firebase Admin disponible
    if (firestoreAdminDb) {
      let query: Query = firestoreAdminDb.collection(COLLECTION_NAME);

      if (filter?.status) {
        query = query.where("status", "==", filter.status);
      }
      if (filter?.category) {
        query = query.where("category", "==", filter.category);
      }

      const snapshot = await query.get();
      let guides = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          content: data.content || "",
          status: data.status || "Borrador",
          updatedAt: data.updatedAt || new Date().toISOString(),
          createdAt: data.createdAt || new Date().toISOString(),
          category: data.category,
          author: data.author,
          summary: data.summary,
          slug: data.slug,
        } as Guide;
      });

      if (filter?.search) {
        const q = filter.search.toLowerCase();
        guides = guides.filter(
          (g) =>
            g.title.toLowerCase().includes(q) ||
            g.content.toLowerCase().includes(q) ||
            g.summary?.toLowerCase().includes(q),
        );
      }

      return guides.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }

    // Si estamos en entorno cliente con Client SDK disponible
    if (firestoreClientDb) {
      const { collection, getDocs, query, where } = await import("firebase/firestore");
      let q = query(collection(firestoreClientDb, COLLECTION_NAME));

      if (filter?.status) {
        q = query(q, where("status", "==", filter.status));
      }

      const snapshot = await getDocs(q);
      const guides = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as Guide;
      });

      return guides.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }

    throw new Error("No hay conexión activa a Firestore configurada.");
  }

  async getById(id: string): Promise<Guide | null> {
    if (firestoreAdminDb) {
      const doc = await firestoreAdminDb.collection(COLLECTION_NAME).doc(id).get();
      if (!doc.exists) return null;
      const data = doc.data();
      if (!data) return null;
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        status: data.status,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
        category: data.category,
        author: data.author,
        summary: data.summary,
        slug: data.slug,
      } as Guide;
    }

    if (firestoreClientDb) {
      const { doc, getDoc } = await import("firebase/firestore");
      const docSnap = await getDoc(doc(firestoreClientDb, COLLECTION_NAME, id));
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() } as Guide;
    }

    throw new Error("No hay conexión activa a Firestore configurada.");
  }

  async create(data: CreateGuideDTO): Promise<Guide> {
    const now = new Date().toISOString();
    const payload = {
      ...data,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-"),
      createdAt: now,
      updatedAt: now,
    };

    if (firestoreAdminDb) {
      const docRef = await firestoreAdminDb.collection(COLLECTION_NAME).add(payload);
      return { id: docRef.id, ...payload };
    }

    if (firestoreClientDb) {
      const { addDoc, collection } = await import("firebase/firestore");
      const docRef = await addDoc(collection(firestoreClientDb, COLLECTION_NAME), payload);
      return { id: docRef.id, ...payload };
    }

    throw new Error("No hay conexión activa a Firestore configurada.");
  }

  async update(id: string, data: UpdateGuideDTO): Promise<Guide> {
    const now = new Date().toISOString();
    const updatePayload = {
      ...data,
      updatedAt: now,
    };

    if (firestoreAdminDb) {
      const docRef = firestoreAdminDb.collection(COLLECTION_NAME).doc(id);
      await docRef.set(updatePayload, { merge: true });
      const updatedDoc = await docRef.get();
      return { id, ...updatedDoc.data() } as Guide;
    }

    if (firestoreClientDb) {
      const { doc, setDoc, getDoc } = await import("firebase/firestore");
      const docRef = doc(firestoreClientDb, COLLECTION_NAME, id);
      await setDoc(docRef, updatePayload, { merge: true });
      const snap = await getDoc(docRef);
      return { id, ...snap.data() } as Guide;
    }

    throw new Error("No hay conexión activa a Firestore configurada.");
  }

  async delete(id: string): Promise<boolean> {
    if (firestoreAdminDb) {
      await firestoreAdminDb.collection(COLLECTION_NAME).doc(id).delete();
      return true;
    }

    if (firestoreClientDb) {
      const { deleteDoc, doc } = await import("firebase/firestore");
      await deleteDoc(doc(firestoreClientDb, COLLECTION_NAME, id));
      return true;
    }

    throw new Error("No hay conexión activa a Firestore configurada.");
  }
}
