import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJsCA15zz9LPMsGhMCE2EPWNghNcoqf0E",
  authDomain: "images-4bdb1.firebaseapp.com",
  databaseURL: "https://images-4bdb1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "images-4bdb1",
  storageBucket: "images-4bdb1.appspot.com",
  messagingSenderId: "319515504290",
  appId: "1:319515504290:web:ee7cd071bf7026fcb271fb"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export  {
    storage, firebaseApp as default
  }
