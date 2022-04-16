import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1hHX9ghRV7Vo_erEDD-56UHVWDF49nkY",
  authDomain: "trafficam-8afb3.firebaseapp.com",
  projectId: "trafficam-8afb3",
  storageBucket: "trafficam-8afb3.appspot.com",
  messagingSenderId: "521739341675",
  appId: "1:521739341675:web:d71bac5c928bb85607462e",
  measurementId: "G-EDXQLN3SWR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
