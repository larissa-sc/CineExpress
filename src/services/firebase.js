import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDvFQib2JZ_P9h_gm934DJud6xz8GwKFWE",
    authDomain: "cineexpress-ifpe.firebaseapp.com",
    projectId: "cineexpress-ifpe",
    storageBucket: "cineexpress-ifpe.firebasestorage.app",
    messagingSenderId: "105445512799",
    appId: "1:105445512799:web:e58dd5fb67947c9ac3edea"
    };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };