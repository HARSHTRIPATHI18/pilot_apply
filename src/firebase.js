import { initializeApp }              from "firebase/app";
import { getFirestore }               from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:            "your_api_key_here",
  authDomain:        "your_project_id_here.firebaseapp.com",
  projectId:         "your_project_id_here",
  storageBucket:     "storage_bucket_here.appspot.com",
  messagingSenderId: "your_messaging_sender_id_here",
  appId:             "your_app_id_here",
  measurementId:     "your_measurement_id_here",
};

const app      = initializeApp(firebaseConfig);
export const db       = getFirestore(app);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();
