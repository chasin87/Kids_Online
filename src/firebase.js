import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCI0vK8wTY4SJnWz23Gn1KZb2il0zC17EU",
  authDomain: "kids-online-2.firebaseapp.com",
  databaseURL: "https://kids-online-2.firebaseio.com",
  projectId: "kids-online-2",
  storageBucket: "kids-online-2.appspot.com",
  messagingSenderId: "39856716853",
  appId: "1:39856716853:web:dec983646e05084ae3457c",
  measurementId: "G-PMVYNPJZ5M",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
