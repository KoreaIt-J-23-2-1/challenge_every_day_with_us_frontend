// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-UuxsGRvBZ_jxzT7vBqoAMvs2PnxJ_hw",
    authDomain: "challengewithus-1ffef.firebaseapp.com",
    projectId: "challengewithus-1ffef",
    storageBucket: "challengewithus-1ffef.appspot.com",
    messagingSenderId: "813972652691",
    appId: "1:813972652691:web:7818dba929b3b66e848366",
    measurementId: "G-X612HV3368"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);