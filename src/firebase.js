import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const PRODUCTS_DOC = doc(db, "unike", "products");
const CATEGORIES_DOC = doc(db, "unike", "categories");

export async function getShared(key) {
  const ref = key === "unike:products" ? PRODUCTS_DOC : CATEGORIES_DOC;
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { value: JSON.stringify(snap.data().value) };
}

export async function setShared(key, serializedValue) {
  const ref = key === "unike:products" ? PRODUCTS_DOC : CATEGORIES_DOC;
  await setDoc(ref, { value: JSON.parse(serializedValue), updatedAt: Date.now() });
  return { ok: true };
}

export function installStorageAdapter() {
  window.storage = {
    get: getShared,
    set: setShared,
  };
}
