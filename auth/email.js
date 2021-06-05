// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
import firebase from '../config/firebase';
import "firebase/auth";
import * as _ from 'lodash';
const fa = firebase.auth();


var user = fa.currentUser;

if (user != null) {
    user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
    });
}
export const signInWithEmailPassword = async (email, password) => {
  // [START auth_signin_password]
  try {
    let user = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    return error;
  }

    // .then((userCredential) => {
    //   // Signed in
    //   return userCredential;
    // })
    // .catch((error) => {
    //     return error;
    // });
  // [END auth_signin_password]
}

export async function signUpWithEmailPassword(email, password) {
  // [START auth_signup_password]
  try {
       let newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
       return newUser;
  } catch (error) {
      return error;
  }
}

export function sendEmailVerification() {
  // [START auth_send_email_verification]
  firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      // ...
    });
  // [END auth_send_email_verification]
}

export function sendPasswordReset() {
  const email = "sam@example.com";
  // [START auth_send_password_reset]
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}