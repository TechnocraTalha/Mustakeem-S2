import { doc, getDoc, collection, addDoc, serverTimestamp, setDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { fallbackData } from "./data";

/**
 * Safely fetches a document from the site_config collection.
 * If the database connection fails, it catches the error and returns the hardcoded fallback data.
 * @param {string} docId - The ID of the document (e.g., 'general', 'home').
 */
export async function getSiteConfig(docId) {
  try {
    const docRef = doc(db, "site_config", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn(`Document ${docId} not found in Firestore. Using fallback data.`);
      return fallbackData[docId] || {};
    }
  } catch (error) {
    console.error(`Error fetching ${docId} from Firestore. Falling back to local data. Error:`, error);
    // Silent fail-safe: return local fallback data
    return fallbackData[docId] || {};
  }
}

/**
 * Updates a document in the site_config collection.
 */
export async function updateSiteConfig(docId, data) {
  try {
    const docRef = doc(db, "site_config", docId);
    await setDoc(docRef, data, { merge: true });
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
    await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      read: false,
    });
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
    const querySnapshot = await getDocs(q);
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
    console.error("Error fetching contact messages:", error);
    return [];
  }
}
