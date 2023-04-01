// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyD9UaybByk8d_ERxWa8iARawY8E1Zz1qnA",
//   authDomain: "ekantomart.firebaseapp.com",
//   projectId: "ekantomart",
//   storageBucket: "ekantomart.appspot.com",
//   messagingSenderId: "830487815252",
//   appId: "1:830487815252:web:705b5bd39be0472deab9c1",
//   measurementId: "G-W1PVFRJM1L"
// };
const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY ,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN ,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID ,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export default auth;
