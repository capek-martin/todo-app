// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEFYU4bApAdM2qVubU5bziwtIW2JkwO0I",
  authDomain: "todo-app-b5b26.firebaseapp.com",
  projectId: "todo-app-b5b26",
  storageBucket: "todo-app-b5b26.appspot.com",
  messagingSenderId: "1028375025188",
  appId: "1:1028375025188:web:311bcee90111e1a613aab1",
  measurementId: "G-EKN3PR9SFW",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
