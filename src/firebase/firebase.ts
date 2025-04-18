import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	User,
} from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
	apiKey: "AIzaSyAZfUTS_YG_L620Kfbb-SB1hgluZpnc0pc",
	authDomain: "quizzy-353d3.firebaseapp.com",
	projectId: "quizzy-353d3",
	storageBucket: "quizzy-353d3.firebasestorage.app",
	messagingSenderId: "140755699550",
	appId: "1:140755699550:web:9dc2dba81f24e4cbf2f1cf",
	measurementId: "G-WGDB4SZ8B0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, signInWithPopup, signOut };
export type { User };
