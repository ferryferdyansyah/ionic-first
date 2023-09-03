// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const environment = {
  firebaseConfig: {
  apiKey: "AIzaSyBaUpNkq9uAVJNZeMOZJnJ2f8MMptlaZ4Y",
  authDomain: "firstappkuu.firebaseapp.com",
  projectId: "firstappkuu",
  storageBucket: "firstappkuu.appspot.com",
  messagingSenderId: "696789873006",
  appId: "1:696789873006:web:6181da37990eba1f0fd17f",
  measurementId: "G-KM755QF79Z"
},
  production: false
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
