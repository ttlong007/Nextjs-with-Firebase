import firebase from 'firebase/app';
import 'firebase/auth'; // If you need it
import 'firebase/firestore'; // If you need it
// import 'firebase/storage' // If you need it
// import 'firebase/analytics' // If you need it
// import 'firebase/performance' // If you need it
import 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyDs80rSFEItZZz3glGQfhHnmQUB6Vanljw",
    authDomain: "nextjs-demo-542a9.firebaseapp.com",
    projectId: "nextjs-demo-542a9",
    storageBucket: "nextjs-demo-542a9.appspot.com",
    messagingSenderId: "234599104351",
    appId: "1:234599104351:web:7268038b289cbc2c6b00ea",
    measurementId: "G-8MRRWP52X4",
    databaseURL: "https://nextjs-demo-542a9-default-rtdb.firebaseio.com/",
};
 // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // Check that `window` is in scope for the analytics module!
    // if (typeof window !== 'undefined') {
    //   // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    //   if ('measurementId' in clientCredentials) {
    //     firebase.analytics()
    //     firebase.performance()
    //   }
    // }
}

export default firebase;

export const realtimeDB = firebase.database();