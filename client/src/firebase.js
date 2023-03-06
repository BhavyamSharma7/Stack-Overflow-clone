// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpeFXzm60H9iJlo9HQfC5hW3wIRbWVcUU",
  authDomain: "stackoverflow-clone-feaca.firebaseapp.com",
  projectId: "stackoverflow-clone-feaca",
  storageBucket: "gs://stackoverflow-clone-feaca.appspot.com",
  messagingSenderId: "752204163613",
  appId: "1:752204163613:web:24dc6f3c7aafa5cace34f4",
  measurementId: "G-CDKP517X3C",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { firebase, storage };