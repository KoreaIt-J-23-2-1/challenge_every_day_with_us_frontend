// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8nPIsb-FsPABn4HfPTtSQI5PEp25V9cA",
    authDomain: "board-def75.firebaseapp.com",
    projectId: "board-def75",
    storageBucket: "board-def75.appspot.com",
    messagingSenderId: "430481023941",
    appId: "1:430481023941:web:8cd92682ac7e0bf051a1ac",
    measurementId: "G-YPNV435KK9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);