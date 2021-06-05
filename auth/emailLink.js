import firebase from '../config/firebase';


var actionCodeSettings = {
    url: 'http://localhost',
    handleCodeInApp: true,
};

export const emailLinkAuthentication = (email) => {
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
        window.localStorage.setItem('emailForSignIn', email);
    }).catch(error => {
        return error;
    })
}

export const emailLinkComplete = (url) => {

    // Confirm the link is a sign-in with email link
    if(firebase.auth().isSignInWithEmailLink(url)) {
        var email = window.localStorage.getItem('emailForSignIn');
        if(!email) {
            email = window.prompt('Please provide your email for confirmation')
        }
        firebase.auth().signInWithEmailLink(email, url).then( result => {
            window.localStorage.removeItem('emailForSignIn');
        }).catch(error => {
            console.error(error);
        });
    }
}

export function emailLinkLink(email) {
    // [START auth_email_link_link]
    // Construct the email link credential from the current URL.
    var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
        email, window.location.href);

    // Link the credential to the current user.
    firebase.auth().currentUser.linkWithCredential(credential)
        .then((usercred) => {
            // The provider is now successfully linked.
            // The phone user can now sign in with their phone number or email.
        })
        .catch((error) => {
            // Some error occurred.
        });
    // [END auth_email_link_link]
}

export function emailLinkReauth(email) {
    // [START auth_email_link_reauth]
    // Construct the email link credential from the current URL.
    var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
        email, window.location.href);

    // Re-authenticate the user with this credential.
    firebase.auth().currentUser.reauthenticateWithCredential(credential)
        .then((usercred) => {
            // The user is now successfully re-authenticated and can execute sensitive
            // operations.
        })
        .catch((error) => {
            // Some error occurred.
        });
    // [END auth_email_link_reauth]
}

export function emailLinkDifferentiate() {
    // [START email_link_diferentiate]
    // After asking the user for their email.
    var email = window.prompt('Please provide your email');
    firebase.auth().fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
            // This returns the same array as fetchProvidersForEmail but for email
            // provider identified by 'password' string, signInMethods would contain 2
            // different strings:
            // 'emailLink' if the user previously signed in with an email/link
            // 'password' if the user has a password.
            // A user could have both.
            if (signInMethods.indexOf(
                    firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) != -1) {
                // User can sign in with email/password.
            }
            if (signInMethods.indexOf(
                    firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) != -1) {
                // User can sign in with email/link.
            }
        })
        .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
        });
    // [END email_link_diferentiate]
}