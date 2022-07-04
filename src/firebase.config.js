import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl6bCZ40Fs9jCIdbVzWUM9PYhkHZtZvRE",
  authDomain: "house-marketplace-app-a5a5f.firebaseapp.com",
  projectId: "house-marketplace-app-a5a5f",
  storageBucket: "house-marketplace-app-a5a5f.appspot.com",
  messagingSenderId: "313126873737",
  appId: "1:313126873737:web:165afde180c07796677458",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
