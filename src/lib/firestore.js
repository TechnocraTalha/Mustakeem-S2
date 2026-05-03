import { doc, getDoc, collection, addDoc, serverTimestamp, setDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { fallbackData } from "./data";

/**
 * Wraps a promise with a timeout. If the promise doesn't resolve
 * within `ms` milliseconds, it rejects with a timeout error.
 */
function withTimeout(promise, ms = 5000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Firestore request timed out")), ms)
    ),
  ]);
}

import { getSiteConfigREST } from "./firestore-rest";

/**
 * Safely fetches a document from the site_config collection.
 * Uses the REST API to bypass Next.js Server Component gRPC crashes.
 * Falls back to local hardcoded data on any failure.
 */
export async function getSiteConfig(docId) {
  try {
    const data = await getSiteConfigREST(docId);
    if (data) {
      return data;
    } else {
      console.warn(`Document ${docId} not found in Firestore. Using fallback data.`);
      return fallbackData[docId] || {};
    }
  } catch (error) {
    console.warn(`Firestore REST unavailable for ${docId}. Using fallback data.`);
    return fallbackData[docId] || {};
  }
}

/**
 * Updates a document in the site_config collection.
 */
export async function updateSiteConfig(docId, data) {
  try {
    const docRef = doc(db, "site_config", docId);
    await withTimeout(setDoc(docRef, data, { merge: true }), 10000);
    return true;
  } catch (error) {
    console.error(`Error updating ${docId}:`, error);
    throw error;
  }
}

/**
 * Submits a message to the contact_submissions collection.
 */
export async function submitContactMessage(data) {
  try {
    const colRef = collection(db, "contact_submissions");
    await withTimeout(
      addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        read: false,
      }),
      10000
    );
    return true;
  } catch (error) {
    console.error("Error submitting contact message:", error);
    throw error;
  }
}

/**
 * Fetches all contact messages from the contact_submissions collection.
 */
export async function getContactMessages() {
  try {
    const colRef = collection(db, "contact_submissions");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const querySnapshot = await withTimeout(getDocs(q), 8000);
    const messages = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
      });
    });
    return messages;
  } catch (error) {
    console.warn("Firestore unavailable for inbox. Returning empty.");
    return [];
  }
}
