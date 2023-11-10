
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBmdm5VZ9gU7bAYNtI5oZItSfwR9xgfUqU",
  authDomain: "myblog00.firebaseapp.com",
  projectId: "myblog00",
  storageBucket: "myblog00.appspot.com",
  messagingSenderId: "178176947590",
  appId: "1:178176947590:web:3275629563c862b9262807",
  measurementId: "G-M0Y2N158BP"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider()