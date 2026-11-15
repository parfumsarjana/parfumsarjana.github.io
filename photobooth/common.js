import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, doc, collection } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig, ROOM_ID } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const roomRef = doc(db, "rooms", ROOM_ID);
export const candCol = collection(db, "rooms", ROOM_ID, "candidates");

export const rtcConfig = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }
  ]
};
