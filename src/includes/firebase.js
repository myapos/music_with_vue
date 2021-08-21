import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4BAwRmraJVJAKRADFlBKWzSIFNJqU-bY",
  authDomain: "music-5e5c9.firebaseapp.com",
  projectId: "music-5e5c9",
  storageBucket: "music-5e5c9.appspot.com",
  messagingSenderId: "423182287167",
  appId: "1:423182287167:web:0513b0db50bd8a0759538a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth, db, usersCollection, storage, songsCollection, commentsCollection,
};
