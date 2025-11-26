import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig";

export const firestore = getFirestore(firebaseApp);

export const createUserIfNotExists = async (userData) => {
  const ref = doc(firestore, "users", userData.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      ...userData,
      createdAt: serverTimestamp(),
    });
  }
};
