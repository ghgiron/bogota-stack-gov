import { type App, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { type Firestore, getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

export const isFirebaseAdminConfigured = Boolean(
  projectId && (clientEmail || process.env.GOOGLE_APPLICATION_CREDENTIALS),
);

let adminApp: App | null = null;
let firestoreAdmin: Firestore | null = null;

if (isFirebaseAdminConfigured) {
  try {
    if (getApps().length > 0) {
      adminApp = getApp();
    } else if (clientEmail && privateKey) {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      });
    } else {
      adminApp = initializeApp({ projectId });
    }
    firestoreAdmin = getFirestore(adminApp);
  } catch (error) {
    console.warn("[Firebase Admin] Error inicializando Firebase Admin SDK:", error);
  }
}

export { adminApp, firestoreAdmin as firestoreAdminDb };
