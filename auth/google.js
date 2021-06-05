import firebase from '../config/firebase';

const provider = new firebase.auth.GoogleAuthProvider();

export const signInByGoogle = async () => {
    try {
        //const router = useRouter();
        let result = await firebase.auth().signInWithPopup(provider);
        return result;
    } catch (error) {
        return error;
    }
}