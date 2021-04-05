import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBxS9L0aCc5A-bXf6iHZr2IAKlhnY9tTdo",
    authDomain: "online-shop-4fa6c.firebaseapp.com",
    projectId: "online-shop-4fa6c",
    storageBucket: "online-shop-4fa6c.appspot.com",
    messagingSenderId: "554275032295",
    appId: "1:554275032295:web:3cbb6b252b35dfc736a642"

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore =  firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfile = async (userAuth, additionalData) => {
    if(!userAuth) {
        return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid }`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch(err) {
            console.log(err.message);
        }
    }
    return userRef;
}

export default firebase;