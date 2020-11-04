import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB1t4IZ3gKrHefqzvEzBmGeRmM7SBgeh_c",
  authDomain: "kids-online-image.firebaseapp.com",
  databaseURL: "https://kids-online-image.firebaseio.com",
  projectId: "kids-online-image",
  storageBucket: "kids-online-image.appspot.com",
  messagingSenderId: "359809280749",
  appId: "1:359809280749:web:8012eb3609eb162647bae4",
  measurementId: "G-NK3P8NH02T",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
