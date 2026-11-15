import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, doc, collection } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Room kamera dipisah per akun: room = UID pemilik.
export const roomRef = uid => doc(db, "rooms", uid);
export const candCol = uid => collection(db, "rooms", uid, "candidates");

export const rtcConfig = {
  iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }]
};
