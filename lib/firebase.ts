import { initializeApp, getApps } from "firebase/app"
import { getAuth, signInWithPopup } from "firebase/auth"
import { getDatabase } from "firebase/database"
function initializeFirebase() {

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }

    return initializeApp(firebaseConfig)
}

const app = initializeFirebase()

const auth = getAuth(getApps()[0] || app)
export const database = getDatabase(app);
export { auth, signInWithPopup }
