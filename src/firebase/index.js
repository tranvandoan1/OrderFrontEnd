import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyD1xFiboYGLkD6X8E7utja58-8IiKH-KDc",
    authDomain: "shopee-6ddce.firebaseapp.com",
    projectId: "shopee-6ddce",
    storageBucket: "shopee-6ddce.appspot.com",
    messagingSenderId: "785935581940",
    appId: "1:785935581940:web:158612b81b523e2c1a94a1"
};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)