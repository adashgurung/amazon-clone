import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyByr7gnhlNT8D2LB0vKYOS4eDS1pDr5QJ0",
  authDomain: "clone-319f0.firebaseapp.com",
  databaseURL: "https://clone-319f0.firebaseio.com",
  projectId: "clone-319f0",
  storageBucket: "clone-319f0.appspot.com",
  messagingSenderId: "716380386578",
  appId: "1:716380386578:web:2d48de8071e12b0462afcb",
  measurementId: "G-NFPYJ2GCRP",
};

// ***  add these later for FIREBASE USE //
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
